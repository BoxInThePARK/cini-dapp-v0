import React, {useCallback, useContext, useEffect, useState} from 'react';
import type {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import type {Routes} from './Routes';
import {
  Dimensions,
  Image,
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;

type Props = NativeStackScreenProps<Routes, 'SinglePhoto'>;

const SinglePhotoScreen = ({navigation, route}: Props) => {
  const {imageSource, imageRatio, creatorInfo} = route.params;

  useEffect(() => {
    console.log('imageSource', imageSource);
    console.log('imageRatio', imageRatio);
    console.log('creatorInfo', creatorInfo);
  }, []);

  return (
    <View style={styles.screenContainer}>
      <Image
        source={{uri: `file://${imageSource}`}}
        style={{
          width: windowWidth,
          aspectRatio: imageRatio,
        }}
        resizeMode="cover"
      />
      <Text>SinglePhoto Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  PhotoWrapper: {},
});

export default SinglePhotoScreen;
