import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, Platform, Pressable, StyleSheet } from 'react-native';

import { getValueFor } from '../Helpers/SecureStore';
import { TextInput } from '../components/InputText';
import { Text, View } from '../components/Themed';

export default function InsertCreditsModal({navigation}:any) {
  const [cardNumber, setCardNumber] = useState('');
  const [regNumber, setRegNumber] = useState('');
  const [credits, setCredits] = useState(0);

  useEffect(() => {
    getCardInfo();
  }, [])

  const getCardInfo = async () => {
    setCardNumber( await getValueFor('cardNumber') );
    setRegNumber( await getValueFor('regNumber') );
  }
  

  return (
    <View style={styles.container}>
      <View style={styles.DataContainer}>
        <Text style={styles.text}>Matrícula: {regNumber}</Text>
        <Text style={styles.text}>Cartão: {cardNumber}</Text>
        <Text style={styles.text}>Créditos do cartão: {credits}</Text>
      </View>

      <View style={styles.InputContainer}>
        <Text style={styles.title}>Deseja inserir quantos créditos?</Text>
        <TextInput placeholder='Ex: 32' keyboardType='numeric' onChangeText={(text) => setRegNumber(text)} />
      </View>

      <View style={{ alignItems: 'center' }}>
        <Pressable onPress={() => navigation.goBack()} style={{ backgroundColor:'#294AA3', justifyContent: 'center', marginBottom: 20, borderRadius: 5 }}>
          <Text style={{ color: '#ffffff', padding: 8 }}>Gerar boleto</Text>
        </Pressable>

        <Pressable onPress={() => navigation.goBack()} style={{ backgroundColor:'#ffffff', justifyContent: 'center', marginBottom: 20 }}>
          <Text style={{ color: '#294AA3' }}>Cancelar</Text>
        </Pressable>
      </View>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  DataContainer: {
    marginBottom: 16,
    width: '70%',
    alignContent: 'flex-start'
  },
  InputContainer: {
    marginBottom: 16,
    width: '70%'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16
  },
  text: {
    fontSize: 16,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  goBackButton: {
    backgroundColor: '#ffffff',
    padding: 8
  },
  SaveButton: {

  }
});
