import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../screens/home';
import Comanda from '../screens/comanda';

const {Navigator, Screen} = createStackNavigator();

const HomeNavigator = () => (
    <Navigator initialRouteName="Início" headerMode="screen">
        <Screen name="Início" options={{headerShown: false, unmountOnBlur: true}} component ={Home} />
        <Screen name="VerComanda" component={Comanda} options={{cardStyle:{backgroundColor: 'transparent'}, headerShown: false, animationEnabled:false}}/>
    </Navigator>

)

export const HomeStack = () => (<HomeNavigator/>)