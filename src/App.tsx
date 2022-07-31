import {ConnectionProvider} from '@solana/wallet-adapter-react';
import {NavigationContainer} from '@react-navigation/native';
import {clusterApiUrl} from '@solana/web3.js';
import React, {Suspense} from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet, View} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {Camera, CameraPermissionStatus} from 'react-native-vision-camera';

import SnackbarProvider from './components/SnackbarProvider';
import DemoConnectionScreen from './screens/DemoConnectionScreen';

const DEVNET_ENDPOINT = /*#__PURE__*/ clusterApiUrl('devnet');

export default function App() {
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
                <DemoConnectionScreen />
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
