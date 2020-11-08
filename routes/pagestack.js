import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';

import RestaurantPage from '../screens/restaurantPage';
import AboutRestaurant from '../screens/aboutRestaurant';

const {Navigator, Screen} = createStackNavigator();

const PageNavigator = () => (
    <Navigator initialRouteName="Restaurant Page" headerMode="screen">
        <Screen name="Pagina Inicial" 
                component={RestaurantPage}  
                options ={{headerTitleAlign:"center", headerTintColor:"white", headerStyle:{backgroundColor:"#A60400"}}} />
        <Screen name="Sobre" 
                component={AboutRestaurant}  
                options ={{headerTitleAlign:"center", headerTintColor:"white", headerStyle:{backgroundColor:"#A60400"}}} />
    </Navigator>

)

export const PageStack = () => (<PageNavigator />)