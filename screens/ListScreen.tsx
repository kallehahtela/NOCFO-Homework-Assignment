import { 
  View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, Image, 
  Alert, KeyboardAvoidingView, Platform
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/StackNavigator';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ListScreen'>;

// Using types to declare different elements of the Plant
// We can also use these now to display our own stored plants
type Plant = {
  id: string;
  name: string;
  notes?: string;
  imageUri?: string;
  createdAt: string;
}

const ListScreen = () => {
  const navigation = useNavigation<ListScreenNavigationProp>(); // we can navigate trough app
  const [plants, setPlants] = useState<Plant[]>([]); // we want to store our Plants in a arrays

  // Function to fetch plants from AsyncStorage
  const fetchPlants = async () => {
    try {
      const storedPlants = await AsyncStorage.getItem('plants');
      if (storedPlants) {
        setPlants(JSON.parse(storedPlants));
      } else {
        setPlants([]);
      }
    } catch (err) {
      console.error('Error fetching plants:', err);
    }
  };

  // Fetch plants on mount and when screen regains focus
  useFocusEffect(
    React.useCallback(() => {
      fetchPlants();
    }, [])
  );

  // Function to delete plant entirely
  const deletePlant = async (id: string) => {
    try {
      const updatedPlants = plants.filter(plant => plant.id !== id);
      setPlants(updatedPlants);
      await AsyncStorage.setItem('plants', JSON.stringify(updatedPlants));
    } catch (err) {
      console.log('Error deleting plant:', err);
    }
  };

  // Function to display the confirmation message
  // Makes sure that we don't do this by an accident
  const confirmDelete = (id: string) => {
    Alert.alert(
      'Delete Plant',
      'Are you sure you want to delete this plant?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => deletePlant(id), style: 'destructive' },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        {/* Header with buttons */}
        <View style={styles.container}>
          <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('NewPlant')}>
            <Text>Add a new plant</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.darkBtn} onPress={() => console.log("Dark mode toggle")}>
            <Feather name='moon' size={24} color={'black'} />
          </TouchableOpacity>
        </View>

        {/* Plant list or empty message */}
        {plants.length === 0 ? (
          <View style={styles.noPlantsView}>
            <Text style={styles.noPlantsText}>No Plants Added Yet...</Text>
          </View>
        ) : (
          <FlatList
            contentContainerStyle={{
              paddingBottom: 80, // Ensures bottom navbar space
            }}
            showsVerticalScrollIndicator={false}
            data={plants}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity 
                onLongPress={() => confirmDelete(item.id)}
                style={styles.plantCard}
              >
                <Image 
                  source={
                    item.imageUri ? { uri: item.imageUri } : 
                    require('../assets/favicon.png')}
                    style={styles.image}
                />
                <Text style={styles.plantName}>{item.name}</Text>
                <Text>{item.notes}</Text>
                <Text>Created at: {item.createdAt}</Text>
              </TouchableOpacity>
            )}
            getItemLayout={(data, index) => ({ length: 120, offset: 120 * index, index })}
            initialNumToRender={10}
          />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ListScreen;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 50, // Adds space for bottom navbar
  },
  container: {
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  btn: {
    width: 200,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkBtn: {
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
  noPlantsView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPlantsText: {
    fontSize: 20,
    fontWeight: '700',
  },
  plantCard: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 10,
  },
  plantName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
});