import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { news } from '../Interfaces/interfaces';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

const URL_TO_FETCH = `https://sigaawebscrapper.herokuapp.com/news`;

export default function TabTwoScreen() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    getNewsInfo()
  }, [])

  // pegar as noticias
  const getNewsInfo = async () => {
    const response = await fetch(URL_TO_FETCH);
    // tratando erro
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    } 
    setNews(await response.json());
  }

  // abrir um browser
  const openLocalBrowser = async (link: string) => {
    let result = await WebBrowser.openBrowserAsync(link);
    console.log(result)
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Notícias UFC</Text>
        {
            news.map((elem: news, index) => 
              <TouchableOpacity style={styles.ItemContainer} key={index} onPress={() => openLocalBrowser(elem.link as string)}>
                <Text style={styles.subtitle}>{elem.text}</Text>
                <Text style={styles.text}>Clique para ver mais</Text>
              </TouchableOpacity>
            )
          }
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        {/* <EditScreenInfo path="/screens/TabTwoScreen.tsx" /> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  link: {
    fontSize: 12,
    color: '#4A93EA',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  ItemContainer: {
    flex: 1,
    width: '90%',
    padding: 6,
    marginVertical: 4,
    backgroundColor: '#BBBBBB',
    borderRadius: 8
  }
});
