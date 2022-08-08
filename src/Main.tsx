import React, {createContext, useState, useContext, useEffect} from 'react';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, ImageBackground, Text, StyleSheet} from 'react-native';
import {Button, Divider, BottomNavigation} from 'react-native-paper';
import RNFS from 'react-native-fs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {Routes} from './screens/Routes';
import MockGallery from './screens/MockGallery';
import UserProfileScreen from './screens/UserProfileScreen';
import CameraScreen from './screens/CameraScreen';
import NavBar from './components/NavBar';
import {Camera, CameraPermissionStatus} from 'react-native-vision-camera';

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
          <Drawer.Screen name="MockHome" component={MockGallery} />
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
