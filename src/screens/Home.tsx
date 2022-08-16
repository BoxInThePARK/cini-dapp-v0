import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';

import type {Routes} from './Routes';

type Props = NativeStackScreenProps<Routes, 'Home'>;

const Home = ({navigation}: Props) => {
  useEffect(() => {
    console.log('open mock home');
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerWrapper}>
        <TouchableOpacity style={styles.settingsIcon} onPress={() => {}}>
          <IonIcon name="settings-sharp" size={13} color="#262626" />
        </TouchableOpacity>
        <TextInput
          label="Search"
          mode="outlined"
          // onChangeText={text => {
          //   setMemoText(text);
          // }}
          left={<TextInput.Icon name="magnify" color="#00000080" />}
          style={styles.textInput}
          value={'teste'}
        />
      </View>
      <View style={styles.userWrapper}>
        <View>
          <Image
            source={require('../assets/img/pfp.png')}
            style={styles.pfpImg}
            resizeMode="cover"
          />
        </View>
        <View>
          <Text style={styles.sectionHeader}>Welcome!</Text>
          <View style={styles.nameTag}>
            <Text style={styles.sectionSubheader}>@nearop</Text>
          </View>
        </View>
      </View>
      <View style={styles.sectionHeaderWrapper}>
        <Text style={styles.sectionHeader}>Film Shop</Text>
        <Text style={styles.seeAll}>See All</Text>
      </View>
      <ScrollView horizontal style={styles.filmShopWrapper}>
        <Image
          source={require('../assets/img/pfp.png')}
          style={styles.pfpImg}
          resizeMode="cover"
        />
        <Image
          source={require('../assets/img/pfp.png')}
          style={styles.pfpImg}
          resizeMode="cover"
        />
        <Image
          source={require('../assets/img/pfp.png')}
          style={styles.pfpImg}
          resizeMode="cover"
        />
        <Image
          source={require('../assets/img/pfp.png')}
          style={styles.pfpImg}
          resizeMode="cover"
        />
        <Image
          source={require('../assets/img/pfp.png')}
          style={styles.pfpImg}
          resizeMode="cover"
        />
        <Image
          source={require('../assets/img/pfp.png')}
          style={styles.pfpImg}
          resizeMode="cover"
        />
      </ScrollView>
      <View style={styles.sectionHeaderWrapper}>
        <Text style={styles.sectionHeader}>Your Film</Text>
        <Text style={styles.seeAll}>See All</Text>
      </View>

      {/* <Button
        style={{width: '80%', height: 52, backgroundColor: '#279AF1'}}
        contentStyle={styles.startButton}
        mode="contained"
        uppercase
        onPress={goToCamera}>
        <Text style={styles.buttonText}>Camera Page</Text>
      </Button> */}
      {/* <Text style={styles.buttonText}>Home Page</Text> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
  },
  headerWrapper: {
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsIcon: {
    width: 30,
    height: 30,
    backgroundColor: '#ffffff',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 6,
    shadowOpacity: 0.25,
    elevation: 10,
  },
  textInput: {
    height: 35,
    background: 'rgba(237, 237, 237, 0.5)',
    borderRadius: 50,
    flexGrow: 1,
  },
  userWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  pfpImg: {
    width: 80,
    height: 80,
    borderRadius: 50,
    border: '1px solid #F1E8DF',
    marginRight: 20,
  },
  nameTag: {
    height: 25,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 6,
    shadowOpacity: 0.25,
    elevation: 10,
    color: '#262626',
    marginTop: 8,
  },
  sectionHeader: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 15,
    lineHeight: 18,
    color: '#262626',
  },
  sectionSubheader: {
    fontFam9ily: 'Montserrat-Bold',
    fontSize: 12,
    lineHeight: 15,
    color: '#262626',
  },
  seeAll: {
    fontFamily: 'Montserrat-Regular',
    color: '#000000',
    fontSize: 12,
  },
  sectionHeaderWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 24,
    lineHeight: 40,
    fontFamily: 'Montserrat-Bold',
    color: '#262626',
  },
  filmShopWrapper: {
    marginBottom: 30,
  },
});

export default Home;
