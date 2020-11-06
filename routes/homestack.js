import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/home';
import Profile from '../screens/profile';
import Search from '../screens/search';
import Notification from '../screens/notification';
import { ProfileStack } from './profilestack';

const {Navigator, Screen} = createStackNavigator();

const HomeNavigator = () => (
    <Navigator initialRouteName="Início" headerMode="screen">
        <Screen name="Início" options={{headerShown: false}} component ={Home} />
        <Screen name="Meu Perfil" component={ProfileStack} />
    </Navigator>

)

export const HomeStack = () => (<HomeNavigator/>)