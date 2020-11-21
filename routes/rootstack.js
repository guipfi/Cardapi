import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {ScanStack} from './scanstack';
import NavBar from '../shared/NavBar';

const {Navigator, Screen} = createStackNavigator();

const RootNavigator = () => (
  <Navigator initialRouteName="Nav2" mode="card" headerMode="none">
     <Screen name="Nav2" component={NavBar}  />
     <Screen name="Comanda1" component={ScanStack} options={{animationEnabled: false, headerShown: false, cardStyle:{backgroundColor: 'rgba(0,0,0,0.5)'}}} />
  </Navigator>
)

export const RootStack = () => (<RootNavigator/>)