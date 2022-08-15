import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useContext, useState} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import RNFS from 'react-native-fs';
import {Button, Divider} from 'react-native-paper';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';

import type {Routes} from './Routes';
// import coverImg from '../assets/img/coverImg.png';

type Props = NativeStackScreenProps<Routes, 'InitialPage'>;

const InitialScreen = ({navigation}: Props) => {
  const [nextStep, setNextStep] = useState(false);

  const walletLogin = () => {
    navigation.navigate('MainPages');
  };

  const googleLogin = () => {
    navigation.navigate('MainPages');
  };

  const appleLogin = () => {
    navigation.navigate('MainPages');
  };

  const facebookLogin = () => {
    navigation.navigate('MainPages');
  };

  const addLoginCredentials = () => {};

  return (
    <View style={styles.baseContainer}>
      <ImageBackground
        source={require('../assets/img/coverImg.png')}
        resizeMode="cover"
        style={nextStep ? styles.imageContainerLogin : styles.imageContainer}>
        <View
          style={nextStep ? styles.textPannelLogin : styles.textPannelInitial}>
          {nextStep ? (
            <Text style={styles.logo}>CINI</Text>
          ) : (
            <>
              <Text style={styles.title}>Share Your View</Text>
              <Text style={styles.title}>Expand How You Earn</Text>
            </>
          )}
        </View>
        <View style={nextStep ? styles.loginPannel : styles.controlPannel}>
          {nextStep ? (
            <>
              <Button
                style={{
                  width: '80%',
                  height: 52,
                  backgroundColor: '#ffffff',
                  marginBottom: 24,
                }}
                contentStyle={styles.startButton}
                mode="contained"
                uppercase
                onPress={googleLogin}>
                <Text style={styles.buttonText}>Google Login</Text>
              </Button>
              {/* <Button
                  style={{
                    width: '80%',
                    height: 52,
                    backgroundColor: '#279AF1',
                    marginBottom: 24,
                  }}
                  contentStyle={styles.startButton}
                  mode="contained"
                  uppercase
                  onPress={appleLogin}>
                  <Text style={styles.buttonText}>Apple Login</Text>
                </Button> */}
              <Button
                style={{
                  width: '80%',
                  height: 52,
                  backgroundColor: '#ffffff',
                  marginBottom: 16,
                }}
                contentStyle={styles.startButton}
                mode="contained"
                uppercase
                onPress={facebookLogin}>
                <Text style={styles.buttonText}>Facebook Login</Text>
              </Button>
              <Button
                style={{
                  width: '47%',
                }}
                contentStyle={{
                  width: '100%',
                  borderColor: '#ffffff',
                  borderBottomWidth: 1,
                }}
                mode="text"
                uppercase
                onPress={walletLogin}>
                <Text style={styles.connectWalletText}>Wallet Login</Text>
              </Button>
            </>
          ) : (
            <Button
              style={{
                width: '80%',
                height: 52,
                backgroundColor: '#279AF1',
                marginBottom: 40,
              }}
              contentStyle={styles.startButton}
              mode="contained"
              uppercase
              onPress={() => {
                setNextStep(true);
              }}>
              <Text style={styles.buttonText}>Let's Capture</Text>
            </Button>
          )}
        </View>
      </ImageBackground>
      <View style={styles.informationBox}>
        <Text style={styles.informationText}>
          Team: BoxInThePARK, Cini-prototype-v0.0.1
        </Text>
        <Text style={styles.informationText}>
          Background image comes from Unsplash:
          https://unsplash.com/photos/o7wNBwl8sFk{' '}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  baseContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    position: 'relative',
  },
  imageContainer: {
    flex: 2,
    justifyContent: 'flex-end',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  imageContainerLogin: {
    flex: 2,
    justifyContent: 'flex-start',
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  textPannelInitial: {
    width: '100%',
    height: '46%',
    justifyContent: 'flex-end',
  },
  textPannelLogin: {
    width: '100%',
    height: '20%',
    justifyContent: 'flex-start',
  },
  title: {
    fontFamily: 'Montserrat-Italic',
    fontSize: 32,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  logo: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 52,
    color: '#FFFFFF',
  },
  controlPannel: {
    width: '100%',
    height: '48%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  loginPannel: {
    width: '100%',
    height: '80%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 160,
  },
  walletConnectWrapper: {
    width: '100%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  web2LoginWrapper: {
    width: '100%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButton: {
    fontFamily: 'Montserrat-Bold',
    width: '100%',
    height: 52,
    // paddingVertical: 12,
    backgroundColor: '#ffffff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    width: '100%',
    fontFamily: 'Montserrat-Bold',
    fontSize: 22,
    lineHeight: 40,
    color: '#262626',
  },
  connectWalletText: {
    width: '100%',
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    lineHeight: 24,
    color: '#ffffff',
  },
  spacer: {
    width: '60%',
    backgroundColor: '#DBD9DB',
    marginVertical: 16,
    borderRadius: 2,
  },
  informationBox: {
    width: '100%',
    position: 'absolute',
    bottom: StaticSafeAreaInsets.safeAreaInsetsBottom,
    paddingHorizontal: StaticSafeAreaInsets.safeAreaInsetsLeft + 16,
  },
  informationText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 8,
    color: '#ffffff',
  },
});

export default InitialScreen;
