import { FontAwesome } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import { Pressable, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import Theme from '../../constants/Theme';
import ModalScreen from '../../screens/RUCardModal';
import { RootTabScreenProps } from '../../types';

//import { Text } from '../Themed';
import WebBrowserOpener from '../../Helpers/WebBrowserOpener';

export default function CardInfoHeader( {navigation}:RootTabScreenProps<'RuTab'>)  {
  const [RUCredits, setRUCredits] = useState(0);

  //WebBrowserOpener('https://si3.ufc.br/public//jsp/restaurante_universitario/consulta_comensal_ru.jsf')

  return (
    <View style={styles.Container}>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <Text style={ styles.CreditsInCardText}>Créditos no Cartão:</Text>
        <Text style={ styles.CreditsText }>{RUCredits}</Text>
        <Pressable hitSlop={10} onPress={() => navigation.navigate('InsertCredits')}>
          <FontAwesome
            name="plus-circle"
            size={25}
            color={Theme.light.blue}
            style={{ marginLeft: 8 }}
          />
        </Pressable>
      </View>

      <Pressable style={{ display: 'flex', flexDirection: 'row', marginBottom:30 }} onPress={() => navigation.navigate('Modal')}>
        <FontAwesome
          name="pencil"
          size={20}
          color={Theme.light.blue}
          style={{ paddingRight: 8 }}
        />
        <Text style={{ fontSize: 16 }}>Editar cartão</Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    width: '100%', 
    paddingHorizontal: 16,
  },
  CreditsInCardText: { 
    fontSize: 20, 
    paddingBottom: 8 
  },
  CreditsText: {
    fontWeight:'bold', 
    fontSize: 20, 
    paddingLeft: 14 
  },
});
