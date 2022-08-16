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
  Pressable,
  Modal,
} from 'react-native';
import RNFS from 'react-native-fs';
import {Button} from 'react-native-paper';
import IonIcon from 'react-native-vector-icons/Ionicons';

import {CaptureContext} from '../utils/context';
import TabBar from '../components/TabBar';
import {SAFE_AREA_PADDING} from '../utils/constants';
import type {Routes} from './Routes';
import {ROLL_FILM, MockRollFilm, ROLL_FILM_SRC} from '../utils/constants';

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
  const [developedList, setDevelopedList] = useState<string[]>([]);
  const [developedRatios, setDevelopedRatios] = useState<number[]>([]);
  const [saleingList, setSaleingList] = useState<string[]>([]);
  const [collectedList, setCollectedList] = useState<string[]>([]);
  const [undevelopedList, setUndevelopedList] = useState<string[]>([]);
  const [undevelopedRatios, setUndevelopedRatios] = useState<number[]>([]);
  const [listLenArray, setListLenArray] = useState<number[]>([0, 0, 0, 0]);

  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [isGranted, setIsGranted] = useState<boolean>(false);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalImageData, setModalImageDate] = useState<string>('');
  const [modalFilmRoll, setModalFilmRoll] = useState<string>('');

  useEffect(() => {
    if (modalImageData) {
      const splitArr = modalImageData.split('/');
      const fileNameArr = splitArr[splitArr.length - 1].split('.');
      const nameArr = fileNameArr[0].split('_');

      if (nameArr[nameArr.length - 1].includes('m')) {
        setModalFilmRoll('LISBON');
      } else {
        setModalFilmRoll(nameArr[nameArr.length - 1]);
      }
    }
  }, [modalImageData]);

  // useEffect(() => {
  //   if (modalFilmRoll) {
  //     console.log('film roll', modalFilmRoll);
  //     console.log('check', MockRollFilm[modalFilmRoll].key);
  //   }
  // }, [modalFilmRoll]);

  const getImageRatios = async (
    imageList: string[],
    setImageRatios: (preRatio: number[]) => void,
  ) => {
    const preRatio: number[] = imageList.map(() => 0);

    const promiseArr = imageList.map((source, index) => {
      return Image.getSize(`file://${source}`, (width, height) => {
        preRatio[index] = width / height;
      });
    });

    await Promise.all(promiseArr);
    setImageRatios(preRatio);
  };

  const getImageList = useCallback(
    async (folder: string, setImageList: (imageList: string[]) => void) => {
      try {
        const result = await RNFS.readDir(
          `${RNFS.DocumentDirectoryPath}/cini_media/${folder}`,
        );

        const imageList = result
          .filter(item => item.isFile)
          .map(item => item.path)
          .reverse();

        setImageList(imageList);
        if (folder === 'developed') {
          setSaleingList(imageList);
          await getImageRatios(imageList, setDevelopedRatios);
        } else if (folder === 'undeveloped') {
          await getImageRatios(imageList, setUndevelopedRatios);
        }
        captureContext.setIsCapture(false);
      } catch (err) {
        console.log(err);
      }
    },
    [],
  );

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
    }
  }, []);

  useEffect(() => {
    getPermissions();
  }, []);

  useEffect(() => {
    if (isGranted) {
      getImageList('developed', setDevelopedList);
      getImageList('undeveloped', setUndevelopedList);
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
        <View style={styles.informationBox}>
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
                  // <View style={styles.imageCard}>
                  <Pressable
                    key={index}
                    style={styles.imageCard}
                    onPress={() => {
                      if (developedRatios.length > 0) {
                        navigation.navigate('SinglePhoto', {
                          imageSource: `file://${source}`,
                          imageRatio: developedRatios[index],
                          creatorInfo: {
                            avatar: '../assets/img/pfp.png',
                            name: '@nearop',
                          },
                        });
                      }
                    }}>
                    <Image
                      key={index}
                      source={{uri: `file://${source}`}}
                      style={{
                        width: '100%',
                        height: windowWidth / 3,
                        borderRadius: 10,
                        marginBottom: 12,
                      }}
                      resizeMode="cover"
                    />
                  </Pressable>
                  // </View>
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
                  <Pressable
                    key={index}
                    style={styles.imageCard}
                    onPress={() => {
                      setIsModalOpen(true);
                      setModalImageDate(`file://${source}`);
                    }}>
                    <Image
                      key={index}
                      source={{uri: `file://${source}`}}
                      style={{
                        width: '100%',
                        height: windowWidth / 3,
                        borderRadius: 10,
                        marginBottom: 12,
                      }}
                      resizeMode="cover"
                      // onLoadEnd={onMediaLoadEnd}
                      // onLoad={onMediaLoad}
                    />
                  </Pressable>
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalOpen}
        onRequestClose={() => {
          setIsModalOpen(false);
        }}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalBackButton}
            onPress={() => {
              setIsModalOpen(false);
            }}>
            <IonIcon name="chevron-back" size={24} color="#262626" />
          </TouchableOpacity>
          {modalImageData && modalFilmRoll && (
            <>
              <Image
                source={{uri: modalImageData}}
                style={{
                  width: '100%',
                  height: 536,
                  borderRadius: 25,
                  marginTop: 36,
                }}
                resizeMode="cover"
              />
              <View style={styles.modalFilmRollBox}>
                <View style={styles.filmRollInfoBox}>
                  <View style={styles.filmTitleBox}>
                    <Text style={styles.filmTitleCaption}>Shot with</Text>
                    <Text style={styles.filmTitleMain}>
                      {MockRollFilm[modalFilmRoll].display}
                    </Text>
                  </View>
                  <View style={styles.filmRollStatusBox}>
                    <Text style={styles.stateText}>Developed</Text>
                    <Text style={styles.expText}>11/36</Text>
                  </View>
                </View>
                <Image
                  style={styles.filmRollImg}
                  source={ROLL_FILM_SRC[MockRollFilm[modalFilmRoll].key]}
                  resizeMode="cover"
                />
              </View>
              <TouchableOpacity
                style={styles.developButton}
                onPress={() => {
                  setIsModalOpen(false);
                }}>
                <IonIcon name="arrow-forward" size={24} color="#262626" />
              </TouchableOpacity>
            </>
          )}
        </View>
      </Modal>
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
  informationBox: {
    position: 'absolute',
    width: 132,
    height: 60,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    top: 176,
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
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    lineHeight: 30,
    color: '#262626',
    textAlign: 'center',
  },
  followText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 10,
    lineHeight: 15,
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
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
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
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
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
    fontFamily: 'Montserrat-Bold',
    fontSize: 24,
    lineHeight: 40,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0,0.9)',
    position: 'relative',
  },
  modalBackButton: {
    position: 'absolute',
    width: 30,
    height: 30,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    top: 28,
    left: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalFilmRollBox: {
    width: 240,
    height: 136,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    paddingHorizontal: 28,
    paddingVertical: 16,
    marginTop: 36,
  },
  filmRollInfoBox: {
    width: '50%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  filmTitleBox: {
    width: 103,
    height: 30,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 15,
    backgroundColor: '#FFDA58',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    elevation: 5,
    paddingHorizontal: 12,
    marginRight: 16,
    marginBottom: 24,
  },
  filmTitleCaption: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 10,
    lineHeight: 10,
    color: '#000000',
  },
  filmTitleMain: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
    lineHeight: 12,
    color: '#000000',
  },
  filmRollStatusBox: {
    width: 110,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  stateText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    lineHeight: 12,
    color: '#000000',
  },
  expText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 30,
    lineHeight: 40,
    color: '#000000',
  },
  filmRollImg: {
    width: '50%',
    height: 160,
  },
  developButton: {
    position: 'absolute',
    width: 30,
    height: 30,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    bottom: 156,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserProfileScreen;
