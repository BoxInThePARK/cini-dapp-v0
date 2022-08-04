import React, {useState, useEffect, useMemo, useRef, useCallback} from 'react';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {
  Camera,
  CameraPermissionStatus,
  CameraDeviceFormat,
  useCameraDevices,
  sortFormats,
  PhotoFile,
  CameraDevice,
} from 'react-native-vision-camera';
import {useIsForeground} from '../hooks/useIsForeground';
import CaptureButton from '../views/CaptureButton';
import type {Routes} from './Routes';
import {SAFE_AREA_PADDING, CAPTURE_BUTTON_SIZE} from '../utils/constants';
import {useIsFocused} from '@react-navigation/native';
import {MediaPage} from './MediaPage';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const TRANSITIONS = ['fade', 'slide', 'none'];
type FLASH_STATUS = 'off' | 'on';
type CAMERA_STATUS = 'front' | 'back';

type Props = NativeStackScreenProps<Routes, 'CameraPage'>;
const CameraScreen = ({navigation}: Props) => {
  const camera = useRef<Camera>(null);
  const [mockRollFilmNFTChech, setMockRollFilmNFTChech] =
    useState<Boolean>(false);
  const [flashStatus, setFlashStatus] = useState<FLASH_STATUS>('off');
  const [cameraStatus, setCameraStatus] = useState<CAMERA_STATUS>('back');
  const [hidden, setHidden] = useState(false);
  const [statusBarTransition, setStatusBarTransition] = useState(
    TRANSITIONS[0],
  );
  const [cameraPermission, setCameraPermission] =
    useState<CameraPermissionStatus>();

  const devices = useCameraDevices();
  //   const testDevice = devices.back;

  //   const formats = useMemo<CameraDeviceFormat[]>(() => {
  //     if (device?.formats == null) return [];
  //     return device.formats.sort(sortFormats);
  //   }, [device?.formats]);
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

  const closeCamera = useCallback(() => {
    navigation.navigate('MockHome');
  }, [navigation]);

  const flashIcons = useMemo(() => {
    if (flashStatus === 'off') {
      return (
        <IonIcon
          name="ios-flash-off-sharp"
          size={48}
          color="white"
          style={styles.icon}
        />
      );
    } else {
      return (
        <IonIcon
          name="ios-flash-sharp"
          size={48}
          color="white"
          style={styles.icon}
        />
      );
    }
  }, [flashStatus]);

  const cameraVariant = useMemo<CameraDevice | undefined>(():
    | CameraDevice
    | undefined => {
    if (cameraStatus === 'back') {
      return devices.back;
    } else {
      return devices.front;
    }
  }, [cameraStatus, devices]);

  if (cameraVariant === null || cameraVariant === undefined) {
    return (
      <View style={StyleSheet.absoluteFill}>
        <Text>Loading ...</Text>
      </View>
    );
  }

  const handleFlashStatusChange = () => {
    if (flashStatus === 'off') {
      setFlashStatus('on');
    } else {
      setFlashStatus('off');
    }
  };

  const handleCameraStatusChange = () => {
    if (cameraStatus === 'back') {
      setCameraStatus('front');
    } else {
      setCameraStatus('back');
    }
  };

  const handleSettingClick = () => {
    
  };

  if (cameraPermission === null) {
    return (
      <View>
        <Text>Need camera permission</Text>
      </View>
    );
  }

  return (
    <View style={styles.cameraWrapper}>
      <StatusBar showHideTransition={'slide'} hidden={true} />
      <View style={styles.closeButton}>
        <TouchableOpacity onPress={closeCamera}>
          <IonIcon name="close" size={48} color="white" style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.flashButton}>
        <TouchableOpacity onPress={handleFlashStatusChange}>
          {flashIcons}
        </TouchableOpacity>
      </View>
      <View style={styles.settingButton}>
        <TouchableOpacity onPress={closeCamera}>
          <IonIcon
            name="ios-settings-sharp"
            size={48}
            color="white"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <Camera
        ref={camera}
        device={cameraVariant}
        isActive={isFocused}
        style={StyleSheet.absoluteFill}
        photo={true}
      />
      <View style={styles.photosButton}>
        <TouchableOpacity onPress={closeCamera}>
          <MaterialIcons
            name="photo"
            size={48}
            color="white"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <CaptureButton
        style={styles.captureButton}
        camera={camera}
        onMediaCaptured={onMediaCaptured}
        flash={flashStatus}
      />
      <View style={styles.flipCameraButton}>
        <TouchableOpacity onPress={handleCameraStatusChange}>
          <MaterialIcons
            name="flip-camera-android"
            size={48}
            color="white"
            style={cameraStatus === 'back' ? styles.icon : styles.iconFlip}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.rollFilmButton}>
        <TouchableOpacity onPress={closeCamera}>
          <MaterialIcons
            name="camera-roll"
            size={48}
            color="white"
            style={styles.icon}
          />
          <Text style={{color: 'white'}}>Kodak</Text>
        </TouchableOpacity>
      </View>
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
  closeButton: {
    position: 'absolute',
    top: SAFE_AREA_PADDING.paddingTop,
    left: SAFE_AREA_PADDING.paddingLeft,
    width: 56,
    height: 56,
    zIndex: 1,
  },
  flashButton: {
    position: 'absolute',
    alignSelf: 'center',
    top: SAFE_AREA_PADDING.paddingTop,
    width: 56,
    height: 56,
    zIndex: 1,
  },
  settingButton: {
    position: 'absolute',
    top: SAFE_AREA_PADDING.paddingTop,
    right: SAFE_AREA_PADDING.paddingRight,
    width: 56,
    height: 56,
    zIndex: 1,
  },
  photosButton: {
    position: 'absolute',
    bottom: SAFE_AREA_PADDING.paddingBottom,
    left: SAFE_AREA_PADDING.paddingRight,
    width: 56,
    height: 56,
    zIndex: 1,
  },
  captureButton: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: SAFE_AREA_PADDING.paddingBottom,
  },
  flipCameraButton: {
    position: 'absolute',
    bottom: SAFE_AREA_PADDING.paddingBottom,
    right: SAFE_AREA_PADDING.paddingRight,
    width: 56,
    height: 56,
    zIndex: 1,
  },
  rollFilmButton: {
    position: 'absolute',
    top: '50%',
    right: SAFE_AREA_PADDING.paddingRight,
    width: 56,
    height: 56,
    zIndex: 1,
  },
  icon: {
    textShadowColor: 'black',
    textShadowOffset: {
      height: 0,
      width: 0,
    },
    textShadowRadius: 1,
  },
  iconFlip: {
    textShadowColor: 'black',
    textShadowOffset: {
      height: 0,
      width: 0,
    },
    textShadowRadius: 1,
    transform: [{rotate: '180deg'}],
  },
  cameraControlPannel: {},
});
