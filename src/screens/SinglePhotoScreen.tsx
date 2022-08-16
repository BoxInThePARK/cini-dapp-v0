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
import IonIcon from 'react-native-vector-icons/Ionicons';

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
      <TouchableOpacity
        style={styles.pointButtonBox}
        onPress={() => {
          navigation.goBack();
        }}>
        <IonIcon name="chevron-back" size={12} color="#262626" />
      </TouchableOpacity>
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
    position: 'relative',
  },
  PhotoWrapper: {},
  pointButtonBox: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    top: 20,
    left: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SinglePhotoScreen;
