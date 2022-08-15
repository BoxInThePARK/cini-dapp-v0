import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  PermissionsAndroid,
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
}

const Gallery = ({inputImageList}: GalleryProps) => {
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
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}>
        {inputImageList.map((source, index) => (
          <Image
            key={index}
            source={{uri: `file://${source}`}}
            style={styles.imageCard}
            resizeMode="cover"
            // onLoadEnd={onMediaLoadEnd}
            // onLoad={onMediaLoad}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const FeedScreen = () => {
  const [developedList, setDevelopedList] = useState<string[]>([]);

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
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    // console.log('isCapture', captureContext.isCapture);
    // if (isGranted) {
    getImageList();
    // }
  }, []);

  return (
    <View style={styles.screenContainer}>
      <FeedHead />
      <Titles />
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
    width: '100%',
    height: '100%',
    borderRadius: 10,
    marginBottom: 12,
  },
});

export default FeedScreen;
