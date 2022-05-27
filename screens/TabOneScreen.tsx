import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { RUDay, RUItem } from '../Interfaces/interfaces';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

const URL_TO_FETCH = `https://sigaawebscrapper.herokuapp.com/ru_ufc/byDay?day=2022-05-13`;

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [ruJson, setRuJson] = useState([]);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [dateInfo, setDateInfo] = useState({
    year: '00',
    month: '00',
    day: '00'
  });

  useEffect(() => {
    if(dateInfo.year !== '00', dateInfo.month !== '00', dateInfo.day !== '00') getRUInfo()
  }, [dateInfo]);

  useEffect(() => {
    ChangeDateInfo()
  }, [date]);

  const ChangeDateInfo = () => {
    // fazendo nova requisição
    let year = date.getFullYear().toString();
    let month = date.getMonth().toString();
    let day = date.getDate().toString();

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

  // set new date
  const onChange = (event: any, selectedDate: any) => {
    console.log(event)
    console.log(selectedDate)
    const currentDate = selectedDate;
    setDate(currentDate);
    setShow(false);
  };

  const getRUInfo = async () => {
    const response = await fetch(`https://sigaawebscrapper.herokuapp.com/ru_ufc/byDay?day=${dateInfo.year}-${dateInfo.month}-${dateInfo.day}`);
    // tratando erro
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    } 
    setRuJson(await response.json());
  }

  return (
    <ScrollView >
      <View style={styles.container}>
        <Text onPress={() => setShow(!show)}>{'< '}{dateInfo.day}/{dateInfo.month}/{dateInfo.year}{' >'}</Text>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value= {date}
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
          ruJson.map((elem: RUDay, index) => 
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
    paddingBottom: 10
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
    marginBottom: 2,
    backgroundColor: '#BBBBBB',
    borderRadius: 8
  }
});
