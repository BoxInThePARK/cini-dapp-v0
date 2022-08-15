import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
  useContext,
} from 'react';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
  PermissionsAndroid,
  FlatList,
  Linking,
} from 'react-native';
import {
  Camera,
  CameraPermissionStatus,
  useCameraDevices,
  CameraDevice,
} from 'react-native-vision-camera';
import CaptureButton from '../views/CaptureButton';
import type {Routes} from './Routes';
import {MockRollFilm, SAFE_AREA_PADDING} from '../utils/constants';
import {useIsFocused} from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {CaptureContext} from '../App';
import RNFS from 'react-native-fs';

const TRANSITIONS = ['fade', 'slide', 'none'];
type FLASH_STATUS = 'off' | 'on';
type CAMERA_STATUS = 'front' | 'back';

type Props = NativeStackScreenProps<Routes, 'CameraPage'>;
const CameraScreen = ({navigation}: Props) => {
  const [cameraPermissionStatus, setCameraPermissionStatus] =
    useState<CameraPermissionStatus>('not-determined');
  const camera = useRef<Camera>(null);
  const [mockRollFilmNFTChech, setMockRollFilmNFTChech] =
    useState<Boolean>(false);
  const [flashStatus, setFlashStatus] = useState<FLASH_STATUS>('off');
  const [cameraStatus, setCameraStatus] = useState<CAMERA_STATUS>('back');
  const [isRollFilmListOpen, setIsRollFilmListOpen] = useState<Boolean>(false);
  const [rollFilmList, setRollFilmList] = useState<string[]>([]);
  const [selectedRollFilm, setSelectRollFilm] = useState<string>(
    MockRollFilm['CINI'].display,
  );
  const [hidden, setHidden] = useState(false);
  const [statusBarTransition, setStatusBarTransition] = useState(
    TRANSITIONS[0],
  );
  const [cameraPermission, setCameraPermission] =
    useState<CameraPermissionStatus>();
  const [isGranted, setIsGranted] = useState(false);
  const devices = useCameraDevices();
  const isFocused = useIsFocused();

  const requestCameraPermission = useCallback(async () => {
    const permission = await Camera.requestCameraPermission();

    if (permission === 'denied') {
      await Linking.openSettings();
    }
    setCameraPermissionStatus(permission);
  }, []);

  const checkDirExists = useCallback(async () => {
    const dirExist = await RNFS.exists(
      `${RNFS.DocumentDirectoryPath}/cini_media`,
    );
    if (!dirExist) {
      await RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/cini_media`);
      await RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/cini_media_cache`);
    }
  }, []);

  const getPermissions = useCallback(async () => {
    const isGranted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message: 'Cini needs access to your storage to save your media.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    if (isGranted === PermissionsAndroid.RESULTS.GRANTED) {
      setIsGranted(true);
      // console.log('You can use the storage');
    }
  }, []);

  useEffect(() => {
    // console.log('open camera');
    requestCameraPermission();
    getPermissions();
    setRollFilmList(
      Object.keys(MockRollFilm).map((roll: string) => {
        return MockRollFilm[roll].display;
      }),
    );
  }, []);

  useEffect(() => {
    Camera.getCameraPermissionStatus().then(setCameraPermission);
    checkDirExists();
    setHidden(true);
  }, [cameraPermissionStatus]);

  // useEffect(() => {
  //   if (isGranted) {
  //     getNewestPhoto();
  //   }
  // }, [isGranted, captureContext.isCapture]);

  // const onMediaCaptured = useCallback(
  //   (media: PhotoFile, type: 'photo') => {
  //     // console.log(`Media captured! ${JSON.stringify(media)}`);
  //     navigation.navigate('MediaPage', {
  //       path: media.path,
  //       type: type,
  //     });
  //   },
  //   [navigation],
  // );

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

  const handleCloseCamera = () => {
    navigation.navigate('MockHome');
  };

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

  const handleDisplayRollFilmList = () => {
    if (isRollFilmListOpen) {
      setIsRollFilmListOpen(false);
    } else {
      setIsRollFilmListOpen(true);
    }
  };

  const handleSelectRollFilm = (selectedItem: string) => {
    if (rollFilmList !== undefined && rollFilmList.length > 0) {
      setSelectRollFilm(selectedItem);
      setIsRollFilmListOpen(false);
      rollFilmList.splice(rollFilmList.indexOf(selectedItem), 1);
      rollFilmList.unshift(selectedItem);
    }
  };

  const handleSettingClick = () => {};

  const handleNavigateToUndevelopedPage = () => {
    navigation.navigate('UserProfilePage', {initialTab: 3});
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
        <TouchableOpacity onPress={handleCloseCamera}>
          <IonIcon name="close" size={48} color="white" style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.flashButton}>
        <TouchableOpacity onPress={handleFlashStatusChange}>
          {flashIcons}
        </TouchableOpacity>
      </View>
      <View style={styles.settingButton}>
        <TouchableOpacity onPress={handleSettingClick}>
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
      <CaptureButton
        style={styles.captureButton}
        isFileAccessGranted={isGranted}
        camera={camera}
        filmRoll={selectedRollFilm.split(' ')[0]}
        flash={flashStatus}
        handleNavigateToUndevelopedPage={handleNavigateToUndevelopedPage}
      />
      <View style={styles.flipCameraButton}>
        <TouchableOpacity onPress={handleCameraStatusChange}>
          <MaterialIcons
            name="flip-camera-android"
            size={48}
            color="white"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <View
        style={
          isRollFilmListOpen ? styles.rollFilmList : styles.rollFilmButton
        }>
        {isRollFilmListOpen ? (
          <FlatList
            data={rollFilmList}
            renderItem={({item}) => (
              <TouchableOpacity
                style={{marginBottom: 8}}
                onPress={() => {
                  handleSelectRollFilm(item);
                }}>
                <MaterialIcons
                  name="camera-roll"
                  size={48}
                  color="white"
                  style={styles.icon}
                />
                <Text style={{color: 'white'}}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        ) : (
          <TouchableOpacity onPress={handleDisplayRollFilmList}>
            <MaterialIcons
              name="camera-roll"
              size={48}
              color="white"
              style={styles.icon}
            />
            <Text style={{color: 'white'}}>{selectedRollFilm}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  cameraWrapper: {
    flex: 1,
    backgroundColor: '#000',
    position: 'relative',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    left: SAFE_AREA_PADDING.paddingLeft,
    width: 56,
    height: 56,
    zIndex: 20,
  },
  flashButton: {
    position: 'absolute',
    alignSelf: 'center',
    top: 16,
    width: 56,
    height: 56,
    zIndex: 20,
  },
  settingButton: {
    position: 'absolute',
    top: 16,
    right: SAFE_AREA_PADDING.paddingRight,
    width: 56,
    height: 56,
    zIndex: 20,
  },
  photosButton: {
    position: 'absolute',
    bottom: SAFE_AREA_PADDING.paddingBottom,
    left: SAFE_AREA_PADDING.paddingRight,
    width: 56,
    height: 56,
    zIndex: 20,
  },
  captureButton: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: SAFE_AREA_PADDING.paddingBottom,
    zIndex: 20,
  },
  flipCameraButton: {
    position: 'absolute',
    bottom: SAFE_AREA_PADDING.paddingBottom,
    right: SAFE_AREA_PADDING.paddingRight,
    width: 56,
    height: 56,
    zIndex: 20,
  },
  rollFilmButton: {
    position: 'absolute',
    top: '50%',
    right: SAFE_AREA_PADDING.paddingRight,
    width: 56,
    height: 56,
    zIndex: 20,
  },
  rollFilmList: {
    position: 'absolute',
    top: '50%',
    right: SAFE_AREA_PADDING.paddingRight,
    width: 56,
    height: 200,
    zIndex: 20,
  },
  icon: {},
  iconLeftRotate: {
    transform: [{rotate: '-10deg'}],
  },
  previewPhoto: {
    width: 40,
    height: 40,
    borderRadius: 5,
    position: 'absolute',
    top: 0,
    left: 12,
    elevation: 10,
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
  cameraFlicker: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
    zIndex: 10,
  },
});
