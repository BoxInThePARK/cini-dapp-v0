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

const FeedScreen = () => {
  return (
    <View style={styles.screenContainer}>
      <FeedHead />
      <Text style={styles.title}>New developed</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#262626',
    paddingHorizontal: SAFE_AREA_PADDING.paddingLeft + 9,
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
});

export default FeedScreen;
