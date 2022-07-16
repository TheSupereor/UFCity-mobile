import React, { useState, useEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, TouchableOpacity, FlatList, ListRenderItem, ActivityIndicator, Share, View, Text } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { highLightNewsResponse, highLightNewsResponseLatestNews, news } from '../Interfaces/interfaces';

import EditScreenInfo from '../components/EditScreenInfo';
//import { Text } from '../components/Themed';
import { TextInput } from '../components/InputText';
import { RootTabScreenProps } from '../types';
import FontAwesome from '@expo/vector-icons/build/FontAwesome';
import { MonoText } from '../components/StyledText';
import WebBrowserOpener from '../Helpers/WebBrowserOpener';
import NewsData from '../mock/NewsData';

const URL_TO_FETCH = `https://ufcity.herokuapp.com/news`;

interface suggestion {
  suggestion: string,
  id: number
}

export default function NewsTab({ navigation }: RootTabScreenProps<'NewsTab'>) {
  const [defaults, setDefault] = useState<news[]>();
  const [news, setNews] = useState<news[]>([]);
  const [filteredNews, setFilteredNews] = useState<news[]>([]);
  const [searchText, setSearchText] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getNewsInfo()
  }, [])

  // pegar as noticias
  const getNewsInfo = async () => {
    setNews([]);
    const response = await fetch(`${URL_TO_FETCH}?pageNumber=0`);
    // tratando erro
    if (!response.ok) {
      const message = `Um erro aconteceu: ${response.status}`;
      setNews(NewsData);
      //setError(message);
      throw new Error(message);
    } 
    const APIResponse = await response.json() as news[];
    
    setNews( APIResponse );
    setFilteredNews( APIResponse );
    setError('');
  }

  // compartilhar link
  const ShareLink = async (link: string, title: string) => {
    try {
      const result = await Share.share({
        message: link,
        url: link,
        title: title
      });
      // if (result.action === Share.sharedAction) {
      //   if (result.activityType) {
      //     // Não foi compartilhado
      //   } else {
      //     // Compartilhado
      //   }
      // } else if (result.action === Share.dismissedAction) {
      //   // dismissed
      // }
    } catch (error) {
      console.log(error);
    }
  };

  // construir noticia
  const newsConstructor:ListRenderItem<news> = item => {
    return(
      <Pressable style={styles.ItemContainer} onPress={() => WebBrowserOpener(item.item.link as string)}>
        <Text style={styles.newsTitle}>{item.item.text}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.newsDate}>{item.item.date}</Text>
          <Pressable onPress={() => ShareLink(item.item.link, item.item.text)}>
            <FontAwesome
              name="share"
              size={15}
              color='#294AA3'
              style={{ marginRight: 15 }}
            />
          </Pressable>
        </View>
      </Pressable>
    )
  }

  const listSeparador = () => {
    return(
      <View style={styles.separator}></View>
    )
  }

  // Filtragem
  useEffect(() => {
    if(searchText === ''){
      setFilteredNews([]);
    } 
    // else {
    //   setFilteredNews(
    //     news!.filter( item => {
    //       if( item.text.toLowerCase().includes(searchText.toLowerCase()) ) return true
    //       else { return false };
    //     })
    //   );
    // };
  }, [searchText]);

  const searchNews = async () => {
    setError('');
    setFilteredNews([]);
    const response = await fetch(`${URL_TO_FETCH}?title=${searchText}`)
    // tratando erro
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      setError(message);
      throw new Error(message);
    } 
    setFilteredNews(await response.json());
  };

  const suggestionConstructor:ListRenderItem<suggestion> = suggestion => {
    return(
      <Pressable 
        style={[{ 
          paddingHorizontal: 16, 
          paddingVertical: 8,
          borderRadius: 8,
          borderWidth: 0.3,
          marginHorizontal: 4,
          marginVertical: 12,
        }]}
        onPress={() => { 
          setSearchText(suggestion.item.suggestion);
          searchNews();
         }}
      >
        <MonoText style={{

        }}>{suggestion.item.suggestion}</MonoText>
      </Pressable>
    )
  }

  return (
    <View style={styles.container}>
      <View style={{ display: 'flex', flexDirection: 'row', alignContent: 'space-between', width: '100%', alignItems: 'center' }}>
        <TextInput 
          onChangeText={(newText: string) => setSearchText(newText)}
          placeholder='Tente "Vagas de Professor"'
          value={searchText}
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
          onPress={() => searchNews()}
        >
          <FontAwesome
            name="search"
            size={25}
            color='#294AA3'
            style={{ marginRight: 15 }}
          />
        </Pressable>
      </View>

      {/* Sugestões */}
      <FlatList 
        data={suggestions}
        keyExtractor={ (item, index) => index.toString() }
        renderItem={suggestionConstructor}
        horizontal
        style={{
          flexGrow: 0
        }}
        contentContainerStyle={{
          height: 60,
        }}
        showsHorizontalScrollIndicator={false}
      />
      
      {/* Notícas */}
      {
        filteredNews && filteredNews.length > 0 ? (
          <FlatList 
            data={filteredNews}
            keyExtractor={ (item, index) => index.toString() }
            renderItem={newsConstructor}
            style={styles.List}
            ItemSeparatorComponent={listSeparador}
            contentContainerStyle={styles.ListContainer}
          />
        ) : !error ? (
          <>
            <ActivityIndicator style={{ marginTop: 16 }} size="large" color="#294AA3" />
            <MonoText style={{ marginTop: 16, textAlign: 'center' }}>Carregando as notícias</MonoText>
          </>
        ) : (<>
          <MonoText style={{ marginTop: 16, textAlign: 'center', fontSize: 30 }}>Erro ao procurar notícias</MonoText>
          <TouchableOpacity onPress={() => searchNews()}>
            <MonoText style={{ marginTop: 16, textAlign: 'center', color:'#294AA3', fontSize: 30 }}>Tentar novamente</MonoText>
          </TouchableOpacity>
        </>)
      }
      {/* <EditScreenInfo path="/screens/TabTwoScreen.tsx" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  newsTitle:{
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 10
  },
  newsDate:{
    fontSize: 8,
    width: '90%'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
  },
  text: {
    fontSize: 12,
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
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '100%',
    backgroundColor: '#474646',
  },
  ItemContainer: {
    borderRadius: 8
  }
});


// Sugestões para pesquisa
const suggestions = [
  {
    suggestion: 'Geral',
    id: 1
  },{
    suggestion: 'Bolsas',
    id: 2
  },{
    suggestion: 'Projetos',
    id: 3
  },{
    suggestion: 'Extensão',
    id: 4
  }
];