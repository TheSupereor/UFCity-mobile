import React from 'react';
import { Image, ImageSourcePropType, StyleProp, StyleSheet, TouchableOpacity, View } from 'react-native';

import { MonoText } from '../StyledText';
//import { View } from '../Themed';

interface HeaderProps {
  navigation: any,
  image: string,
  title: string,
  path: string,
}

export const HeaderItem: React.FC<HeaderProps> = ({navigation, image, title, path}) => {
  
  return (
    <>
    <View style={styles.Header}>
      <TouchableOpacity onPress={() => navigation.navigate(path)} style={styles.HeaderPart}>
        <Image
          style={styles.Icon}
          source={image as ImageSourcePropType}
          />
        <MonoText style={{ paddingLeft: 10, fontSize: 28, fontWeight: 'bold'}}>{title}</MonoText>
        <View style={{
        width: 50,
        marginLeft: 'auto'
        }}>
        <MonoText style={styles.goTo}>Ir para</MonoText>
        </View>
      </TouchableOpacity>
    </View>
    <View style={styles.separator}></View>
    </>
  );
}

const styles = StyleSheet.create({
  Header: {
    display: 'flex',
    alignContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center'
  },
  HeaderPart: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  Icon: {
    width: 30,
    height: 30,
    paddingRight: 10
  },
  goTo: {
    fontWeight: 'bold',
    color: '#3d3dff',
    textAlign: 'center',
  },
  separator: {
    height: 1,
    width: '90%',
    backgroundColor: '#474646',
    marginTop: 10
  },
});