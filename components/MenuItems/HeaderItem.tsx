import React from 'react';
import { Image, ImageSourcePropType, StyleProp, StyleSheet, TouchableOpacity } from 'react-native';

import { MonoText } from '../StyledText';
import { View } from '../Themed';

interface HeaderProps {
  navigation: any,
  image: string,
  title: string,
  path: string,
}

export const HeaderItem: React.FC<HeaderProps> = ({navigation, image, title, path}) => {
  
  return (
    <View style={styles.Header}>
      <View style={styles.HeaderPart}>
        <Image
          style={styles.Icon}
          source={image as ImageSourcePropType}
          />
        <MonoText style={{
          paddingLeft: 10,
          fontSize: 28,
          fontWeight: 'bold'
        }}>{title}</MonoText>
      </View>
      <TouchableOpacity style={{
        width: 50,
        marginLeft: 'auto'
      }} onPress={() => navigation.navigate(path)}>
        <MonoText style={styles.goTo}>Ir para</MonoText>
      </TouchableOpacity>
    </View>
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
    alignItems: 'center'
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
});