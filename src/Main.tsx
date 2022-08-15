import {NavigationContainer} from '@react-navigation/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {createContext, useContext, useEffect, useState} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import RNFS from 'react-native-fs';
import {BottomNavigation, Button, Divider} from 'react-native-paper';
import {Camera, CameraPermissionStatus} from 'react-native-vision-camera';

import NavBar from './components/NavBar';
import CameraScreen from './screens/CameraScreen';
import Home from './screens/Home';
import type {Routes} from './screens/Routes';
import UserProfileScreen from './screens/UserProfileScreen';

export const ThemeContext = createContext((close: boolean) => {});

const Drawer = createNativeStackNavigator<Routes>();

export type MainProps = NativeStackScreenProps<Routes, 'MainPages'>;

const Main = ({navigation}: MainProps) => {
  const [isNavBarHidden, setIsNavBarHidden] = useState(false);
  const [cameraPermission, setCameraPermission] =
    useState<CameraPermissionStatus>();

  useEffect(() => {
    Camera.getCameraPermissionStatus().then(setCameraPermission);
  }, []);

  if (cameraPermission == null) {
    // still loading
    return null;
  }

  const handleNavBar = (close: boolean) => {
    setIsNavBarHidden(close);
  };

  return (
    // <ThemeContext.Provider value={handleNavBar}>
    <View style={{width: '100%', height: '100%'}}>
      <View style={{flex: 1}}>
        <Drawer.Navigator
          screenOptions={{
            headerShown: false,
            statusBarStyle: 'dark',
            animationTypeForReplace: 'push',
          }}
          initialRouteName="InitialPage">
          <Drawer.Screen name="Home" component={Home} />
          {/* <Stack.Screen name="CameraPage" component={CameraScreen} /> */}
          <Drawer.Screen name="UserProfilePage" component={UserProfileScreen} />
        </Drawer.Navigator>
      </View>
      <NavBar navigation={navigation} />
    </View>
    // </ThemeContext.Provider>
  );
};

const styles = StyleSheet.create({
  navBarContainer: {
    width: '100%',
    height: 56,
    backgroundColor: '#ffffff',
    color: 'black',
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  startButton: {
    width: 56,
    height: 56,
    // paddingVertical: 12,
    backgroundColor: '#262626',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Main;
