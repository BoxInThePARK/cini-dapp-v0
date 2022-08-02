import React, {useState, useEffect, useMemo, useRef, useCallback} from 'react';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {
  Camera,
  CameraPermissionStatus,
  CameraDeviceFormat,
  useCameraDevices,
  sortFormats,
  PhotoFile,
  VideoFile,
} from 'react-native-vision-camera';
import {useIsForeground} from '../hooks/useIsForeground';
import CaptureButton from '../views/CaptureButton';
import type {Routes} from './Routes';
import {SAFE_AREA_PADDING} from '../utils/constants';
import {useIsFocused} from '@react-navigation/native';

const TRANSITIONS = ['fade', 'slide', 'none'];

type Props = NativeStackScreenProps<Routes, 'CameraPage'>;
const CameraScreen = ({navigation}: Props) => {
  const camera = useRef<Camera>(null);
  const [hidden, setHidden] = useState(false);
  const [statusBarTransition, setStatusBarTransition] = useState(
    TRANSITIONS[0],
  );
  const [cameraPermission, setCameraPermission] =
    useState<CameraPermissionStatus>();

  const devices = useCameraDevices();
  const device = devices.back;
  const formats = useMemo<CameraDeviceFormat[]>(() => {
    if (device?.formats == null) return [];
    return device.formats.sort(sortFormats);
  }, [device?.formats]);
  const isFocused = useIsFocused();

  useEffect(() => {
    Camera.getCameraPermissionStatus().then(setCameraPermission);
    setHidden(true);
  }, []);

  const onMediaCaptured = useCallback(
    (media: PhotoFile, type: 'photo') => {
      console.log(`Media captured! ${JSON.stringify(media)}`);
      navigation.navigate('MediaPage', {
        path: media.path,
        type: type,
      });
    },
    [navigation],
  );

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
    <View style={styles.cameraWrapper}>
      <StatusBar showHideTransition={'slide'} hidden={true} />
      <Camera
        ref={camera}
        device={device}
        isActive={isFocused}
        style={StyleSheet.absoluteFill}
        photo={true}
      />
        <CaptureButton style={styles.captureButton} camera={camera} onMediaCaptured={onMediaCaptured} flash={'off'}/>
      
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  cameraWrapper: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  captureButton: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: SAFE_AREA_PADDING.paddingBottom,
  },
  cameraControlPannel: {},
});
