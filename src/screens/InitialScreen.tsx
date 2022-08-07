import React, {useState} from 'react';
import {View, ImageBackground, Text, StyleSheet} from 'react-native';
import {Button, Divider} from 'react-native-paper';
// import coverImg from '../assets/img/coverImg.png';

const InitialScreen = () => {
  const [nextStep, setNextStep] = useState(false);

  const walletConnection = () => {};

  const googleLogin = () => {};

  const appleLogin = () => {};

  const facebookLogin = () => {};

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
              <View style={styles.walletConnectWrapper}>
                <Button
                  style={{width: '80%', height: 52, backgroundColor: '#279AF1'}}
                  contentStyle={styles.startButton}
                  mode="contained"
                  uppercase
                  onPress={() => {walletConnection}}>
                  <Text style={styles.buttonText}>Connect Wallet</Text>
                </Button>
              </View>

              <Divider bold style={styles.spacer} />

              <View style={styles.web2LoginWrapper}>
                <Button
                  style={{
                    width: '80%',
                    height: 52,
                    backgroundColor: '#279AF1',
                    marginBottom: 24,
                  }}
                  contentStyle={styles.startButton}
                  mode="contained"
                  uppercase
                  onPress={() => {googleLogin}}>
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
                  onPress={() => {appleLogin}}>
                  <Text style={styles.buttonText}>Apple Login</Text>
                </Button> */}
                <Button
                  style={{
                    width: '80%',
                    height: 52,
                    backgroundColor: '#279AF1',
                    marginBottom: 24,
                  }}
                  contentStyle={styles.startButton}
                  mode="contained"
                  uppercase
                  onPress={() => {facebookLogin}}>
                  <Text style={styles.buttonText}>Facebook Login</Text>
                </Button>
              </View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  baseContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
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
    color: '#ffffff',
  },
  spacer: {
    width: '60%',
    backgroundColor: '#DBD9DB',
    marginVertical: 16,
    borderRadius: 2,
  },
});

export default InitialScreen;
