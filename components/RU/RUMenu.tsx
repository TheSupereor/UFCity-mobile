import { FontAwesome } from '@expo/vector-icons';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import Theme from '../../constants/Theme';
import { RUDay, RUItem } from '../../Interfaces/interfaces';
import { MonoText } from '../StyledText';

//import { Text } from '../Themed';
import RUData from '../../mock/RUData';

export default function RUMenu() {

  const [actualDate, setActualDate] = useState(new Date);
  
  const [ruJson, setRuJson] = useState<RUDay[]>([]);
  const [error, setError] = useState('');

  const [dateInfo, setDateInfo] = useState({
    year: actualDate.getFullYear().toString(),
    month: (actualDate.getMonth() + 1).toString(),
    day: actualDate.getDate().toString()
  });
  
  // ao ser criado já pegar os dados da data
  useEffect(() => {
    ChangeDateInfo();
    console.log('DEveria ter executado')
  }, [actualDate]);

  useEffect(() => {
    getRUInfo();
  }, [dateInfo])
  
  const ChangeDateInfo = () => {
    setRuJson([]);
    if(actualDate){
      // fazendo nova requisição
      let year = actualDate.getFullYear().toString();
      let month = (actualDate.getMonth() + 1).toString();
      let day = actualDate.getDate().toString();

      if(month.length == 1){
        setDateInfo({
          year: year,
          month: `0${month}`,
          day: day
        });
      }
      if(day.length == 1){
        setDateInfo({
          year: year,
          month: month,
          day: `0${day}`
        });
      }
  
      setDateInfo({
        year: year,
        month: month,
        day: day
      });
    }
  }

  const getRUInfo = async () => {
    const response = await fetch(`https://ufcity.herokuapp.com/ru_ufc/byDay?day=${dateInfo.year}-0${dateInfo.month}-${dateInfo.day}`);
    // tratando erro
    if (!response.ok) {
      const message = `Um erro ocorreu: ${response.status}`;
      //setError(message);
      setRuJson(RUData);
      //throw new Error(message);
    }
    const JSON = await response.json()
    setRuJson(JSON);
  }

  // setando para dia anterior
  const changeDayPrevious = () => {
    let newDate = actualDate;
    newDate.setDate(newDate.getDate() - 1);
    setActualDate(newDate);
    setTimeout(() => {
      ChangeDateInfo()
    }, 400)
  }

  // setando para dia seguinte
  const changeDayPost = () => {
    let newDate = actualDate;
    newDate.setDate(newDate.getDate() + 1);
    setActualDate(newDate);
    setTimeout(() => {
      ChangeDateInfo()
    }, 400)
  }

  const DateTimePicker = () => {
    DateTimePickerAndroid.open({
      value: actualDate,
      onChange,
      mode: 'date',
      is24Hour: true
    })
  }

  // set new date
  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setActualDate(currentDate);
  };

  return (
    <View style={styles.Container}>
      <View style={styles.changeDateContainer}>
        <Pressable style={{ marginLeft: -10 }} onPress={() => { changeDayPrevious() }} disabled={ruJson.length == 0}>
          <FontAwesome
            name="arrow-left"
            size={25}
            color={Theme.light.blue}
            style={styles.changeDayButton}
          />
        </Pressable>

        <Text style={ styles.dateToChange } onPress={() => DateTimePicker()}>{ WhichDay( actualDate.getDay() ) } {dateInfo.day}/{dateInfo.month}</Text>

        <Pressable style={{ marginRight: -10 }} onPress={() => { changeDayPost() }} disabled={ruJson.length == 0}>
          <FontAwesome
            name="arrow-right"
            size={25}
            color={Theme.light.blue}
            style={styles.changeDayButton}
          />
        </Pressable>
      </View>

      <View style={styles.MenuInfo}>
        {
          ruJson && ruJson.length > 0 ? ruJson.map((elem: RUDay, index: number) => 
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
          ) : !error ? (
            <>
              <ActivityIndicator size="large" color="#294AA3" />
              <MonoText>Carregando o cardápio</MonoText>
            </>
          ) : (<>
            <MonoText style={{ marginTop: 16, textAlign: 'center', fontSize: 30 }}>Erro ao procurar Cardápio</MonoText>
            <TouchableOpacity onPress={() => getRUInfo()}>
              <MonoText style={{ marginTop: 16, textAlign: 'center', color:'#294AA3', fontSize: 30 }}>Tentar novamente</MonoText>
            </TouchableOpacity>
          </>)
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    width: '100%', 
    marginBottom: 10
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
  MenuInfo:{
    alignItems: 'center'
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