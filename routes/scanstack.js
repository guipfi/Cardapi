import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';

import Comanda from '../screens/comanda';

const {Navigator, Screen} = createStackNavigator();

const ScanNavigator = () => (
    <Navigator initialRouteName="Comanda" mode="modal" headerMode="screen" cardStyle={{backgroundColor: 'transparent', opacity: 1}} containerStyle={{backgroundColor: 'transparent', opactiy: 1}} transparentCard={true}>
    <Screen name="Comanda" component={Comanda} options={{headerShown: false, cardStyle:{backgroundColor: 'transparent'}}}/>
    </Navigator>
)

export const ScanStack = () => (<ScanNavigator/>)