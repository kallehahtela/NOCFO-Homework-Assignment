import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/StackNavigator';
import { text } from 'stream/consumers';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProfileScreen'>;
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'ProfileScreen'>

const ProfileScreen = () => {
  // configuring the navigation
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  // the route in which user will land on
  const route = useRoute<ProfileScreenRouteProp>();

  return (
    <View style={styles.container}>
          <Text style={styles.text}>
            This is a Profile Screen, Nothing added due to lack of time
          </Text>
        </View>
  );
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  text: {
    marginHorizontal: 60,
    textAlign: 'center',
  }
});