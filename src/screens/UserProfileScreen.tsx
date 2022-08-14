import type {NativeStackScreenProps} from '@react-navigation/native-stack';
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
} from 'react-native';
import RNFS from 'react-native-fs';
import {Button} from 'react-native-paper';
import IonIcon from 'react-native-vector-icons/Ionicons';

import {CaptureContext} from '../App';
import TabBar from '../components/TabBar';
import {SAFE_AREA_PADDING} from '../utils/constants';
import type {Routes} from './Routes';

const TAB_LIST_USER = ['Developed', 'Listings', 'Collected', 'Undeveloped'];
const TAB_LIST_PUBLIC = ['Creations', 'Listings', 'Collected'];

type Props = NativeStackScreenProps<Routes, 'UserProfilePage'>;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const IMAGE_WIDTH = '48.5%';

const UserProfileScreen = ({navigation, route}: Props) => {
  const {initialTab} = route.params;
  const captureContext = useContext(CaptureContext);
  const [isUser, setIsUser] = useState<boolean>(true);
  const [hasMediaLoaded, setHasMediaLoaded] = useState(false);
  const [developedList, setDevelopedList] = useState<String[]>([]);
  const [saleingList, setSaleingList] = useState<String[]>([]);
  const [collectedList, setCollectedList] = useState<String[]>([]);
  const [undevelopedList, setUndevelopedList] = useState<String[]>([]);
  const [listLenArray, setListLenArray] = useState<number[]>([0, 0, 0, 0]);

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
        .map(item => item.path)
        .reverse();

      setUndevelopedList(imageList);
      setDevelopedList(imageList);
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
    setListLenArray([
      developedList.length,
      saleingList.length,
      collectedList.length,
      undevelopedList.length,
    ]);
  }, [developedList, saleingList, collectedList, undevelopedList]);

  useEffect(() => {
    setSelectedTab(initialTab ?? 0);
  }, [initialTab]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/img/template_profile_cover.png')}
          style={styles.coverImg}
          resizeMode="cover"
        />
        <TouchableOpacity style={styles.pointButtonBox} onPress={() => {}}>
          {isUser ? (
            <IonIcon name="settings-sharp" size={12} color="#262626" />
          ) : (
            <IonIcon name="chevron-back" size={12} color="#262626" />
          )}
        </TouchableOpacity>
        <Image
          source={require('../assets/img/pfp.png')}
          style={styles.pfpImg}
          resizeMode="cover"
        />
        <View style={styles.userNameBox}>
          <Text style={styles.userNameText}>@nearop</Text>
        </View>
        <View style={styles.infomationBox}>
          <View>
            <Text style={styles.followNum}>169</Text>
            <Text style={styles.followText}>Following</Text>
          </View>
          <View>
            <Text style={styles.followNum}>239</Text>
            <Text style={styles.followText}>Followers</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.editFollowButton}
          onPress={() => {
            setIsUser(!isUser);
          }}>
          {isUser ? (
            <Text style={styles.editFollowText}>Edit</Text>
          ) : (
            <Text style={styles.editFollowText}>Follow</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.ContentWrapper}>
        <TabBar
          tabList={isUser ? TAB_LIST_USER : TAB_LIST_PUBLIC}
          lenList={listLenArray}
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
              justifyContent: 'space-between',
            }}>
            {selectedTab === 0 &&
              (developedList.length > 0 ? (
                developedList.map((source, index) => (
                  <Image
                    key={index}
                    source={{uri: `file://${source}`}}
                    style={styles.imageCard}
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
                    style={styles.imageCard}
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
                    style={styles.imageCard}
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
                    style={styles.imageCard}
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
          <View style={{width: '100%', height: 260}} />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    position: 'relative',
  },
  coverImg: {
    width: '100%',
    height: 197,
    marginBottom: 68,
  },
  pointButtonBox: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    top: 20,
    left: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pfpImg: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    top: 160,
    left: 16,
    zIndex: 10,
    elevation: 20,
  },
  infomationBox: {
    position: 'absolute',
    width: 112,
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    top: 186,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 6,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 6,
    shadowOpacity: 0.25,
    elevation: 10,
  },
  followNum: {
    fontFamily: "'Montserrat', 'Montserrat-Bold'",
    fontSize: 15,
    fontWeight: 'bold',
    lineHeight: 20,
    color: '#262626',
    textAlign: 'center',
  },
  followText: {
    fontFamily: "'Montserrat', 'Montserrat-Bold'",
    fontSize: 8,
    fontWeight: '600',
    lineHeight: 12,
    color: '#797575',
    textAlign: 'center',
  },
  userNameBox: {
    position: 'absolute',
    width: 80,
    height: 24,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    top: 186,
    left: 88,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 6,
    shadowOpacity: 0.25,
    elevation: 10,
  },
  userNameText: {
    fontFamily: "'Montserrat', 'Montserrat-Bold'",
    fontSize: 12,
    fontWeight: 'bold',
    lineHeight: 24,
    color: '#262626',
  },
  editFollowButton: {
    position: 'absolute',
    top: 212,
    left: 104,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editFollowText: {
    fontFamily: "'Montserrat', 'Montserrat-Bold'",
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
    color: '#797575',
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
  imageCard: {
    width: IMAGE_WIDTH,
    height: windowWidth / 3,
    borderRadius: 10,
    marginBottom: 12,
  },
});

export default UserProfileScreen;
