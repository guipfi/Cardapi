import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../screens/home';

const {Navigator, Screen} = createStackNavigator();

const HomeNavigator = () => (
    <Navigator initialRouteName="Início">
        <Screen name="Início" component ={Home} />
    </Navigator>

)

export const HomeStack = () => (<HomeNavigator/>)