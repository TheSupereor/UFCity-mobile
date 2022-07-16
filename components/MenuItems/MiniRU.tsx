import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { RUDay, RUItem } from '../../Interfaces/interfaces';
import RUData from '../../mock/RUData';

import Colors from '../../constants/Colors';
import { RootTabScreenProps } from '../../types';
import { MonoText } from '../StyledText';
//import { View } from '../Themed';
import { HeaderItem } from './HeaderItem';

// const URL_TO_FETCH = `${process.env.BASE_URL}/ru_ufc/byDay?day=2022-05-13`;

export default function MiniRU({navigation} : any) {
  let actualDate = new Date();
  let formatedDate = formatDate(actualDate);
  const [RUJson, setRUJson] = useState<RUDay[]>([]);
  const [error, setError] = useState('');

  const day = actualDate.getDate().toString().length == 1 ? `0${actualDate.getDate().toString()}` : actualDate.getDate().toString();
  const month = actualDate.getMonth().toString().length == 1 ? `0${(actualDate.getMonth() + 1).toString()}` : (actualDate.getMonth() + 1).toString();
  
  const WhichDay = (day: number) => {
    switch (day) {
      case 0:
        return 'Domingo'
      case 1:
        return 'Segunda-Feira'
      case 2:
        return 'Terça-Feira'
      case 3:
        return 'Quarta-Feira'
      case 4:
        return 'Quinta-Feira'
      case 5:
        return 'Sexta-Feira'
      case 6:
        return 'Sábado-Feira'
    }
  }
        
  const getRUInfo = async () => {
    const response = await fetch(`https://ufcity.herokuapp.com/ru_ufc/byDay?day=${ formatedDate }`);
    // tratando erro
    if (!response.ok) {
      const message = `Um erro aconteceu: ${response.status}`;
      setError(message);
      setRUJson(RUData);
      throw new Error(message);
    } 
    setRUJson(await response.json());
  }
  
  useEffect( () => {
    getRUInfo();
  }, [])
  
  return (
    <View style={styles.MiniContainer}>
      <HeaderItem navigation={navigation} image={require('mobile/assets/images/Restaurant.png')} title='Restaurante' path='RuTab' />

      {
        RUJson && RUJson.length > 0 ? (
          <View style={styles.Content}>
            <MonoText style={{
              marginVertical: 16,
              fontSize: 20,
              fontWeight: 'bold'
            }}>{ WhichDay(actualDate.getDay()) } {day}/{month}</MonoText>
            <View style={styles.MiniContent}>
              <MonoText style={styles.lunchType}>{RUJson[0].type}</MonoText>
              <MonoText style={{ paddingBottom: 8 }}>{RUJson[0].meat[0].options}</MonoText>
              <MonoText style={{ paddingBottom: 8 }}>{RUJson[0].meat[1].options}</MonoText>
            </View>
          </View>
        ) : !error ? (
          <>
            <ActivityIndicator style={{ marginTop: 16 }} size="large" color="#294AA3" />
            <MonoText>Carregando o cardápio</MonoText>
          </>
        ) : (
          <>
            <MonoText style={{ marginTop: 16 }}>{error}</MonoText>
          </>
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
    width: '100%',
  },
  MiniContent: {
    borderWidth: 0.2,
    borderColor: '#bbbbbb',
    alignContent: 'flex-start',
    overflow: 'scroll',
    padding: 16
  },
  lunchType: {
    fontWeight: 'bold',
    fontSize: 18,
    textTransform: 'capitalize',
    paddingBottom: 16
  }
});

const formatDate = (actualDate: Date) => {
  let year = actualDate.getFullYear().toString();
  let month = (actualDate.getMonth() + 1).toString();
  let day = actualDate.getDate().toString();
  
  if(month.length == 1){
    month = `0${month}`
  }
  if(day.length == 1){
    day = `0${day}`
  }
  
  return year+'-'+month+'-'+day;
}