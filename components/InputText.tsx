import React from 'react';
import { StyleSheet, TextInput as Input, TextInputProps } from 'react-native';

import { Text, TextProps } from './Themed';

export function TextInput(props: TextInputProps) {
  return (
    <Input style={styles.inputText} {...props}/>
  )
}


const styles = StyleSheet.create({
  inputText: {
    backgroundColor: '#FCFCFC',
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginHorizontal: 8
  }
})