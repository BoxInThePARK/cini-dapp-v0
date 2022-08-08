import {ConnectionProvider} from '@solana/wallet-adapter-react';
import {NavigationContainer} from '@react-navigation/native';
import {clusterApiUrl} from '@solana/web3.js';
import React, {createContext, Suspense, useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet, View} from 'react-native';
import {Provider as PaperProvider, Text} from 'react-native-paper';

import SnackbarProvider from './components/SnackbarProvider';
import DemoConnectionScreen from './screens/DemoConnectionScreen';
import {PermissionsPage} from './screens/PermissionsPage';
import CameraScreen from './screens/CameraScreen';
import {MediaPage} from './screens/MediaPage';
// import {CameraPage} from './screens/CameraPage';
import {Camera, CameraPermissionStatus} from 'react-native-vision-camera';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {Routes} from './screens/Routes';
import InitialScreen from './screens/InitialScreen';
import MockGallery from './screens/MockGallery';
import UserProfileScreen from './screens/UserProfileScreen';
import NavBar from './components/NavBar';
import Main from './Main';

const DEVNET_ENDPOINT = /*#__PURE__*/ clusterApiUrl('devnet');

// export const ThemeContext = createContext((close: boolean) => {});

const Stack = createNativeStackNavigator<Routes>();

export default function App() {

  // const showPermissionsPage = cameraPermission !== 'authorized';

  return (
    <ConnectionProvider endpoint={DEVNET_ENDPOINT}>
      <SafeAreaView style={styles.shell}>
        {/* <ThemeContext.Provider value={handleNavBar}> */}
        <PaperProvider>
          <SnackbarProvider>
            <Suspense
              fallback={
                <View style={styles.loadingContainer}>
                  <ActivityIndicator
                    size="large"
                    style={styles.loadingIndicator}
                  />
                </View>
              }>
              <NavigationContainer>
                <Stack.Navigator
                  screenOptions={{
                    headerShown: false,
                    statusBarStyle: 'dark',
                    animationTypeForReplace: 'push',
                  }}
                  initialRouteName="InitialPage">
                  <Stack.Screen name="InitialPage" component={InitialScreen} />
                  <Stack.Screen name="MainPages" component={Main} />
                  <Stack.Screen name="CameraPage" component={CameraScreen} />
                </Stack.Navigator>
                {/* {!isNavBarHidden && <NavBar />} */}
              </NavigationContainer>
            </Suspense>
          </SnackbarProvider>
        </PaperProvider>
      </SafeAreaView>
    </ConnectionProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    height: '100%',
    justifyContent: 'center',
  },
  loadingIndicator: {
    marginVertical: 'auto',
  },
  shell: {
    height: '100%',
  },
});
