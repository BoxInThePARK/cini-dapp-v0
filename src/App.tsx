import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ConnectionProvider} from '@solana/wallet-adapter-react';
import {clusterApiUrl} from '@solana/web3.js';
import React, {createContext, Suspense, useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet, View} from 'react-native';
import {Provider as PaperProvider, Text} from 'react-native-paper';
// import {CameraPage} from './screens/CameraPage';
import {Camera, CameraPermissionStatus} from 'react-native-vision-camera';

import NavBar from './components/NavBar';
import SnackbarProvider from './components/SnackbarProvider';
import Main from './Main';
import CameraScreen from './screens/CameraScreen';
import DemoConnectionScreen from './screens/DemoConnectionScreen';
import Home from './screens/Home';
import InitialScreen from './screens/InitialScreen';
import {MediaPage} from './screens/MediaPage';
import {PermissionsPage} from './screens/PermissionsPage';
import type {Routes} from './screens/Routes';
import UserProfileScreen from './screens/UserProfileScreen';

const DEVNET_ENDPOINT = /*#__PURE__*/ clusterApiUrl('devnet');

interface CaptureContextProp {
  isCapture: boolean;
  setIsCapture: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CaptureContext = createContext({} as CaptureContextProp);

const Stack = createNativeStackNavigator<Routes>();

export default function App() {
  const [isCapture, setIsCapture] = useState<boolean>(true);
  const contextObj = {
    isCapture,
    setIsCapture,
  };
  // const showPermissionsPage = cameraPermission !== 'authorized';

  return (
    <ConnectionProvider endpoint={DEVNET_ENDPOINT}>
      <SafeAreaView style={styles.shell}>
        <CaptureContext.Provider value={contextObj}>
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
                    <Stack.Screen
                      name="InitialPage"
                      component={InitialScreen}
                    />
                    <Stack.Screen name="MainPages" component={Main} />
                    <Stack.Screen name="CameraPage" component={CameraScreen} />
                  </Stack.Navigator>
                  {/* {!isNavBarHidden && <NavBar />} */}
                </NavigationContainer>
              </Suspense>
            </SnackbarProvider>
          </PaperProvider>
        </CaptureContext.Provider>
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
