import * as React from 'react';
import { StatusBar } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

// não consigo tirar o erro
function FocusAwareStatusBar(props: StatusBar) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props}/> : null;
}