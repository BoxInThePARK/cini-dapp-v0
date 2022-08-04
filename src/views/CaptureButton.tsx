import React, {useCallback, useMemo, useState} from 'react';
import {
  StyleSheet,
  View,
  ViewProps,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {CAPTURE_BUTTON_SIZE} from '../utils/constants';
import type {
  Camera,
  TakePhotoOptions,
  TakeSnapshotOptions,
  PhotoFile,
} from 'react-native-vision-camera';
import CameraRoll from '@react-native-community/cameraroll';

const BORDER_WIDTH = CAPTURE_BUTTON_SIZE * 0.1;
const MEDIA_TYPE = 'photo';

interface CaptureButtonProps extends ViewProps {
  camera: React.RefObject<Camera>;

  onMediaCaptured: (media: PhotoFile, type: 'photo') => void;

  flash: 'off' | 'on';
}

const CaptureButton = ({
  style,
  camera,
  onMediaCaptured,
  flash,
}: CaptureButtonProps) => {

  const takePhotoOptions = useMemo<TakePhotoOptions & TakeSnapshotOptions>(
    () => ({
      // photoCodec: 'jpeg',
      // qualityPrioritization: 'speed',
      flash: flash,
      // quality: 90,
      // skipMetadata: true,
    }),
    [flash],
  );

  const takePhoto = useCallback(async () => {
    try {
      if (camera.current === null) throw new Error('Camera ref is null!');

      console.log('Taking photo...');
      const media = await camera.current.takePhoto(takePhotoOptions);
      // const media = await camera.current.takeSnapshot({
      //   quality: 85,
      //   skipMetadata: true,
      // });
      if (media) {
        // setPhoto(newPhoto);
        console.log(`Media captured! ${JSON.stringify(media)}`);
        const splitString = media.path.split('/');
        const fileName = splitString.pop();
        // await CameraRoll.save(`file://${splitString.join('/')}/image/${fileName}`, {
        //   type: MEDIA_TYPE,
        // });
        await CameraRoll.save(`file://${media.path}`, {
          type: MEDIA_TYPE,
        });
        console.log('Done');
        // onMediaCaptured(media, MEDIA_TYPE);
      } else {
        console.error('Failed to take photo!');
      }
    } catch (e) {
      console.error('Failed to take photo!', e);
    }
  }, [camera, takePhotoOptions]);

  const onHandlerStateChanged = useCallback(async () => {
    try {
      await takePhoto();
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
