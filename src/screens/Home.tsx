import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';

import type {Routes} from './Routes';

type Props = NativeStackScreenProps<Routes, 'Home'>;

const Home = ({navigation}: Props) => {
  useEffect(() => {
    console.log('open mock home');
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.settingsIcon} onPress={() => {}}>
          <IonIcon name="settings-sharp" size={12} color="#262626" />
        </TouchableOpacity>

        <TextInput
          label="Search"
          mode="outlined"
          // onChangeText={text => {
          //   setMemoText(text);
          // }}
          left={<TextInput.Icon name="magnify" color="#00000080" />}
          style={styles.textInput}
          value={'teste'}
        />
      </View>
      <Text style={styles.sectionHeader}>Film Shop</Text>
      <Text style={styles.sectionHeader}>Your Film</Text>
      {/* <Button
        style={{width: '80%', height: 52, backgroundColor: '#279AF1'}}
        contentStyle={styles.startButton}
        mode="contained"
        uppercase
        onPress={goToCamera}>
        <Text style={styles.buttonText}>Camera Page</Text>
      </Button> */}
      {/* <Text style={styles.buttonText}>Home Page</Text> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F1E8DF',
  },
  header: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  sectionHeader: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 15,
    lineHeight: 18,
    color: '#262626',
  },

  settingsIcon: {
    width: 20,
    height: 20,
    backgroundColor: '#ffffff',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 24,
    lineHeight: 40,
    fontFamily: 'Montserrat-Bold',
    color: '#262626',
  },
});

export default Home;
