import { FontAwesome } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

import { Text, View } from '../Themed';
import { Categorias, Areas, Campus } from './EventsDropdowns';

export default function DropDowns() {
  return (
    <View style={styles.DropDownContainers}>
      <SelectDropdown
        data={Categorias}
        onSelect={(selectedItem: any, index: any) => {
          console.log(selectedItem, index);
        }}
        defaultButtonText={'Categorias'}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
        buttonStyle={ styles.firstButtonStyle }
        buttonTextStyle={ styles.buttonTextStyle }
        renderDropdownIcon={isOpened => {
          return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={10} />;
        }}
        dropdownIconPosition={'right'}
        dropdownStyle={ styles.dropdownStyle }
        rowStyle={{}}
        rowTextStyle={ styles.rowTextStyle }
      />

      <SelectDropdown
        data={Areas}
        onSelect={(selectedItem: any, index: any) => {
          console.log(selectedItem, index);
        }}
        defaultButtonText={'Areas'}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
        buttonStyle={ styles.buttonStyle }
        buttonTextStyle={ styles.buttonTextStyle }
        renderDropdownIcon={isOpened => {
          return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={10} />;
        }}
        dropdownIconPosition={'right'}
        dropdownStyle={ styles.dropdownStyle }
        rowStyle={{}}
        rowTextStyle={ styles.rowTextStyle }
      />

      <SelectDropdown
        data={Campus}
        onSelect={(selectedItem: any, index: any) => {
          console.log(selectedItem, index);
        }}
        defaultButtonText={'Campus'}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
        buttonStyle={ styles.buttonStyle }
        buttonTextStyle={ styles.buttonTextStyle }
        renderDropdownIcon={isOpened => {
          return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={10} />;
        }}
        dropdownIconPosition={'right'}
        dropdownStyle={ styles.dropdownStyle }
        rowStyle={{}}
        rowTextStyle={ styles.rowTextStyle }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  DropDownContainers: {
    flexDirection: 'row', 
    width: '100%', 
    paddingHorizontal: 10,
    marginBottom: 10
  },
  firstButtonStyle: {
    width: 105,
    borderRadius: 10,
    marginRight: 5,
    paddingVertical: 8,
  },
  buttonStyle: {
    width: 105,
    borderRadius: 10,
    marginHorizontal: 5,
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  buttonTextStyle: {
    fontSize: 10
  },
  rowStyle: {

  },
  rowTextStyle: {
    fontSize: 10
  },
  dropdownStyle: {
    marginTop: -25
  }
});
