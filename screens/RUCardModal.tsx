import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, Platform, Pressable, StyleSheet } from 'react-native';

import { save } from '../Helpers/SecureStore';
import { TextInput } from '../components/InputText';
import { Text, View } from '../components/Themed';

export default function ModalScreen({navigation}:any) {
  const [cardNumber, setCardNumber] = useState('');
  const [regNumber, setRegNumber] = useState('');

  const SaveCardInformation = () => {
    save('cardNumber', cardNumber);
    save('regNumber', regNumber);
    alert('Números do cartão salvo!');
  }

  return (
    <View style={styles.container}>
      <View style={styles.InputContainer}>
        <Text style={styles.title}>Número do Cartão</Text>
        <TextInput placeholder='123123112' keyboardType='numeric' onChangeText={(text) => setCardNumber(text)} />
      </View>

      <View style={styles.InputContainer}>
        <Text style={styles.title}>Matrícula</Text>
        <TextInput placeholder='123123' keyboardType='numeric' onChangeText={(text) => setRegNumber(text)} />
      </View>

      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <Pressable onPress={() => navigation.goBack()} style={{ backgroundColor:'#ffffff', justifyContent: 'center', marginRight: 30 }}>
          <Text style={{ color: '#294AA3' }}>Cancelar</Text>
        </Pressable>
        <Button title='Salvar' onPress={() => SaveCardInformation()} color='#294AA3'/>
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
  InputContainer: {
    marginBottom: 16,
    width: '70%'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16
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
