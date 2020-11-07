import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';


import Profile from '../screens/profile';
import MyData from '../screens/mydata';

const {Navigator, Screen} = createStackNavigator();

const ProfileNavigator = () => (
    <Navigator initialRouteName="Meu Perfil" headerMode="screen">
        <Screen name="Meu Perfil" component = {Profile}  options ={{headerTitleAlign:"center", headerTintColor:"white", headerStyle:{backgroundColor:"#A60400"}}} />
        <Screen name="Meus Dados" component={MyData}  options ={{headerTitleAlign:"center", headerTintColor:"white", headerStyle:{backgroundColor:"#A60400"}}} />
    </Navigator>

)

export const ProfileStack = () => (<ProfileNavigator/>)