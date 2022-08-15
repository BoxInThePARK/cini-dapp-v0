import React, {
  useEffect,
  useCallback,
  useMemo,
  useState,
  useContext,
  useRef,
} from 'react';
import {
  Animated,
  StyleSheet,
  View,
  ViewProps,
  Button,
  TouchableOpacity,
  PanResponder,
  Alert,
  Image,
} from 'react-native';
import {SAFE_AREA_PADDING, CAPTURE_BUTTON_SIZE} from '../utils/constants';
import type {
  Camera,
  TakePhotoOptions,
  TakeSnapshotOptions,
  PhotoFile,
} from 'react-native-vision-camera';
import CameraRoll from '@react-native-community/cameraroll';
import RNFS from 'react-native-fs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {CaptureContext} from '../utils/context';

const BORDER_WIDTH = CAPTURE_BUTTON_SIZE * 0.1;
const MEDIA_TYPE = 'photo';
const PHOTOS_PATH = RNFS.ExternalStorageDirectoryPath + '/DCIM';

interface CaptureButtonProps extends ViewProps {
  isFileAccessGranted: boolean;
  camera: React.RefObject<Camera>;
  filmRoll: string;
  flash: 'off' | 'on';
  handleNavigateToUndevelopedPage: () => void;
}

const CaptureButton = ({
  isFileAccessGranted,
  style,
  camera,
  filmRoll,
  flash,
  handleNavigateToUndevelopedPage,
}: CaptureButtonProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const captureContext = useContext(CaptureContext);
  const [newPhotoPreview, setNewPhotoPreview] = useState<String>('');
  const takePhotoOptions = useMemo<TakePhotoOptions & TakeSnapshotOptions>(
    () => ({
      photoCodec: 'jpeg',
      qualityPrioritization: 'speed',
      flash: flash,
      quality: 90,
      skipMetadata: true,
    }),
    [flash],
  );

  const getNewestPhoto = useCallback(async () => {
    try {
      const result = await RNFS.readDir(
        `${RNFS.DocumentDirectoryPath}/cini_media`,
      );

      const imageList = result
        .filter(item => item.isFile)
        .map(item => item.path)
        .reverse();

      if (imageList.length > 0) {
        setNewPhotoPreview(imageList[0]);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const takePhoto = useCallback(
    async (usedFilmRoll: string) => {
      try {
        if (camera.current === null) throw new Error('Camera ref is null!');

        // console.log('Taking photo...');
        const media = await camera.current.takePhoto(takePhotoOptions);
        if (media) {
          // console.log(`Media captured! ${JSON.stringify(media)}`);
          const splitString = media.path.split('/');
          const fileName = splitString[splitString.length - 1];
          const splitFileName = fileName.split('.');
          await CameraRoll.save(`file://${media.path}`, {
            type: MEDIA_TYPE,
          });

          await RNFS.copyFile(
            `file://${media.path}`,
            `file://${RNFS.DocumentDirectoryPath}/cini_media/${splitFileName[0]}_${usedFilmRoll}.${splitFileName[1]}`,
          );

          await RNFS.unlink(`file://${media.path}`);
          await RNFS.unlink(`file://${PHOTOS_PATH}/${fileName}`);
        } else {
          console.error('Failed to take photo!');
        }
      } catch (e) {
        console.error('Failed', e);
      }
    },
    [camera, takePhotoOptions],
  );

  const makeScreenFlick = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 0.8,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 0.8,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const onHandlerStateChanged = useCallback(
    async (usedFilmRoll: string) => {
      try {
        // console.log('usedFilmRoll', usedFilmRoll);
        makeScreenFlick();
        await takePhoto(usedFilmRoll);
        getNewestPhoto();
        if (!captureContext.isCapture) {
          captureContext.setIsCapture(true);
        }
      } finally {
        setTimeout(() => {
          // console.log('reset');
        }, 500);
      }
    },
    [takePhoto],
  );

  useEffect(() => {
    if (isFileAccessGranted) {
      getNewestPhoto();
    }
  }, [isFileAccessGranted]);

  return (
    <>
      <Animated.View
        style={[
          styles.cameraFlicker,
          {
            opacity: fadeAnim, // Bind opacity to animated value
            // transform: [{scaleX: scaleAnim}], // Bind scale to animated value
          },
        ]}
      />
      <View style={styles.photosButton}>
        <TouchableOpacity onPress={handleNavigateToUndevelopedPage}>
          {newPhotoPreview ? (
            <View style={{position: 'relative'}}>
              <MaterialIcons
                name="photo"
                size={48}
                color="white"
                style={styles.iconLeftRotate}
              />
              <Image
                source={{uri: `file://${newPhotoPreview}`}}
                style={styles.previewPhoto}
                resizeMode="cover"
              />
            </View>
          ) : (
            <MaterialIcons
              name="photo"
              size={48}
              color="white"
              style={styles.icon}
            />
          )}
        </TouchableOpacity>
      </View>
      <View style={style}>
        <TouchableOpacity
          onPress={() => {
            onHandlerStateChanged(filmRoll.split(' ')[0]);
          }}>
          <View style={styles.button} />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    width: CAPTURE_BUTTON_SIZE,
    height: CAPTURE_BUTTON_SIZE,
    borderRadius: CAPTURE_BUTTON_SIZE / 2,
    borderWidth: BORDER_WIDTH,
    borderColor: 'white',
  },
  cameraFlicker: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
    zIndex: 10,
  },
  photosButton: {
    position: 'absolute',
    bottom: SAFE_AREA_PADDING.paddingBottom,
    left: SAFE_AREA_PADDING.paddingRight,
    width: 56,
    height: 56,
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
});

export default CaptureButton;
