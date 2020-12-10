import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {RestaurantProfileStack} from './restprofilestack';

const {Navigator, Screen} = createStackNavigator();

const RootRestaurantNavigator = () => (
  <Navigator initialRouteName="Home Restaurante2" headerMode="none">
     <Screen name="Home Restaurante2" component={RestaurantProfileStack} />
  </Navigator>
)

export const RootStackRestaurant = () => (<RootRestaurantNavigator/>)