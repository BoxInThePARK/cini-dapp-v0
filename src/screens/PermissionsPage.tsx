import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useState} from 'react';
import {ImageRequireSource, Linking} from 'react-native';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Camera, CameraPermissionStatus} from 'react-native-vision-camera';

import {CONTENT_SPACING, SAFE_AREA_PADDING} from '../utils/constants';
import type {Routes} from './Routes';

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const BANNER_IMAGE =
//   require('../../docs/static/img/11.png') as ImageRequireSource;

type Props = NativeStackScreenProps<Routes, 'PermissionsPage'>;
export function PermissionsPage({navigation}: Props): React.ReactElement {
  const [cameraPermissionStatus, setCameraPermissionStatus] =
    useState<CameraPermissionStatus>('not-determined');
  // const [microphonePermissionStatus, setMicrophonePermissionStatus] =
  //   useState<CameraPermissionStatus>('not-determined');

  // const requestMicrophonePermission = useCallback(async () => {
  //   console.log('Requesting microphone permission...');
  //   const permission = await Camera.requestMicrophonePermission();
  //   console.log(`Microphone permission status: ${permission}`);

  //   if (permission === 'denied') await Linking.openSettings();
  //   setMicrophonePermissionStatus(permission);
  // }, []);

  const requestCameraPermission = useCallback(async () => {
    console.log('Requesting camera permission...');
    const permission = await Camera.requestCameraPermission();
    console.log(`Camera permission status: ${permission}`);

    if (permission === 'denied') {
      await Linking.openSettings();
    }
    setCameraPermissionStatus(permission);
  }, []);

  useEffect(() => {
    if (cameraPermissionStatus === 'authorized') {
      navigation.replace('CameraPage');
    }
  }, [cameraPermissionStatus, navigation]);

  // useEffect(() => {
  //   if (cameraPermissionStatus === 'authorized' && microphonePermissionStatus === 'authorized') navigation.replace('CameraPage');
  // }, [cameraPermissionStatus, microphonePermissionStatus, navigation]);

  return (
    <View style={styles.container}>
      {/* <Image source={BANNER_IMAGE} style={styles.banner} />r */}
      <Text style={styles.welcome}>Welcome to{'\n'}Vision Camera.</Text>
      <View style={styles.permissionsContainer}>
        {cameraPermissionStatus !== 'authorized' && (
          <Text style={styles.permissionText}>
            Vision Camera needs{' '}
            <Text style={styles.bold}>Camera permission</Text>.{' '}
            <Text style={styles.hyperlink} onPress={requestCameraPermission}>
              Grant
            </Text>
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  welcome: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 38,
    maxWidth: '80%',
  },
  banner: {
    position: 'absolute',
    opacity: 0.4,
    bottom: 0,
    left: 0,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    ...SAFE_AREA_PADDING,
  },
  permissionsContainer: {
    marginTop: CONTENT_SPACING * 2,
  },
  permissionText: {
    fontSize: 17,
  },
  hyperlink: {
    color: '#007aff',
    fontFamily: 'Montserrat-Bold',
  },
  bold: {
    fontFamily: 'Montserrat-Bold',
  },
});
