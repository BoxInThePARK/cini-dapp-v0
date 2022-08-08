import React, {useState} from 'react';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {Routes} from './Routes';
import {View, ImageBackground, Text, StyleSheet} from 'react-native';
import {Button, Divider} from 'react-native-paper';
import RNFS from 'react-native-fs';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';
// import coverImg from '../assets/img/coverImg.png';

type Props = NativeStackScreenProps<Routes, 'InitialPage'>;

const InitialScreen = ({navigation}: Props) => {
  const [nextStep, setNextStep] = useState(false);

  const walletLogin = () => {
    navigation.navigate('MockHome');
  };

  const googleLogin = () => {
    navigation.navigate('MockHome');
  };

  const appleLogin = () => {
    navigation.navigate('MockHome');
  };

  const facebookLogin = () => {
    navigation.navigate('MockHome');
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
            <Text style={styles.logo}>Cini</Text>
          ) : (
            <>
              <Text style={styles.title}>Share Your View</Text>
              <Text style={styles.title}>Expend How You Earn</Text>
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
                <Text style={styles.buttonText}>Goolge Login</Text>
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
                  marginBottom: 24,
                }}
                contentStyle={styles.startButton}
                mode="contained"
                uppercase
                onPress={facebookLogin}>
                <Text style={styles.buttonText}>Facebook Login</Text>
              </Button>
              <Button
                style={{
                  width: '80%',
                  height: 52,
                  //   backgroundColor: '#ffffff',
                  borderColor: '#ffffff',
                  marginBottom: 24,
                }}
                mode="outlined"
                uppercase
                onPress={walletLogin}>
                <Text style={styles.connectWalletText}>Wallet Login</Text>
              </Button>
            </>
          ) : (
            <Button
              style={{width: '80%', height: 52, backgroundColor: '#279AF1'}}
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
        <Text style={styles.informationText}>Team: BoxInThePARK, Cini-prototype-v0.0.1</Text>
        <Text style={styles.informationText}>Background image comes from Unsplash: https://unsplash.com/photos/o7wNBwl8sFk </Text>
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
    // justifyContent: 'flex-start',
    // alignItems: 'center',
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
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  logo: {
    fontSize: 52,
    fontWeight: 'bold',
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
    fontSize: 24,
    lineHeight: 40,
    fontWeight: 'bold',
    color: '#262626',
  },
  connectWalletText: {
    width: '100%',
    fontSize: 24,
    lineHeight: 40,
    fontWeight: 'bold',
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
    paddingHorizontal: StaticSafeAreaInsets.safeAreaInsetsLeft+16,
  },
  informationText: {
    fontSize: 8,
    color: '#ffffff'
  }
});

export default InitialScreen;
