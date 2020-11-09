import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';

import RestaurantMyData from '../screens/restaurantMydata';
import About from '../screens/about';
import UploadScreen from '../shared/UploadScreen';

import RestaurantProfile from '../screens/restaurantProfile';
import MyMenu from '../screens/mymenu';
import NewItem from '../screens/newItem'
import NewIngredient from '../screens/newIngredient'

const {Navigator, Screen} = createStackNavigator();

const RestaurantProfileNavigator = () => (
    <Navigator initialRouteName="Perfil do Restaurante" headerMode="screen">
        <Screen name="Perfil do Restaurante" component = {RestaurantProfile} options ={{headerTitleAlign:"center", headerTintColor:"white", headerStyle:{backgroundColor:"#A60400"}}} />
        <Screen name="Minhas Infos" component={RestaurantMyData}  options ={{headerTitleAlign:"center", headerTintColor:"white", headerStyle:{backgroundColor:"#A60400"}}} />
        <Screen name="Meu Cardápio" component={MyMenu}  options ={{headerTitleAlign:"center", headerTintColor:"white", headerStyle:{backgroundColor:"#A60400"}}} />
        <Screen name="Sobre nós" component={About}  options ={{headerTitleAlign:"center", headerTintColor:"white", headerStyle:{backgroundColor:"#A60400"}}} />
        <Screen name="Novo Item" component={NewItem}  options ={{headerTitleAlign:"center", headerTintColor:"white", headerStyle:{backgroundColor:"#A60400"}}} />
        <Screen name="Novo Acompanhamento" component={NewIngredient}  options ={{headerTitleAlign:"center", headerTintColor:"white", headerStyle:{backgroundColor:"#A60400"}}} />      
        <Screen name="Upload" component={UploadScreen}  options ={{headerTitleAlign:"center", headerTintColor:"white", headerStyle:{backgroundColor:"#A60400"}}} />   
    </Navigator>

)

export const RestaurantProfileStack = () => (<RestaurantProfileNavigator/>)