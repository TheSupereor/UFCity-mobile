import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, ListRenderItem, Pressable, StyleSheet, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { highLightNews, highLightNewsResponse, highLightNewsResponseLatestNews, news } from '../../Interfaces/interfaces';

import LatestNews from '../../mock/LatestNews';

import Colors from '../../constants/Colors';
import { MonoText } from '../StyledText';
//import { View } from '../Themed';
import { HeaderItem } from './HeaderItem';
import CustomImage from '../CustomImage';

// const URL_TO_FETCH = `${process.env.BASE_URL}/ru_ufc/byDay?day=2022-05-13`;
const { width } = Dimensions.get("window");

export default function MiniNews({navigation} : any) {
  const [newsJson, setNewsJson] = useState<highLightNewsResponseLatestNews[]>();
  const [error, setError] = useState('');
        
  const getNewsInfo = async () => {
    const response = await fetch(`https://ufcity.herokuapp.com/news/highlightsNews`);
    // tratando erro
    if (!response.ok) {
      const message = `Um erro aconteceu: ${response.status}`;
      //setError(message);
      setNewsJson(LatestNews);
      throw new Error(message);
    } 
    const APIResponse = await response.json() as highLightNewsResponse;

    const news = APIResponse.latestNews.slice(0, 3);
    setNewsJson(news);
  }
  
  useEffect( () => {
    getNewsInfo();
  }, [])

  // abrir um browser
  const openLocalBrowser = async (link: string) => {
    let result = await WebBrowser.openBrowserAsync(link);
    console.log(result)
  };

  // construir noticia
  const newsConstructor:ListRenderItem<highLightNewsResponseLatestNews> = news => {
    return(
      <Pressable style={styles.Content} onPress={() => openLocalBrowser(news.item.title.url as string)}>
        {/* <Image
          source={require(news.item.img)}
          style={{width: width, height: 300}}
        /> */}
        <CustomImage 
          URL={(news.item.img) || 'mobile/assets/images/newspaper.png'}
          width={ width }
          height={ 300 }
        />
        <View style={{
          display: 'flex',
          width: width
        }}>
          <MonoText style={styles.newsTitle}>{news.item.title.description}</MonoText>
          {/* <MonoText style={styles.newsDate}>{news.item.description}</MonoText>  */}
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
              keyExtractor={ (item, index) => index.toString() }
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
    height: 300,
    width: '90%',
    borderRadius: 8,
    paddingVertical: 12,
  },
  newsTitle: {
    marginVertical: 16,
    fontSize: 20,
    fontWeight: 'bold',
    width: '90%'
  },
  newsDate: {
    fontSize: 14,
    color: '#d4d4d4',
    textTransform: 'capitalize',
    width: '90%'
  },
  ListContainer: {
    flexGrow: 0
  },
  ListItem: {
    
  }
});