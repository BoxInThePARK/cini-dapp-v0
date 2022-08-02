import React, {useState, useEffect} from 'react';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {
  Camera,
  CameraPermissionStatus,
  useCameraDevices,
} from 'react-native-vision-camera';
import type {Routes} from './Routes';

const TRANSITIONS = ['fade', 'slide', 'none'];

type Props = NativeStackScreenProps<Routes, 'CameraPage'>;
const CameraScreen = ({navigation}: Props) => {
  const [hidden, setHidden] = useState(false);
  const [statusBarTransition, setStatusBarTransition] = useState(TRANSITIONS[0]);
  const [cameraPermission, setCameraPermission] =
    useState<CameraPermissionStatus>();

  const devices = useCameraDevices();
  const device = devices.back;

  useEffect(() => {
    Camera.getCameraPermissionStatus().then(setCameraPermission);
    setHidden(true);
  }, []);

  if (cameraPermission === null) {
    return (
      <View>
        <Text>Need camera permission</Text>
      </View>
    );
  }

  if (device === null || device === undefined) {
    return (
      <View style={StyleSheet.absoluteFill}>
        <Text>Loading ...</Text>
      </View>
    );
  }

  return (
    <>
      <StatusBar showHideTransition={'slide'} hidden={true} />
      <Camera device={device} isActive={true} style={styles.test} />
    </>
  );
  //   return <Camera device={device} isActive={true} style={styles.test}/>;
};

export default CameraScreen;

const styles = StyleSheet.create({
  test: {
    width: '100%',
    height: '100%',
  },
});
