import React from 'react';
import { Pressable, ScrollView, StyleSheet, Image, FlatList, ListRenderItem, ImageSourcePropType } from 'react-native';
import { RootTabScreenProps } from '../types';

//statusbar
import { useIsFocused } from '@react-navigation/native';
import { StatusBar } from 'react-native';

import MiniRU from '../components/MenuItems/MiniRU';
import MiniNews from '../components/MenuItems/MiniNews';
import MiniEvents from '../components/MenuItems/MiniEvents';

export default function Menu({ navigation }: RootTabScreenProps<'Menu'>) {

  const isFocused = useIsFocused();

  return (
    <ScrollView style={styles.container}>

      {/* {
        isFocused ? (< StatusBar barStyle="light-content" />) : null
      } */}

      <MiniRU navigation={navigation} />
      <MiniNews navigation={navigation} />
      <MiniEvents navigation={navigation} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 10
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
  },
  ListContainer:{
    flexGrow: 1,
    justifyContent: 'center',
  },
  List: {
    flex: 1,
    width: "90%",
    padding: 3,
  },
  ItemContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    margin: 10,
    backgroundColor: '#f3f3f3',
    borderRadius: 12,
    alignSelf: 'center'
  },
  MenuIcon: {
    width: 80,
    height: 80,
  }
});
