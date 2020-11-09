import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import NavBar from '../shared/NavBar'

import Login from '../screens/login';
import Register from '../screens/register';
import RestaurantRegister from '../screens/restaurantRegister';
import Profile from '../screens/profile';
import { RestaurantProfileStack } from './restprofilestack';

const Stack = createStackNavigator();

function LoginStack({initialRouteName}){
    return(
        <Stack.Navigator initialRouteName={initialRouteName} headerMode="screen">
            <Stack.Screen name="Login" options={{headerShown: false}} component={Login} />
            <Stack.Screen name="Perfil" component={Profile} />
            <Stack.Screen name="Nav"  options={{headerShown: false}} component={NavBar}  />
            <Stack.Screen name="Registro" component={Register} options ={{headerTitleAlign:"center", headerTintColor:"white", headerStyle:{backgroundColor:"#A60400"}}} />
            <Stack.Screen name="Cadastro do Restaurante" component={RestaurantRegister} options ={{headerTitleAlign:"center", headerTintColor:"white", headerStyle:{backgroundColor:"#A60400"}}} />
            <Stack.Screen name='Perfil do Restaurante' component={RestaurantProfileStack} options ={{headerTitleAlign:"center", headerTintColor:"white", headerStyle:{backgroundColor:"#A60400"}}} />
        </Stack.Navigator>
    )
}

export const LoginNavigator = ({isLogged, client}) => (
    <NavigationContainer>
        {isLogged === false ? (
        <LoginStack initialRouteName= 'Login'  />) :( client ? (<LoginStack initialRouteName= 'Nav' />):(<LoginStack initialRouteName='Perfil do Restaurante'/>))
        }
    </NavigationContainer>
)