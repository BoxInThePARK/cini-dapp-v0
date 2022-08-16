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
import {MockRollFilm} from '../utils/constants';

const windowWidth = Dimensions.get('window').width;

type Props = NativeStackScreenProps<Routes, 'SinglePhoto'>;

const SinglePhotoScreen = ({navigation, route}: Props) => {
  const {imageSource, imageRatio, creatorInfo} = route.params;
  const [filmRollName, setFilmRollName] = useState('Loading...');

  useEffect(() => {
    console.log('imageSource', imageSource);
    console.log('imageRatio', imageRatio);
    console.log('creatorInfo', creatorInfo);
    if (imageSource) {
      const splitArr = imageSource.split('/');
      const fileNameArr = splitArr[splitArr.length - 1].split('.');
      const nameArr = fileNameArr[0].split('_');
      setFilmRollName(nameArr[nameArr.length - 1]);
    }
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
      <View style={[styles.filmRollBox, {top: windowWidth / imageRatio - 14}]}>
        <TouchableOpacity style={styles.filmRollContent} onPress={() => {}}>
          <Text style={styles.filmRollText}>
            {MockRollFilm[filmRollName].display}
          </Text>
        </TouchableOpacity>
      </View>
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
  filmRollBox: {
    width: 116,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#FFDA58',
    position: 'absolute',
    right: 16,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    elevation: 10,
  },
  filmRollContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filmRollText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
    lineHeight: 20,
    color: '#262626',
    marginLeft: 4,
  },
  userInfoBox: {
    width: 72,
    height: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    top: 8,
    left: 16,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.4,
    elevation: 20,
  },
  userInfoContent: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  userPfp: {
    width: 20,
    aspectRatio: 1,
    borderRadius: 10,
  },
  userNameText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 8,
    lineHeight: 20,
    color: '#262626',
    marginLeft: 4,
  },
});

export default SinglePhotoScreen;
