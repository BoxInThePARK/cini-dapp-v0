import CameraRoll from '@react-native-community/cameraroll';
import React, {useCallback, useContext, useMemo, useState} from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';
import RNFS from 'react-native-fs';
import type {
  Camera,
  PhotoFile,
  TakePhotoOptions,
  TakeSnapshotOptions,
} from 'react-native-vision-camera';

import {CaptureContext} from '../App';
import {CAPTURE_BUTTON_SIZE} from '../utils/constants';

const BORDER_WIDTH = CAPTURE_BUTTON_SIZE * 0.1;
const MEDIA_TYPE = 'photo';
const PHOTOS_PATH = RNFS.ExternalStorageDirectoryPath + '/DCIM';

interface CaptureButtonProps extends ViewProps {
  camera: React.RefObject<Camera>;
  flash: 'off' | 'on';
}

const CaptureButton = ({style, camera, flash}: CaptureButtonProps) => {
  const captureContext = useContext(CaptureContext);
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

  const takePhoto = useCallback(async () => {
    try {
      if (camera.current === null) {
        throw new Error('Camera ref is null!');
      }

      console.log('Taking photo...');
      const media = await camera.current.takePhoto(takePhotoOptions);
      if (media) {
        console.log(`Media captured! ${JSON.stringify(media)}`);
        const splitString = media.path.split('/');
        const fileName = splitString.pop();
        await CameraRoll.save(`file://${media.path}`, {
          type: MEDIA_TYPE,
        });

        await RNFS.copyFile(
          `file://${media.path}`,
          `file://${RNFS.DocumentDirectoryPath}/cini_media/${fileName}`,
        );

        await RNFS.unlink(`file://${media.path}`);
        await RNFS.unlink(`file://${PHOTOS_PATH}/${fileName}`);
      } else {
        console.error('Failed to take photo!');
      }
    } catch (e) {
      console.error('Failed', e);
    }
  }, [camera, takePhotoOptions]);

  const onHandlerStateChanged = useCallback(async () => {
    try {
      await takePhoto();
      console.log('isCapture', captureContext.isCapture);
      if (!captureContext.isCapture) {
        captureContext.setIsCapture(true);
      }
    } finally {
      setTimeout(() => {
        console.log('reset');
      }, 500);
    }
  }, [takePhoto]);

  return (
    <View style={style}>
      <TouchableOpacity onPress={onHandlerStateChanged}>
        <View style={styles.button} />
      </TouchableOpacity>
    </View>
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
});

export default CaptureButton;
