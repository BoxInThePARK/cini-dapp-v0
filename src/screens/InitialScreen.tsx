import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Button } from 'react-native-paper';


const InitialScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Share Your View</Text>
        <Button style={styles.startButton} mode="contained" onPress={() => {}} >
            Let's Capture
        </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 108,
    paddingHorizontal: 24
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },
  startButton: {
    width: '80%',
  }
});

export default InitialScreen;
