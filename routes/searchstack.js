import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';

import Search from '../screens/search';

const {Navigator, Screen} = createStackNavigator();

const SearchNavigator = () => (
    console.log("SEARCH"),
    <Navigator initialRouteName="Buscar" headerMode="screen">
        <Screen name="Buscar" component = {Search}  options ={{headerTitleAlign:"center", headerTintColor:"white", headerStyle:{backgroundColor:"#A60400"}}} />
    </Navigator>

)

export const SearchStack = () => (<SearchNavigator/>)