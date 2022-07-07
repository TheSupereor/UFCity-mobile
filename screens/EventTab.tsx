import React, { useState, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { Pressable, ScrollView, StyleSheet, TouchableOpacity, FlatList, ListRenderItem, Image, ImageSourcePropType } from 'react-native';
import { RUDay, RUItem, event } from '../Interfaces/interfaces';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { TextInput } from '../components/InputText';
import FontAwesome from '@expo/vector-icons/build/FontAwesome';

const URL_TO_FETCH = `https://sigaawebscrapper.herokuapp.com/news`;

export default function EventTab({ navigation }: RootTabScreenProps<'EventTab'>) {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    getEventsInfo()
  }, [])

  // pegar as noticias
  const getEventsInfo = async () => {
    const response = await fetch(URL_TO_FETCH);
    // tratando erro
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    } 
    setEvents(await response.json());
  }
 
  // browser
  const openLocalBrowser = async (link: string) => {
    let result = await WebBrowser.openBrowserAsync(link);
  };

  // construir Event
  const eventConstructor:ListRenderItem<event> = event => {
    return(
      <Pressable style={styles.ItemContainer} onPress={() => openLocalBrowser(event.item.link as string)}>
        <Image style={styles.Image} source={event.item.image as ImageSourcePropType}/>
        <Text style={styles.subtitle}>{event.item.text}</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.text, {paddingRight: 4}]}>Data</Text>
          {/* <Text style={styles.text}>Preço</Text> */}
        </View>
      </Pressable>
    )
  }

  // pesquisa por filtro
  const searchEvents = async () => {
    const response = await fetch(`${URL_TO_FETCH}?title="${searchText}"`)
    // tratando erro
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    } 
    setFilteredEvents(await response.json());
  };

  return (
    <View style={styles.container}>
      <View style={{ display: 'flex', flexDirection: 'row', alignContent: 'space-between', width: '100%', alignItems: 'center' }}>
        <TextInput 
          onChangeText={(newText: string) => setSearchText(newText)}
          placeholder='Tente "Vagas de Professor"'
          style={{
            width: '90%',
            backgroundColor: '#FCFCFC',
            borderRadius: 5,
            borderWidth: 1,
            paddingHorizontal: 8,
            paddingVertical: 6,
            marginRight: 8,
          }}
        />
        <Pressable
          onPress={() => searchEvents()}
        >
          <FontAwesome
            name="search"
            size={25}
            color='#294AA3'
            style={{ marginRight: 15 }}
          />
        </Pressable>
      </View>

      <FlatList 
        data={events}
        keyExtractor={ (item:event, index: number) => index.toString() }
        renderItem={eventConstructor}
        style={styles.List}
        contentContainerStyle={styles.ListContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 10
  },
  subtitle: {
    fontSize: 18,
  },
  Image:{
    width: 80,
    height: 80,
  },
  text: {
    fontSize: 12,
  },
  DayMenuContainer: {
    flex: 1,
    width: '90%',
    padding: 8,
    margin: 4,
    marginTop: 10,
    backgroundColor: '#D9D9D9',
    borderRadius: 10
  },
  ItemContainer: {
    flex: 1,
    padding: 6,
    marginTop: 2,
    marginBottom: 2,
    backgroundColor: '#BBBBBB',
    borderRadius: 8
  },
  List: {
    flex: 1,
    width: "100%",
  },
  link: {
    fontSize: 12,
    color: '#4A93EA',
  },
  ListContainer:{
    flexGrow: 1,
    justifyContent: 'center',
    padding: 10,
    paddingHorizontal: 16
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '100%',
    backgroundColor: '#474646',
  },
});
