import {
    Camera,
    CameraMode,
    CameraType,
    CameraView,
    useCameraPermissions,
  } from "expo-camera";
  import { useRef, useState } from "react";
  import { 
    Button, 
    Pressable, 
    StyleSheet, 
    Text, 
    View, 
    Image, 
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard
} from "react-native";
  import { 
    AntDesign, 
    Feather, 
    FontAwesome6 
} from "@expo/vector-icons";
import FormInput from "../ui/FormInput";
import OwnButton from "../ui/OwnButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/StackNavigator";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";


type NewPlantNavigationProp = StackNavigationProp<RootStackParamList, 'NewPlant'>;
type NewPlantRouteProp = RouteProp<RootStackParamList, 'NewPlant'>

export default function App() {
const navigation = useNavigation<NewPlantNavigationProp>();
const route = useRoute<NewPlantRouteProp>();

const [plantName, setPlantName] = useState('');
const [notes, setNotes] = useState('');

const [permission, requestPermission] = useCameraPermissions();
const ref = useRef<CameraView>(null);
const [uri, setUri] = useState<string | ''>();
const [mode, setMode] = useState<CameraMode>("picture");
const [facing, setFacing] = useState<CameraType>("back");
const [recording, setRecording] = useState(false);
const [isCameraOpen, setIsCameraOpen] = useState(false);

const keyboardVerticalOffset = Platform.OS === 'ios' ? 50 : 0;

if (!permission) {
    return null;
}

if (!permission.granted) {
    return (
    <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
        We need your permission to use the camera
        </Text>
        <Button onPress={requestPermission} title="Grant permission" />
    </View>
    );
}

const takePicture = async () => {
    const photo = await ref.current?.takePictureAsync();
    setUri(photo?.uri);
    setIsCameraOpen(false);
};

const recordVideo = async () => {
    if (recording) {
    setRecording(false);
    ref.current?.stopRecording();
    return;
    }
    setRecording(true);
    const video = await ref.current?.recordAsync();
    console.log({ video });
};

const toggleMode = () => {
    setMode((prev) => (prev === "picture" ? "video" : "picture"));
};

const toggleFacing = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
};

const openCamera = () => {
    setIsCameraOpen(true);
    setUri('') // Reset previous image
};

const savePlantData = async (plantName: string, notes: string, imageUri: string) => {
    try {
        const existingPlants = await AsyncStorage.getItem('plants');
        const plants = existingPlants ? JSON.parse(existingPlants) : [];

        const newPlant = { 
            id: Date.now(), 
            name: plantName, 
            notes, 
            imageUri,
            createdAt: new Date().toString(), // Store the created at
        };

        plants.push(newPlant);
        await AsyncStorage.setItem('plants', JSON.stringify(plants));
    } catch (err) {
        console.log('error saving plant:', err);
    }
}

const handleAddPlant = async () => {
    if (!uri) return Alert.alert('Please take a picture first!');
    if (!plantName.trim()) {
        alert('Please enter a plant name');
        return;
    }

    const newPlant = { 
        id: Date.now().toString(), 
        name: plantName, 
        notes, 
        imageUri: uri,
        createdAt: new Date().toString(), // Add createdAt timestamp
    };

    try {
        const existingPlants = await AsyncStorage.getItem('plants');
        const plants = existingPlants ? JSON.parse(existingPlants) : [];
        plants.push(newPlant);
        await AsyncStorage.setItem('plants', JSON.stringify(plants));

        // Pass new plant data back to ListScreen.tsx
        navigation.navigate('ListScreen', { newPlant });
    } catch (err) {
        console.log('error saving plant:', err);
    }

};

return (
    <TouchableWithoutFeedback 
        onPress={Keyboard.dismiss}
        accessible={false}
    >
        <KeyboardAvoidingView 
            behavior="padding"
            keyboardVerticalOffset={keyboardVerticalOffset}
            style={{ flex: 1}}
        >
            <View style={styles.container}>
            {isCameraOpen ? (
                <CameraView
                style={styles.camera}
                ref={ref}
                mode={mode}
                facing={facing}
                mute={false}
                responsiveOrientationWhenOrientationLocked
                >
                    {/* Close Camera Button */}
                    <TouchableOpacity 
                        style={styles.closeButton}
                        onPress={() => setIsCameraOpen(false)}
                    >
                        <Text style={styles.closeButtonText}>X</Text>
                    </TouchableOpacity>

                    <View style={styles.shutterContainer}>
                        <Pressable onPress={toggleMode}>
                        {mode === "picture" ? (
                            <AntDesign name="picture" size={32} color="white" />
                        ) : (
                            <Feather name="video" size={32} color="white" />
                        )}
                        </Pressable>
                        <Pressable onPress={mode === "picture" ? takePicture : recordVideo}>
                        {({ pressed }) => (
                            <View
                            style={[
                                styles.shutterBtn,
                                {
                                opacity: pressed ? 0.5 : 1,
                                },
                            ]}
                            >
                            <View
                                style={[
                                styles.shutterBtnInner,
                                {
                                    backgroundColor: mode === "picture" ? "white" : "red",
                                },
                                ]}
                            />
                            </View>
                        )}
                        </Pressable>
                        <Pressable onPress={toggleFacing}>
                        <FontAwesome6 name="rotate-left" size={32} color="white" />
                        </Pressable>
                    </View>
                    </CameraView>
                ) : uri ? (
                    <Image source={{ uri }} style={styles.image} />
                ) : (
                    <TouchableOpacity onPress={openCamera} style={styles.cameraButton}>
                        <AntDesign name="camera" size={32} color="black" />
                    </TouchableOpacity>
                )}

                <FormInput 
                    placeholderText={`Enter plant's name`} 
                    value={plantName}
                    onChangeText={setPlantName}
                />
                <FormInput 
                    placeholderText={`Add notes about it`} 
                    value={notes}
                    onChangeText={setNotes}
                />

                <OwnButton buttonTitle="Add a Plant" onPress={handleAddPlant} />
                </View>
        </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: 10,
        borderRadius: 20,
        zIndex: 10,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    camera: {
        flex: 1,
        width: "100%",
    },
    shutterContainer: {
        position: "absolute",
        bottom: 44,
        left: 0,
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 30,
    },
    shutterBtn: {
        backgroundColor: "transparent",
        borderWidth: 5,
        borderColor: "white",
        width: 85,
        height: 85,
        borderRadius: 45,
        alignItems: "center",
        justifyContent: "center",
    },
    shutterBtnInner: {
        width: 70,
        height: 70,
        borderRadius: 50,
    },
    cameraButton: {
        marginBottom: 30,
        width: 300,
        height: 200,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 45,
        borderColor: 'black',
        borderWidth: 1,
    },
    image: {
        width: 300,
        height: 200,
        borderRadius: 10,
    },
});