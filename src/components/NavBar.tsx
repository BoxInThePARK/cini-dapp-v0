import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import type {Routes} from '../screens/Routes';

const BUTTON_SIZE = 34;
const BUTTON_SIZE_SMALL = 30;

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
          size={BUTTON_SIZE_SMALL}
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
        <IonIcon name="wallet" size={BUTTON_SIZE_SMALL} color="#262626" />
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
    </View>
  );
};

export default NavBar;

const styles = StyleSheet.create({
  navBarContainer: {
    width: '100%',
    height: 56,
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
});
