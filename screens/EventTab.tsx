import React, { useState, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { Pressable, ScrollView, StyleSheet, TouchableOpacity, FlatList, ListRenderItem, Image, ImageSourcePropType, Dimensions, View, Text } from 'react-native';
import { RUDay, RUItem, event } from '../Interfaces/interfaces';

import EditScreenInfo from '../components/EditScreenInfo';
//import { Text } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { TextInput } from '../components/InputText';
import FontAwesome from '@expo/vector-icons/build/FontAwesome';
import { MonoText } from '../components/StyledText';
import DropDowns from '../components/Events/DropDowns';
import Events from '../mock/Events';
import CustomImage from '../components/CustomImage';

const URL_TO_FETCH = `https://sigaawebscrapper.herokuapp.com/news`;
const { width } = Dimensions.get("window");

export default function EventTab({ navigation }: RootTabScreenProps<'EventTab'>) {
  const [events, setEvents] = useState<event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    getEventsInfo()
  }, [])

  // pegar as noticias
  const getEventsInfo = async () => {
    const response = await fetch(URL_TO_FETCH);
    // tratando erro
    if (response.ok) {
      const message = `An error has occured: ${response.status}`;
      setEvents(Events);
      throw new Error(message);
    } 
    const JSON = await response.json();
    setEvents(JSON);
  }
 
  // browser
  const openLocalBrowser = async (link: string) => {
    let result = await WebBrowser.openBrowserAsync(link);
  };

  // construir Event
  const eventConstructor:ListRenderItem<event> = event => {
    return(
      <Pressable style={styles.ItemContainer} onPress={() => openLocalBrowser(event.item.link as string)}>
        <CustomImage 
          URL={ event.item.image }
          width={ width - 40 }
          height={ 300 }
        />
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
      <View style={{ width: '100%', alignItems: 'center', paddingBottom: 10 }}>
        <Pressable style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} onPress={() => openLocalBrowser('https://www.google.com.br')}>
          <FontAwesome
            name="plus-circle"
            size={15}
            color='#294AA3'
            style={{ marginRight: 10 }}
          />
          <MonoText style={{fontWeight: 'bold', color:'#294AA3' }}>Quer divulgar um evento?</MonoText>
        </Pressable>
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', alignContent: 'space-between', width: '100%', alignItems: 'center', padding: 16 }}>
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

      <DropDowns />

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
    paddingTop: 10
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
    width: '100%',
    height: 300,
    resizeMode: 'stretch'
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
    marginBottom: 10,
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
  },
});
