import React, {useState, useEffect, useCallback} from 'react';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {Routes} from './Routes';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Button} from 'react-native-paper';
import RNFS from 'react-native-fs';

type Props = NativeStackScreenProps<Routes, 'UserProfilePage'>;

const UserProfileScreen = ({navigation}: Props) => {
  const [hasMediaLoaded, setHasMediaLoaded] = useState(false);
  const [imageList, setImageList] = useState<String[]>(['']);

  const getImageList = useCallback(async () => {
    console.log('checkout 1');
    try {
      const result = await RNFS.readDir(
        `${RNFS.DocumentDirectoryPath}/cini_media`,
      );
      console.log('result len:', result.length);

      const imageList = result
        .filter(item => item.isFile)
        .map(item => item.path);

      setImageList(imageList);

      console.log('imageList len:', imageList.length);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getImageList();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.buttonText}>UserProfileScreen</Text>
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
    backgroundColor: '#fff',
    flexDirection: 'row',
    flexWrap: 'wrap',
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
