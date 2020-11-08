import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import NavBar from './shared/NavBar'
import {AppLoading} from 'expo';
import {LoginNavigator} from './routes/loginstack'
import {firebase} from './utils/firebase';

const getFonts = () => Font.loadAsync({
  'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
  'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
  'Roboto-Italic': require('./assets/fonts/Roboto-Italic.ttf')
})


export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [fontsLoaded, setFontsLoaded] = useState(false)

  function onAuthStateChanged(user){
    setUser(user);
    if(initializing) setInitializing(false);
  }

  useEffect(() =>{
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  },[]);

  if(initializing) return null;

    if(fontsLoaded){
      if(user){
        return(<LoginNavigator isLogged = {true} />)
      }
      else{
        return (<LoginNavigator isLogged = {false} />)
      }
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
