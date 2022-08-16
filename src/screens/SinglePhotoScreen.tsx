import React, {useCallback, useContext, useEffect, useState} from 'react';
import type {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import type {Routes} from './Routes';
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

type Props = NativeStackScreenProps<Routes, 'SinglePhoto'>;

const SinglePhotoScreen = ({navigation}: Props) => {
  return (
    <View>
      <Text>SinglePhoto Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SinglePhotoScreen;
