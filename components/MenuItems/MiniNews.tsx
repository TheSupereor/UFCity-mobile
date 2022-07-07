import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Image, ImageSourcePropType, ListRenderItem, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { highLightNews, news } from '../../Interfaces/interfaces';

import Colors from '../../constants/Colors';
import { MonoText } from '../StyledText';
import { View } from '../Themed';
import { HeaderItem } from './HeaderItem';

// const URL_TO_FETCH = `${process.env.BASE_URL}/ru_ufc/byDay?day=2022-05-13`;
const { width } = Dimensions.get("window");

export default function MiniNews({navigation} : any) {
  const [newsJson, setNewsJson] = useState<highLightNews[]>();
  const [error, setError] = useState('');
        
  const getNewsInfo = async () => {
    const response = await fetch(`https://ufcity.herokuapp.com/news`);
    // tratando erro
    if (!response.ok) {
      const message = `Um erro aconteceu: ${response.status}`;
      setError(message);
      throw new Error(message);
    } 
    setNewsJson(await response.json());
    console.log(await response.json());
  }
  
  useEffect( () => {
    getNewsInfo();
  }, [])

  // const news = [
  //   {
  //     text: 'Texto Notificatio',
  //     link: 'http://www.google.com',
  //     date: '01/02/02',
  //     image: require('mobile/assets/images/newspaper.png')
  //   },
  //   {
  //     text: 'Texto Notificatio',
  //     link: 'http://www.youtube.com',
  //     date: '01/02/02',
  //     image: require('mobile/assets/images/newspaper.png')
  //   },
  //   {
  //     text: 'Texto Notificatio',
  //     link: 'http://www.twitter.com',
  //     date: '01/02/02',
  //     image: require('mobile/assets/images/newspaper.png')
  //   },
  // ];

  // abrir um browser
  const openLocalBrowser = async (link: string) => {
    let result = await WebBrowser.openBrowserAsync(link);
    console.log(result)
  };

  // construir noticia
  const newsConstructor:ListRenderItem<highLightNews> = highLightNew => {
    return(
      <Pressable style={styles.Content} onPress={() => openLocalBrowser(highLightNew.item.link as string)}>
        <Image
          style={styles.NewsImage}
          source={highLightNew.item.image as ImageSourcePropType}
        />
        <View style={{
          display: 'flex',
          width: width
        }}>
          <MonoText style={styles.newsTitle}>{highLightNew.item.text}</MonoText>
          <MonoText style={styles.newsDate}>{highLightNew.item.date}</MonoText> 
        </View>
      </Pressable>
    )
  }
  
  return (
    <View style={styles.MiniContainer}>
      <HeaderItem navigation={navigation} image={require('mobile/assets/images/newspaper.png')} title='Notícias' path='NewsTab' />

      {
        newsJson ? (
          <View style={{ paddingTop: 12 }}>
            <FlatList 
              data={newsJson}
              keyExtractor={ (item:news) => item.link.toString() }
              renderItem={newsConstructor}
              style={styles.ListItem}
              horizontal
              contentContainerStyle={styles.ListContainer}
              snapToAlignment="start"
              decelerationRate={"fast"}
              snapToInterval={width}
            />
          </View>
        ) : !error ? (
          <>
            <ActivityIndicator style={{ marginTop: 16 }} size="large" color="#294AA3" />
            <MonoText>Carregando as notícias</MonoText>
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
    padding: 20,
    marginVertical: 10,
    flex: 1
  },

  Content: {
    alignItems: 'center',
    flex: 1,
  },
  NewsImage: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    paddingVertical: 12,
  },
  newsTitle: {
    marginVertical: 16,
    fontSize: 20,
    fontWeight: 'bold'
  },
  newsDate: {
    fontSize: 14,
    color: '#d4d4d4',
    textTransform: 'capitalize',
    paddingBottom: 16
  },
  ListContainer: {
    
  },
  ListItem: {
    
  }
});