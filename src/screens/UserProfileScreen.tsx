import React, {useState, useEffect, useCallback, useContext} from 'react';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {Routes} from './Routes';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  PermissionsAndroid,
} from 'react-native';
import {Button} from 'react-native-paper';
import RNFS from 'react-native-fs';
import TabBar from '../components/TabBar';
import {SAFE_AREA_PADDING} from '../utils/constants';
import {CaptureContext} from '../App';

const TAB_LIST = ['developed', 'for sale', 'collected', 'undeveloped'];

type Props = NativeStackScreenProps<Routes, 'UserProfilePage'>;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const UserProfileScreen = ({navigation, route}: Props) => {
  const {initialTab} = route.params;
  const captureContext = useContext(CaptureContext);
  const [hasMediaLoaded, setHasMediaLoaded] = useState(false);
  const [developedList, setDevelopedList] = useState<String[]>([]);
  const [saleingList, setSaleingList] = useState<String[]>([]);
  const [collectedList, setCollectedList] = useState<String[]>([]);
  const [undevelopedList, setUndevelopedList] = useState<String[]>([]);

  const [selectedTab, setSelectedTab] = useState(0);
  const [isGranted, setIsGranted] = useState(false);

  const getImageList = useCallback(async () => {
    try {
      console.log('getImageList');
      const result = await RNFS.readDir(
        `${RNFS.DocumentDirectoryPath}/cini_media`,
      );

      const imageList = result
        .filter(item => item.isFile)
        .map(item => item.path).reverse();

      setUndevelopedList(imageList);
      captureContext.setIsCapture(false);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const getPermissions = useCallback(async () => {
    const isGranted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message: 'Cini needs access to your storage to save your media.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    if (isGranted === PermissionsAndroid.RESULTS.GRANTED) {
      setIsGranted(true);
      console.log('You can use the storage');
    }
  }, []);

  useEffect(() => {
    console.log('open user profile page');
    getPermissions();
  }, []);

  useEffect(() => {
    console.log('isCapture', captureContext.isCapture);
    if (isGranted) {
      getImageList();
    }
  }, [isGranted, captureContext.isCapture]);

  useEffect(() => {
    setSelectedTab(initialTab ?? 0)
  },[initialTab])

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
        <TabBar
          tabList={TAB_LIST}
          currentTabIndex={selectedTab}
          setPressedTab={setSelectedTab}
        />

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
            }}>
            {selectedTab === 0 &&
              (developedList.length > 0 ? (
                developedList.map((source, index) => (
                  <Image
                    key={index}
                    source={{uri: `file://${source}`}}
                    style={{
                      width: '33.33%',
                      height: windowWidth / 3,
                    }}
                    resizeMode="cover"
                    // onLoadEnd={onMediaLoadEnd}
                    // onLoad={onMediaLoad}
                  />
                ))
              ) : (
                <View style={styles.noImageWrapper}>
                  <Text style={styles.noImageText}>
                    Go pick one photo to develop! 📸
                  </Text>
                </View>
              ))}
            {selectedTab === 1 &&
              (saleingList.length > 0 ? (
                saleingList.map((source, index) => (
                  <Image
                    key={index}
                    source={{uri: `file://${source}`}}
                    style={{
                      width: '33.33%',
                      height: windowWidth / 3,
                    }}
                    resizeMode="cover"
                    // onLoadEnd={onMediaLoadEnd}
                    // onLoad={onMediaLoad}
                  />
                ))
              ) : (
                <View style={styles.noImageWrapper}>
                  <Text style={styles.noImageText}>Nothing for sale now~</Text>
                </View>
              ))}
            {selectedTab === 2 &&
              (collectedList.length > 0 ? (
                collectedList.map((source, index) => (
                  <Image
                    key={index}
                    source={{uri: `file://${source}`}}
                    style={{
                      width: '33.33%',
                      height: windowWidth / 3,
                    }}
                    resizeMode="cover"
                    // onLoadEnd={onMediaLoadEnd}
                    // onLoad={onMediaLoad}
                  />
                ))
              ) : (
                <View style={styles.noImageWrapper}>
                  <Text style={styles.noImageText}>
                    Go to have your collection! 🖼
                  </Text>
                </View>
              ))}
            {selectedTab === 3 &&
              (undevelopedList.length > 0 ? (
                undevelopedList.map((source, index) => (
                  <Image
                    key={index}
                    source={{uri: `file://${source}`}}
                    style={{
                      width: '33.33%',
                      height: windowWidth / 3,
                    }}
                    resizeMode="cover"
                    // onLoadEnd={onMediaLoadEnd}
                    // onLoad={onMediaLoad}
                  />
                ))
              ) : (
                <View style={styles.noImageWrapper}>
                  <Text style={styles.noImageText}>
                    Capture your first photo! 📸
                  </Text>
                </View>
              ))}
          </View>
          <View style={{width: '100%', height: 260}}></View>
        </ScrollView>
      </View>
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
  ImageWrapper: {
    width: '100%',
    height: '100%',
    overflowY: 'scroll',
    display: 'flex',
    flexGrow: 2,
    // justifyContent: 'flex-start',
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
    flexBasis: '33.33%',
    height: windowWidth / 3,
  },
  noImageWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  noImageText: {
    fontSize: 18,
    color: '#262626',
  },
});

export default UserProfileScreen;
