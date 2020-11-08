import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';

import Comanda from '../screens/comanda';
import Search from '../screens/search';

const {Navigator, Screen} = createStackNavigator();

const SearchNavigator = () => (
    console.log("SEARCH"),
    <Navigator initialRouteName="Buscar" headerMode="screen">
        <Screen name="Buscar" component = {Search}  options ={{headerTitleAlign:"center", headerTintColor:"white", headerStyle:{backgroundColor:"#A60400"}}} />
        <Screen name="VerComanda" component={Comanda} options={{cardStyle:{backgroundColor: 'transparent'}, headerShown: false, animationEnabled:false}}/>
    </Navigator>

)

export const SearchStack = () => (<SearchNavigator/>)