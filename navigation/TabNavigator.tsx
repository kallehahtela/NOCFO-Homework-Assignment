import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StackNavigator from './StackNavigator';
import { Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import ListScreen from '../screens/ListScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const getOptions = (iconName: string, title: string): BottomTabNavigationOptions => {
    return {
        tabBarIcon({ color, size }) {
            return (
                <Feather 
                    name={iconName as any} 
                    size={size} 
                    color={color} 
                />
            );
        },
        title: title,
        tabBarStyle: {
            paddingBottom: Platform.OS === 'ios' ? 0 : 5,
            height: Platform.OS === 'ios' ? 80 : 65,
        },
    };
};

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Tab.Screen 
                name='ListScreen'
                component={ListScreen}
                options={getOptions('list', 'List')}
            />
            <Tab.Screen 
                name='SettingsScreen'
                component={SettingsScreen}
                options={getOptions('settings', 'Settings')}
            />
            <Tab.Screen 
                name='ProfileScreen'
                component={ProfileScreen}
                options={getOptions('user', 'Profile')}
            />
        </Tab.Navigator>
    );
}

export default TabNavigator;