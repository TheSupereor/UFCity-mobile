import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, ListRenderItem, Pressable, StyleSheet, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { event } from '../../Interfaces/interfaces';

import Events from '../../mock/Events';

import Colors from '../../constants/Colors';
import { MonoText } from '../StyledText';
//import { View } from '../Themed';
import { HeaderItem } from './HeaderItem';
import CustomImage from '../CustomImage';

// const URL_TO_FETCH = `${process.env.BASE_URL}/ru_ufc/byDay?day=2022-05-13`;
const { width } = Dimensions.get("window");

export default function MiniEvents({navigation} : any) {
  const [eventsJson, setEventsJson] = useState<event[]>();
  const [error, setError] = useState('');
        
  const getEventsInfo = async () => {
    const response = await fetch(`https://ufcity.herokuapp.com/news/highlightsNews`);
    setEventsJson(Events);
    // tratando erro
    if (!response.ok) {
      const message = `Um erro aconteceu: ${response.status}`;
      //setError(message);
      throw new Error(message);
    } 
    //setEventsJson(await response.json());
  }
  
  useEffect( () => {
    getEventsInfo();
  }, [])

  // abrir um browser
  const openLocalBrowser = async (link: string) => {
    let result = await WebBrowser.openBrowserAsync(link);
    console.log(result)
  };

  // construir noticia
  const eventConstructor:ListRenderItem<event> = event => {
    return(
      <Pressable style={styles.Content} onPress={() => openLocalBrowser(event.item.link as string)}>
        {/* <Image
          style={styles.NewsImage}
          source={require('mobile/assets/images/Event.png') as ImageSourcePropType}
        /> */}
        <View style={styles.NewsImage}>
          <CustomImage 
            URL={(event.item.image) || 'mobile/assets/images/newspaper.png'}
            width={width}
            height={300}
          />
        </View>
        <MonoText style={styles.newsTitle}>{event.item.text}</MonoText>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          width: width,
        }}>
          <MonoText style={[styles.newsDate, { marginRight: 18}]}>{event.item.date}</MonoText> 
          <MonoText style={styles.newsDate}>{event.item.price}</MonoText> 
        </View>
      </Pressable>
    )
  }
  
  return (
    <View style={styles.MiniContainer}>
      <HeaderItem navigation={navigation} image={require('mobile/assets/images/Event.png')} title='Eventos' path='EventTab' />

      {
        eventsJson ? (
          <View style={{ paddingTop: 12 }}>
            <FlatList 
              data={eventsJson}
              keyExtractor={ (item: event) => item.link.toString() }
              renderItem={eventConstructor}
              style={styles.ListItem}
              horizontal
              contentContainerStyle={styles.ListContainer}
              snapToAlignment="start"
              decelerationRate={"fast"}
              snapToInterval={width}
            />
          </View>
        ): !error ? (
          <>
            <ActivityIndicator style={{ marginTop: 16 }} size="large" color="#294AA3" />
            <MonoText>Carregando os eventos</MonoText>
          </>
          ) : (
            <MonoText style={{ marginTop: 16 }}>{error}</MonoText>
          )
        }
    </View>
  );
}

const styles = StyleSheet.create({
  MiniContainer: {
    alignItems: 'center',
    width: '100%',
    padding: 20,
    marginVertical: 10,
    flex: 1
  },

  Content: {
    alignItems: 'center',
    flex: 1,
  },
  NewsImage: {
    width: '90%',
    backgroundColor: '#456445dd'
  },
  newsTitle: {
    marginVertical: 16,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    width: '100%',
  },
  newsDate: {
    fontSize: 14,
    color: '#d4d4d4',
    textTransform: 'capitalize',
    paddingBottom: 16
  },
  ListContainer: {
    flexGrow: 0,
  },
  ListItem: {
    maxWidth: '100%'
  }
});