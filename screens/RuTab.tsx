import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet } from 'react-native';
import CardInfoHeader from '../components/RU/CardInfoHeader';
import RUMenu from '../components/RU/RUMenu';
import { RootTabScreenProps } from '../types';


export default function RuTab({ navigation }: RootTabScreenProps<'RuTab'>) {
  

  return (
    <ScrollView >
      <CardInfoHeader navigation={navigation} />

      <RUMenu />
    </ScrollView>
  );
}

const styles = StyleSheet.create({

});
