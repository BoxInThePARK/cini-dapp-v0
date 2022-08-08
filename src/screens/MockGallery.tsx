import React, {useEffect} from 'react';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {Routes} from './Routes';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

type Props = NativeStackScreenProps<Routes, 'MockHome'>;

const MockGallery = ({navigation}: Props) => {
  useEffect(() => {
    console.log('open mock home');
  }, []);

  return (
    <View style={styles.container}>
      {/* <Button
        style={{width: '80%', height: 52, backgroundColor: '#279AF1'}}
        contentStyle={styles.startButton}
        mode="contained"
        uppercase
        onPress={goToCamera}>
        <Text style={styles.buttonText}>Camera Page</Text>
      </Button> */}
      <Text style={styles.buttonText}>Mock Gallery</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F1E8DF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButton: {
    width: '100%',
    height: 52,
    backgroundColor: '#262626',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 24,
    lineHeight: 40,
    fontWeight: 'bold',
    color: '#262626',
  },
});

export default MockGallery;
