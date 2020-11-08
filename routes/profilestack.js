import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';


import Profile from '../screens/profile';
import MyData from '../screens/mydata';
import About from '../screens/about';
import Comanda from '../screens/comanda';

const {Navigator, Screen} = createStackNavigator();

const ProfileNavigator = () => (
    <Navigator initialRouteName="MeuPerfil" headerMode="screen" initial={false}>
        <Screen name="MeuPerfil" component = {Profile} options ={{headerTitleAlign:"center", headerTintColor:"white", headerStyle:{backgroundColor:"#A60400"}}} />
        <Screen name="Meus Dados" component={MyData}  options ={{headerTitleAlign:"center", headerTintColor:"white", headerStyle:{backgroundColor:"#A60400"}}} />
        <Screen name="Sobre nós" component={About}  options ={{headerTitleAlign:"center", headerTintColor:"white", headerStyle:{backgroundColor:"#A60400"}}} />
        <Screen name="VerComanda" component={Comanda} options={{cardStyle:{backgroundColor: 'transparent'}, headerShown: false, animationEnabled:false}}/>
    </Navigator>

)

export const ProfileStack = () => (<ProfileNavigator/>)