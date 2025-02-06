import { createStackNavigator } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

// Importing screens
import TabNavigator from './TabNavigator';
import ListScreen from '../screens/ListScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NewPlant from '../screens/NewPlant';
import { Button, TouchableOpacity } from 'react-native';

// We need to use the type declaration for each screen
// Without these the navigation would't work
export type RootStackParamList = {
    MainTabs: undefined; // Bottom Tabs as entry point
    ListScreen: undefined; // Listings Screen
    SettingsScreen: undefined; // Settings Screen
    ProfileScreen: undefined; // Profile Screen
    NewPlant: undefined; // New Plant Screen
};

const RootStack = createStackNavigator<RootStackParamList>();

const StackNavigator = () => {
    const navigation = useNavigation();

    return (
        // Creating a stack navigator
        // Adding every screen in it, and use Bottom Tabs as a default screen
        <RootStack.Navigator 
            initialRouteName='MainTabs'
            screenOptions={{
                headerShown: false,
            }}
        >
            <RootStack.Screen 
                name='MainTabs' 
                component={TabNavigator} 
            />
            <RootStack.Screen 
                name='ListScreen' 
                component={ListScreen} 
            />
            <RootStack.Screen 
                name='SettingsScreen' 
                component={SettingsScreen} 
            />
            <RootStack.Screen 
                name='ProfileScreen' 
                component={ProfileScreen} 
            />
            <RootStack.Screen 
                name='NewPlant' 
                component={NewPlant}
                // Options for the back button so we can go back by tapping a button also
                options={{
                    headerShown: true,
                    headerTitle: 'Add a new plant',
                    headerLeft: () => (
                        <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ marginLeft: 40}}>
                            <AntDesign 
                                name='back'
                                size={24}
                                color={'black'}
                            />
                        </TouchableOpacity>
                    )
                }}
            />
        </RootStack.Navigator>
    );
}

export default StackNavigator;