import React, {useState, useEffect, useCallback} from 'react';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {Routes} from './Routes';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Button} from 'react-native-paper';
import RNFS from 'react-native-fs';
import TabBar from '../components/TabBar';
import {SAFE_AREA_PADDING} from '../utils/constants';

const TAB_LIST = ['developed', 'for sale', 'collected', 'undeveloped'];

type Props = NativeStackScreenProps<Routes, 'UserProfilePage'>;

const UserProfileScreen = ({navigation}: Props) => {
  const [hasMediaLoaded, setHasMediaLoaded] = useState(false);
  const [imageList, setImageList] = useState<String[]>(['']);
  const [selectedTab, setSelectedTab] = useState(0);

  const getImageList = useCallback(async () => {
    try {
      const result = await RNFS.readDir(
        `${RNFS.DocumentDirectoryPath}/cini_media`,
      );

      const imageList = result
        .filter(item => item.isFile)
        .map(item => item.path);

      setImageList(imageList);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    console.log('open user profile page');
    getImageList();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/img/template_profile_cover.png')}
          style={styles.coverImg}
          resizeMode="cover"
        />
        <Image
          source={require('../assets/img/pfp.png')}
          style={styles.pfpImg}
          resizeMode="cover"
        />
        <View style={styles.userNameBox}>
          <Text style={styles.userNameText}>@nearop</Text>
        </View>
      </View>

      <View style={styles.ContentWrapper}>
        <TabBar tabList={TAB_LIST} currentTabIndex={selectedTab} setPressedTab={setSelectedTab} />

        {imageList.map((source, index) => (
          <Image
            key={index}
            source={{uri: `file://${source}`}}
            style={styles.img}
            resizeMode="cover"
            // onLoadEnd={onMediaLoadEnd}
            // onLoad={onMediaLoad}
          />
        ))}
      </View>

      {/* <Button
        style={{width: '80%', height: 52, backgroundColor: '#279AF1'}}
        contentStyle={styles.startButton}
        mode="contained"
        uppercase
        onPress={() => {}}>
        <Text style={styles.buttonText}>Camera Page</Text>
      </Button> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F1E8DF',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    position: 'relative',
  },
  coverImg: {
    width: '100%',
    height: 180,
    // zIndex: 1,
    marginBottom: 80,
  },
  pfpImg: {
    position: 'absolute',
    width: 72,
    height: 72,
    borderRadius: 36,
    top: 142,
    left: 60,
    zIndex: 10,
  },
  userNameBox: {
    position: 'absolute',
    width: 90,
    height: 32,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    top: 164,
    left: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userNameText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 32,
    color: '#262626',
  },
  ContentWrapper: {
    width: '100%',
    height: '100%',
    paddingHorizontal: SAFE_AREA_PADDING.paddingLeft,
  },
  startButton: {
    width: '100%',
    height: 52,
    backgroundColor: '#279AF1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    width: '100%',
    fontSize: 24,
    lineHeight: 40,
    fontWeight: 'bold',
    color: '#000',
  },
  img: {
    // position: 'absolute',
    width: 100,
    height: 100,
    // zIndex: 1,
    marginBottom: 10,
  },
});

export default UserProfileScreen;
