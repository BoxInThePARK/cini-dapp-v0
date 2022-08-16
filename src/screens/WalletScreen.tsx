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

type Props = NativeStackScreenProps<Routes, 'Wallet'>;

const WalletScreen = ({navigation}: Props) => {
  return (
    <View>
      <Text>Wallet Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default WalletScreen;
