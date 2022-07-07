import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet } from 'react-native';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { RUDay, RUItem } from '../Interfaces/interfaces';
import { FontAwesome } from '@expo/vector-icons';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import Theme from '../constants/Theme';
import { MonoText } from '../components/StyledText';

const URL_TO_FETCH = `${process.env.BASE_URL}/ru_ufc/byDay?day=2022-05-13`;

export default function RuTab({ navigation }: RootTabScreenProps<'RuTab'>) {
  const [RUCredits, setRUCredits] = useState(0);

  const [show, setShow] = useState(false);

  let actualDate = new Date();
  const day = actualDate.getDate().toString().length == 1 ? `0${actualDate.getDate().toString()}` : actualDate.getDate().toString();
  const month = actualDate.getMonth().toString().length == 1 ? `0${actualDate.getMonth().toString()}` : actualDate.getMonth().toString();

  const [ruJson, setRuJson] = useState<RUDay[]>([]);
  const [error, setError] = useState('');
  const [dateInfo, setDateInfo] = useState({
    year: '00',
    month: '00',
    day: '00'
  });
  
  // pegar os dados quando a página carregar
  useEffect(() => {
    ChangeDateInfo()
  }, [actualDate]);

  // quando a data mudar
  useEffect(() => {
    if(dateInfo.year !== '00', dateInfo.month !== '00', dateInfo.day !== '00') getRUInfo()
  }, [dateInfo]);

  const ChangeDateInfo = () => {
    // fazendo nova requisição
    let year = actualDate.getFullYear().toString();
    let month = actualDate.getMonth().toString();
    let day = actualDate.getDate().toString();

    if(month.length == 1){
      month = `0${month}`
    }
    if(day.length == 1){
      day = `0${day}`
    }
    setDateInfo({
      year: year,
      month: month,
      day: day
    });
  }

  // setando para dia anterior
  const changeDayPrevious = () => {
    const atualDay : any = actualDate.getDate();
    actualDate.setDate(atualDay - 1);
  }

  // setando para dia seguinte
  const changeDayPost = () => {
    const atualDay : any = actualDate.getDate();
    actualDate.setDate(atualDay + 1);
  }

  // set new date
  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    console.log(selectedDate);
    //setDate(currentDate);
    setShow(false);
  };

  const getRUInfo = async () => {
    const response = await fetch(`https://ufcity.herokuapp.com/ru_ufc/byDay?day=${dateInfo.year}-${dateInfo.month}-${dateInfo.day}`);
    // tratando erro
    if (!response.ok) {
      const message = `Um erro ocorreu: ${response.status}`;
      setError(message);
      throw new Error(message);
    } 
    setRuJson(await response.json());
  }

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

  return (
    <ScrollView >
      <View style={styles.container}>
        <View style={{ 
          width: '90%'
          }}>
          <Text style={{ fontSize: 20, paddingBottom: 8 }}>
            Créditos no Cartão: <Text style={{ fontWeight:'bold' }}>{ RUCredits }</Text>
          </Text>
          <View style={{ display: 'flex', flexDirection: 'row', marginBottom:30 }}>
            <FontAwesome
              name="pencil"
              size={20}
              color={Theme.light.blue}
              style={{ paddingRight: 8 }}
            />
            <Text style={{ fontSize: 16 }}>Editar cartão</Text>
          </View>
        </View>

        <View style={styles.changeDateContainer}>
          <Pressable onPress={() => {changeDayPrevious()}}>
            <FontAwesome
              name="arrow-left"
              size={25}
              color={Theme.light.blue}
              style={styles.changeDayButton}
            />
          </Pressable>
          <Text style={ styles.dateToChange } onPress={() => setShow(!show)}>{ WhichDay( actualDate.getDay() ) } {day}/{month}</Text>
          <Pressable onPress={() => {changeDayPost()}}>
            <FontAwesome
              name="arrow-right"
              size={25}
              color={Theme.light.blue}
              style={styles.changeDayButton}
            />
          </Pressable>
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value= { actualDate }
            mode= {'date'}
            dateFormat= 'day month year'
            onChange={onChange}
            style= {{
              paddingBottom: 20,
              marginBottom: 20,
            }}
          />
        )}

        {
          ruJson && !error ? ruJson.map((elem: RUDay, index) => 
            <View style={styles.DayMenuContainer} key={index}>
              <Text style={styles.title}>{elem.type}</Text>
              {
                elem.meat.map((elem: RUItem, index) => (
                  <View style={styles.ItemContainer} key={index}>
                    <Text style={styles.subtitle}>{elem.title}</Text>
                    <Text style={styles.text}>{elem.options}</Text>
                  </View>
                ))
              }
            </View>
          ) : error ? (
            <Text>{error}</Text>
          ) : (
            <>
              <ActivityIndicator size="large" color="#294AA3" />
              <MonoText>Carregando o cardápio</MonoText>
            </>
          )
        }
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        {/* <EditScreenInfo path="/screens/TabOneScreen.tsx" /> */}
      </View>
    </ScrollView>
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
    paddingBottom: 10,
    textTransform: 'capitalize'
  },
  subtitle: {
    fontSize: 18,
  },
  text: {
    fontSize: 12,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  DayMenuContainer: {
    flex: 1,
    width: '90%',
    padding: 16,
    margin: 4,
    marginTop: 10,
    borderRadius: 5,
    borderColor: '#5f5f5f',
    borderWidth: 0.3
  },
  ItemContainer: {
    flex: 1,
    padding: 6,
    marginTop: 2,
    marginBottom: 2,
    borderRadius: 8
  },
  changeDateContainer: {
    flexDirection: 'row', 
    flex: 1, 
    width: '99%', 
    alignContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center'
  },
  changeDayButton: {
    paddingHorizontal: 10,
    paddingVertical: 8
  },
  dateToChange: {
    flex: 1, 
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20
  }
});
