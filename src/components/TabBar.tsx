import React, {useState, useContext} from 'react';
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-paper';

interface TabBarProps {
  tabList: string[];
  lenList: number[];
  currentTabIndex: number;
  setPressedTab: (index: number) => void;
}

const TabBar = ({
  tabList,
  lenList,
  currentTabIndex,
  setPressedTab,
}: TabBarProps) => {
  return (
    <View style={styles.tabBarContainer}>
      {tabList.map((tab, index) => {
        return (
          //   <View style={styles.tabButton}>
          <Button
            style={styles.tabButton}
            contentStyle={styles.tabButton}
            labelStyle={
              currentTabIndex === index
                ? styles.selectedTabLabel
                : styles.tabLabel
            }
            mode="text"
            color="transparent"
            buttonColor="transparent"
            onPress={() => {
              setPressedTab(index);
            }}>
            {tab} {lenList[index]}
          </Button>
          //   </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    width: '100%',
    height: 52,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  tabButton: {
    height: 52,
    border: 'none',
    borderRadius: 0,
    '&:hover': {
      backgroundColor: 'transparent',
      borderRadius: 0,
    },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel: {
    height: 24,
    fontSize: 12,
    lineHeight: 20,
    fontWeight: 'bold',
    color: '#00000080',
    borderRadius: 0,
  },
  selectedTabLabel: {
    height: 24,
    fontSize: 12,
    lineHeight: 20,
    fontWeight: 'bold',
    color: '#00000080',
    borderBottomColor: '#262626',
    borderBottomWidth: 2,
    borderRadius: 0,
  },
});

export default TabBar;
