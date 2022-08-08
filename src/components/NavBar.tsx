import React, {useState, useContext} from 'react';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
// import type {Routes} from './Routes';
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Button, Divider} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {Routes} from '../screens/Routes';

const BUTTON_SIZE = 48;

interface NavBarProps {
  navigation: NativeStackNavigationProp<Routes, 'MainPages', undefined>;
}

const NavBar = ({navigation}: NavBarProps) => {
  return (
    <View style={styles.navBarContainer}>
      <TouchableOpacity
        onPress={() => {
          console.log('navigate to mock home');
          navigation.navigate('MockHome');
        }}>
        <MaterialCommunityIcons
          name="home"
          size={BUTTON_SIZE}
          color="#262626"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          console.log('navigate to camera page');
          navigation.navigate('CameraPage');
        }}>
        <MaterialCommunityIcons
          name="camera"
          size={BUTTON_SIZE}
          color="#262626"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          console.log('navigate to user profile page');
          navigation.navigate('UserProfilePage');
        }}>
        <MaterialCommunityIcons
          name="account"
          size={BUTTON_SIZE}
          color="#262626"
        />
      </TouchableOpacity>
      {/* <Text style={{color:'#000'}}>Test</Text> */}
    </View>
  );
};

export default NavBar;

const styles = StyleSheet.create({
  navBarContainer: {
    width: '100%',
    height: 72,
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  startButton: {
    width: 72,
    height: 72,
    // paddingVertical: 12,
    backgroundColor: '#262626',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
