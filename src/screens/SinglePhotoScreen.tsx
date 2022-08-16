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
import {SAFE_AREA_PADDING} from '../utils/constants';

const windowWidth = Dimensions.get('window').width;

type Props = NativeStackScreenProps<Routes, 'SinglePhoto'>;

interface PhotoContentProps {
  navigation: NativeStackNavigationProp<Routes, 'SinglePhoto', undefined>;
}

const PhotoContent = ({navigation}: PhotoContentProps) => {
  return (
    <ScrollView
      style={{
        width: '100%',
        flexGrow: 1,
      }}>
      <View
        style={{
          width: '100%',
          height: '100%',
          paddingHorizontal: SAFE_AREA_PADDING.paddingLeft + 6,
          justifyContent: 'flex-start',
        }}>
        <View style={styles.titleBox}>
          <View style={styles.photoNameBox}>
            <Text style={styles.photoNameText}>JUST A BUSAN BOY</Text>
            <Text style={styles.photoDateText}>Aug 7, 2022</Text>
          </View>
          <View style={styles.creatorWrapper}>
            <Text style={styles.creatorTitleText}>Created by</Text>
            <View style={styles.userInfoBox}>
              <TouchableOpacity
                style={styles.userInfoContent}
                onPress={() => {
                  navigation.navigate('UserProfilePage', {initialTab: 0});
                }}>
                <Image
                  source={require('../assets/img/pfp.png')}
                  style={styles.userPfp}
                  resizeMode="cover"
                />
                <Text style={styles.userNameText}>@nearop</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const SinglePhotoScreen = ({navigation, route}: Props) => {
  const {imageSource, imageRatio, creatorInfo} = route.params;
  const [filmRollName, setFilmRollName] = useState<string>('Loading...');

  useEffect(() => {
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
      {imageRatio && (
        <View
          style={[styles.filmRollBox, {top: windowWidth / imageRatio - 14}]}>
          <TouchableOpacity style={styles.filmRollContent} onPress={() => {}}>
            <Text style={styles.filmRollText}>
              {filmRollName === 'Loading...'
                ? filmRollName
                : MockRollFilm[filmRollName].display}
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <PhotoContent navigation={navigation} />
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
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    lineHeight: 20,
    color: '#262626',
    marginLeft: 4,
  },
  titleBox: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 4,
  },
  test: {},

  photoNameBox: {
    width: 200,
    height: '100%',
    justifyContent: 'flex-end',
  },
  photoNameText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    lineHeight: 20,
    color: '#000000',
  },
  photoDateText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    lineHeight: 18,
    color: '#9E9E9E',
  },
  creatorWrapper: {
    width: 84,
    height: '100%',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  creatorTitleText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 8,
    lineHeight: 15,
    color: '#9E9E9E',
  },
  userInfoBox: {
    width: 72,
    height: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.4,
    elevation: 5,
    marginBottom: 4,
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
