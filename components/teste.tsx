import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';

import theme from '../constants/Theme';
import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';

import { Menu } from './MenuItems/Menu'
import { RootTabScreenProps } from '../types';

export default function MenuIcons({ navigation } : RootTabScreenProps<'Menu'>) {


  return (
    <ScrollView style={styles.Menu}>
      <Text style={styles.title}>Cidade UFC</Text>

      <View style={styles.AppMenu}>
        {
          Menu.map( item => {
            const TabName = item.path;
            return(
              <TouchableOpacity onPress={() => navigation.navigate(TabName as never)} style={ styles.Modules }>
                <Image 
                  style={ styles.ModuleIcons }
                  source={{
                    uri: item.icon,
                  }}
                />
                <Text style={ styles.moduleText }>{item.name}</Text>
              </TouchableOpacity>
            )
          })
        }
      </View>
    </ScrollView>
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet'
  );
}

const styles = StyleSheet.create({
  title: {
    //fontFamily: '',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    paddingTop: 10,
    marginBottom: 30
  },
  AppMenu: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 30
  },
  Menu: {
    backgroundColor: theme.light.white
  },
  Modules: {
    backgroundColor: theme.light.white,
    borderRadius: 10,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  ModuleIcons: {
    padding: 10,
    flex: 1,
    margin: 'auto'
  },
  moduleText: {
    fontWeight: 'bold',
    paddingVertical: 4
  }
});
