
import React, { Component } from 'react';
import {
 Image
} from 'react-native';
 
export default function CustomImage (props :{URL: string, width: number, height: number}) {
 
 let Image_Http_URL ={ uri: props.URL};
 
 return (
  <Image 
    source={Image_Http_URL} 
    style = {{
      height: props.height, 
      width: props.width, 
      resizeMode : 'stretch',
      borderRadius: 10,
      marginBottom: 5
    }} 
  />
 );
}