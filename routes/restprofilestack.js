import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';

import RestaurantMyData from '../screens/restaurantMydata';
import About from '../screens/about';
import UploadScreen from '../shared/UploadScreen';

import RestaurantProfile from '../screens/restaurantProfile';

const {Navigator, Screen} = createStackNavigator();

const RestaurantProfileNavigator = () => (
    <Navigator initialRouteName="Perfil" headerMode="screen" initial={false}>
        <Screen name="Perfil" component = {RestaurantProfile} options ={{headerTitleAlign:"center", headerTintColor:"white", headerStyle:{backgroundColor:"#A60400"}}} />
        <Screen name="Meus Dados" component={RestaurantMyData}  options ={{headerTitleAlign:"center", headerTintColor:"white", headerStyle:{backgroundColor:"#A60400"}}} />
        <Screen name="Sobre nós" component={About}  options ={{headerTitleAlign:"center", headerTintColor:"white", headerStyle:{backgroundColor:"#A60400"}}} />
        <Screen name="Upload" component={UploadScreen}  options ={{headerTitleAlign:"center", headerTintColor:"white", headerStyle:{backgroundColor:"#A60400"}}} />   
    </Navigator>

)

export const RestaurantProfileStack = () => (<RestaurantProfileNavigator/>)