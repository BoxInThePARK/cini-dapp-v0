import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useContext, useState} from 'react';
// import type {Routes} from './Routes';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Divider} from 'react-native-paper';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
          navigation.navigate('Home');
        }}>
        <MaterialCommunityIcons
          name="home"
          size={BUTTON_SIZE}
          color="#262626"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Feed');
        }}>
        <MaterialCommunityIcons
          name="book-open-blank-variant"
          size={BUTTON_SIZE}
          color="#262626"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
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
          navigation.navigate('Wallet');
        }}>
        <IonIcon name="wallet" size={BUTTON_SIZE} color="#262626" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('UserProfilePage', {initialTab: 0});
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
