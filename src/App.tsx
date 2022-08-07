import {ConnectionProvider} from '@solana/wallet-adapter-react';
import {NavigationContainer} from '@react-navigation/native';
import {clusterApiUrl} from '@solana/web3.js';
import React, {Suspense, useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet, View} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';

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

const DEVNET_ENDPOINT = /*#__PURE__*/ clusterApiUrl('devnet');

const Stack = createNativeStackNavigator<Routes>();

export default function App() {
  const [cameraPermission, setCameraPermission] =
    useState<CameraPermissionStatus>();

  useEffect(() => {
    Camera.getCameraPermissionStatus().then(setCameraPermission);
  }, []);

  if (cameraPermission == null) {
    // still loading
    return null;
  }

  const showPermissionsPage = cameraPermission !== 'authorized';

  return (
    <ConnectionProvider endpoint={DEVNET_ENDPOINT}>
      <SafeAreaView style={styles.shell}>
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
                  initialRouteName='InitialPage'>
                  <Stack.Screen
                    name="InitialPage"
                    component={InitialScreen}
                  />
                  <Stack.Screen name="UserProfilePage" component={UserProfileScreen} />
                  <Stack.Screen
                    name="MockHome"
                    component={MockGallery}
                  />
                  <Stack.Screen
                    name="PermissionsPage"
                    component={PermissionsPage}
                  />
                  <Stack.Screen name="CameraPage" component={CameraScreen} />
                  <Stack.Screen
                    name="MediaPage"
                    component={MediaPage}
                    options={{
                      animation: 'none',
                      presentation: 'transparentModal',
                    }}
                  />
                </Stack.Navigator>
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
