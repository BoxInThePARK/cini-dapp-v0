import React from 'react';
import {View, ImageBackground, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
// import coverImg from '../assets/img/coverImg.png';

const InitialScreen = () => {
  return (
    <View style={styles.baseContainer}>
      <ImageBackground
        source={require('../assets/img/coverImg.png')}
        resizeMode="cover"
        style={styles.imageContainer}>
        <View style={styles.textPannel}>
          <Text style={styles.title}>Share Your View</Text>
          <Text style={styles.title}>Expend How You Earn</Text>
        </View>
        <View style={styles.controlPannel}>
          <Button
            style={{width:'80%'}}
            contentStyle={styles.startButton}
            mode="contained"
            uppercase
            onPress={() => {}}>
            <Text style={styles.buttonText}>Let's Capture</Text>
          </Button>
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
    // width: '100%',
    // height: '100%',
    flex: 2,
    justifyContent: 'flex-end',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  textPannel: {
    width: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  controlPannel: {
    width: '100%',
    height: '48%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  startButton: {
    width: '100%',
    height: 80,
    paddingVertical: 12,
    backgroundColor: '#279AF1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    width: '100%',
    fontSize: 24,
    lineHeight: 36,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default InitialScreen;
