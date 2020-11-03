import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';
import NavBar from './shared/NavBar';

const getFonts = () => Font.loadAsync({
  'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
  'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
  'Roboto-Italic': require('./assets/fonts/Roboto-Italic.ttf')
})

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false)
    if(fontsLoaded){
      return(
        <NavBar />
      );
    } else{
      return(
        <AppLoading startAsync={getFonts} onFinish={() => setFontsLoaded(true)} />
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
