import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';

import RestaurantPage from '../screens/restaurantPage';
import AboutRestaurant from '../screens/aboutRestaurant';
import Product from '../screens/product';
import Conquistas from '../screens/conquistas';

const {Navigator, Screen} = createStackNavigator();

const PageNavigator = () => (
    <Navigator initialRouteName="Restaurant Page" headerMode="screen">
        <Screen name="Pagina do Restaurante" 
                component={RestaurantPage}  
                options ={{headerTitleAlign:"center", headerTintColor:"white", headerStyle:{backgroundColor:"#A60400"}}} />
        <Screen name="Sobre" 
                component={AboutRestaurant}  
                options ={{headerTitleAlign:"center", headerTintColor:"white", headerStyle:{backgroundColor:"#A60400"}}} />
        <Screen name="Produto" 
                component={Product}  
                options ={{headerTitleAlign:"center", headerTintColor:"white", headerStyle:{backgroundColor:"#A60400"}}} />
        <Screen name="Conquistas" 
                component={Conquistas}  
                options ={{headerTitleAlign:"center", headerTintColor:"white", headerStyle:{backgroundColor:"#A60400"}}} />
    </Navigator>

)

export const PageStack = () => (<PageNavigator />)