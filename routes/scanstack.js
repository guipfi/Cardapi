import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';

import ComandaControl from '../screens/comandaControl';

const {Navigator, Screen} = createStackNavigator();

const ScanNavigator = () => (
    <Navigator initialRouteName="Comanda" mode="modal" headerMode="screen" cardStyle={{backgroundColor: 'transparent', opacity: 1}} containerStyle={{backgroundColor: 'transparent', opactiy: 1}} transparentCard={true}>
    <Screen name="Comanda" component={ComandaControl} options={{headerShown: false, cardStyle:{backgroundColor: 'transparent'}}}/>
    </Navigator>
)

export const ScanStack = () => (<ScanNavigator/>)