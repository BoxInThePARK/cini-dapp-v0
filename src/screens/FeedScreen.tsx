import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  PermissionsAndroid,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import RNFS from 'react-native-fs';
import {SAFE_AREA_PADDING} from '../utils/constants';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const FeedHead = () => {
  return (
    <View style={styles.headWrapper}>
      <View style={styles.searchBar}>
        <EntypoIcon name="magnifying-glass" size={16} color="#262626" />
        <TextInput
          style={styles.searchInputTextBox}
          placeholder="Search"
          placeholderTextColor="#00000050"
          keyboardType="default"
        />
      </View>
      <FontAwesomeIcon name="sliders" size={24} color="#262626" />
    </View>
  );
};

const Titles = () => {
  return (
    <View style={styles.titleWrapper}>
      <Text style={styles.titleText}>New developed</Text>
      <EntypoIcon name="chevron-up" size={28} color="#262626" />
    </View>
  );
};
interface GalleryProps {
  inputImageList: string[];
  imageRatios: number[];
  // imageSizes: Record<string, number>[];
}

const Gallery = ({inputImageList, imageRatios}: GalleryProps) => {
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
          paddingHorizontal: SAFE_AREA_PADDING.paddingLeft + 9,
          justifyContent: 'flex-start',
        }}>
        {inputImageList.map((source, index) => {
          console.log(`imageRatios[${index}]`, imageRatios[index]);
          return (
            <View
              key={index}
              style={{
                width: windowWidth - (SAFE_AREA_PADDING.paddingLeft + 9) * 2,
                aspectRatio: imageRatios[index],
                marginBottom: 12,
                position: 'relative',
              }}>
              <Image
                key={index}
                source={{uri: `file://${source}`}}
                style={[
                  styles.imageCard,
                  {
                    width:
                      windowWidth - (SAFE_AREA_PADDING.paddingLeft + 9) * 2,
                    aspectRatio: imageRatios[index],
                  },
                ]}
                resizeMode="cover"
              />
              {/* <TouchableOpacity onPress={() => {}}> */}
              <View style={styles.userInfoBox}>
                <TouchableOpacity
                  style={styles.userInfoContent}
                  onPress={() => {}}>
                  <Image
                    source={require('../assets/img/pfp.png')}
                    style={styles.userPfp}
                    resizeMode="cover"
                  />
                  <Text style={styles.userNameText}>@nearop</Text>
                </TouchableOpacity>
              </View>
              {/* </TouchableOpacity> */}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const FeedScreen = () => {
  const [developedList, setDevelopedList] = useState<string[]>([]);
  const [imageRatios, setImageRatios] = useState<number[]>([]);

  const getImageRatios = async (imageList: string[]) => {
    const preRatio: number[] = [];
    const promiseArr = imageList.map(source => {
      return Image.getSize(`file://${source}`, (width, height) => {
        preRatio.push(width / height);
      });
    });

    await Promise.all(promiseArr);
    setImageRatios(preRatio);
  };

  const getImageList = useCallback(async () => {
    try {
      const result = await RNFS.readDir(
        `${RNFS.DocumentDirectoryPath}/cini_media/developed`,
      );

      const imageList = result
        .filter(item => item.isFile)
        .map(item => item.path)
        .reverse();

      setDevelopedList(imageList);
      await getImageRatios(imageList);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getImageList();
  }, []);

  return (
    <View style={styles.screenContainer}>
      <FeedHead />
      <Titles />
      {developedList.length > 0 && imageRatios.length > 0 && (
        <Gallery inputImageList={developedList} imageRatios={imageRatios} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  headWrapper: {
    width: '100%',
    height: 72,
    paddingHorizontal: SAFE_AREA_PADDING.paddingLeft + 9,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleWrapper: {
    width: '100%',
    paddingHorizontal: SAFE_AREA_PADDING.paddingLeft + 9,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#262626',
    marginRight: 8,
  },
  contentWrapper: {
    width: '100%',
    height: '100%',
    paddingHorizontal: SAFE_AREA_PADDING.paddingLeft + 9,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  searchBar: {
    width: 232,
    height: 40,
    paddingHorizontal: SAFE_AREA_PADDING.paddingLeft,
    borderRadius: 20,
    backgroundColor: '#EEEEEE',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  searchInputTextBox: {
    width: '100%',
    height: '100%',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
    color: '#262626',
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
  imageCard: {
    borderRadius: 15,
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
    elevation: 10,
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

export default FeedScreen;
