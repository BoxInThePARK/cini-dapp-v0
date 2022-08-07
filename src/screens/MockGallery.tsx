import React from 'react';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {Routes} from './Routes';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

type Props = NativeStackScreenProps<Routes, 'MockHome'>;

const MockGallery = ({navigation}: Props) => {

    const goToCamera = () => {
        navigation.navigate('CameraPage');
    }

  return (
    <View style={styles.container}>
      <Button
        style={{width: '80%', height: 52, backgroundColor: '#279AF1'}}
        contentStyle={styles.startButton}
        mode="contained"
        uppercase
        onPress={goToCamera}>
        <Text style={styles.buttonText}>Camera Page</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
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
    color: '#ffffff',
  },
});

export default MockGallery;
