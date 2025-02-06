import { StatusBar } from 'expo-status-bar';
import StackNavigator from './navigation/StackNavigator';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style='dark' />
      <StackNavigator />
    </NavigationContainer>
  );
}
