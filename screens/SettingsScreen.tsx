import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/StackNavigator';

//type SettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SettingsScreen'>;
//type SettingsScreenRouteProp = RouteProp<RootStackParamList, 'SettingsScreen'>

const SettingsScreen = () => {
  // configuring the navigation
  //const navigation = useNavigation<SettingsScreenNavigationProp>();
  // the route in which user will land on
  //const route = useRoute<SettingsScreenRouteProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        This is a Settings Screen, Nothing added due to lack of time
      </Text>
    </View>
  );
}

export default SettingsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    marginHorizontal: 60,
    textAlign: 'center',
  }
});