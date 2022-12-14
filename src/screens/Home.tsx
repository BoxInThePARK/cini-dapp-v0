import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import IonIcon from 'react-native-vector-icons/Ionicons';

import {ROLL_FILM, ROLL_FILM_SRC} from '../utils/constants';
import {SAFE_AREA_PADDING} from '../utils/constants';
import type {Routes} from './Routes';

type Props = NativeStackScreenProps<Routes, 'Home'>;

const Home = ({navigation}: Props) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerWrapper}>
        <TouchableOpacity style={styles.settingsIcon} onPress={() => {}}>
          <IonIcon name="settings-sharp" size={13} color="#262626" />
        </TouchableOpacity>
        <View style={styles.searchBar}>
          <EntypoIcon name="magnifying-glass" size={16} color="#262626" />
          <TextInput
            placeholder="Search"
            placeholderTextColor="#00000050"
            keyboardType="default"
            // left={<TextInput.Icon name="magnify" color="#00000080" />}
            style={styles.searchInputTextBox}
          />
        </View>
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
        {Object.values(ROLL_FILM).map((item, index) => (
          <TouchableOpacity
            key={item.key}
            style={[
              styles.shopFilmItem,
              {backgroundColor: item.backgroundColor},
            ]}>
            <Text style={[styles.shopFilmRollTitle, {color: item.color}]}>
              {item.key}
            </Text>
            <Image
              style={styles.shopFilmRollImg}
              source={ROLL_FILM_SRC[item.key]}
              resizeMode="cover"
            />
            <Text style={[styles.shopFilmRollSubtitle, {color: item.color}]}>
              {item.shots} EXP
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.sectionHeaderWrapper}>
        <Text style={styles.sectionHeader}>Your Film</Text>
        <Text style={styles.seeAll}>See All</Text>
      </View>
      <View style={styles.yourFilmWrapper}>
        {Object.values(ROLL_FILM).map((item, index) => (
          <TouchableOpacity key={item.key} style={styles.yourFilmItem}>
            <View style={styles.yourFilmHeader}>
              <Text style={styles.yourFilmTitle}>{item.display}</Text>
              <Text style={styles.yourFilmCount}>11/{item.shots}</Text>
            </View>
            <Image
              style={styles.yourFilmImg}
              source={ROLL_FILM_SRC[item.key]}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const shopFilmItemStyle = (backgroundColor: string) => ({
  position: 'relative',
  width: 233,
  height: 260,
  backgroundColor: backgroundColor,
  borderRadius: 25,
  marginRight: 30,
  paddingTop: 18,
  borderColor: '#000',
  borderWidth: 1,
});

const shopFilmRollTitle = (color: string) => ({
  position: 'absolute',
  top: 20,
  left: 20,
  fontFamily: 'Montserrat-ExtraBold',
  fontSize: 40,
  lineHeight: 49,
  color: color || '#fff',
  textTransform: 'capitalize',
});
// shopFilmRollImg: {zIndex: 5},
const shopFilmRollSubtitle = (color: string) => ({
  position: 'absolute',
  bottom: 20,
  right: 20,
  fontFamily: 'Montserrat-Regular',
  fontSize: 20,
  lineHeight: 24,
  color: color || '#fff',
  textTransform: 'uppercase',
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
  },

  headerWrapper: {
    paddingVertical: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  searchBar: {
    width: 232,
    height: 40,
    paddingHorizontal: SAFE_AREA_PADDING.paddingLeft,
    borderRadius: 20,
    backgroundColor: '#EEEEEE',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexGrow: 1,
  },
  searchInputTextBox: {
    width: '100%',
    height: '100%',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
    color: '#262626',
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
    fontFamily: 'Montserrat-Bold',
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
  shopFilmRollImg: {
    width: '100%',
    height: 230,
  },
  yourFilmWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  yourFilmItem: {
    height: 105,
    width: '45%',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#0000002',
    borderRadius: 5,
    margin: 5,
  },
  yourFilmHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  yourFilmTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    lineHeight: 17,
    color: '#000',
  },
  yourFilmCount: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 8,
    lineHeight: 10,
    color: '#000',
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  yourFilmImg: {
    width: '100%',
    height: 150,
    transform: [{rotate: '-90deg'}, {translateX: 24}],
  },
  shopFilmItem: {
    position: 'relative',
    width: 233,
    height: 260,
    borderRadius: 25,
    marginRight: 30,
    paddingTop: 18,
    borderColor: '#000',
    borderWidth: 1,
  },
  shopFilmRollTitle: {
    position: 'absolute',
    top: 20,
    left: 20,
    fontFamily: 'Montserrat-ExtraBold',
    fontSize: 40,
    lineHeight: 49,
    textTransform: 'capitalize',
  },
  shopFilmRollSubtitle: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    fontFamily: 'Montserrat-Regular',
    fontSize: 20,
    lineHeight: 24,
    textTransform: 'uppercase',
  },
});

export default Home;
