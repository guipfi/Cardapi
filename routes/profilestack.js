import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';


import Profile from '../screens/profile';
import MyData from '../screens/mydata';
import About from '../screens/about';
import Favorite from '../screens/favorite';
import UploadScreen from '../shared/UploadScreen';
import Comanda from '../screens/comanda';
import EditItem from '../shared/editItem'
import Scan from '../screens/scan';

const {Navigator, Screen} = createStackNavigator();

const ProfileNavigator = () => (
    <Navigator initialRouteName="Meu Perfil" headerMode="screen">
        <Screen name="Meu Perfil" component = {Profile} options ={{headerTitleAlign:"center", headerTintColor:"white", headerStyle:{backgroundColor:"#A60400"}}} />
        <Screen name="Meus Dados" component={MyData}  options ={{headerTitleAlign:"center", headerTintColor:"white", headerStyle:{backgroundColor:"#A60400"}}} />
        <Screen name="Sobre nós" component={About}  options ={{headerTitleAlign:"center", headerTintColor:"white", headerStyle:{backgroundColor:"#A60400"}}} />
        <Screen name="Upload" component={UploadScreen}  options ={{headerTitleAlign:"center", headerTintColor:"white", headerStyle:{backgroundColor:"#A60400"}}} />   
        <Screen name="Restaurantes Favoritos" component={Favorite}  options ={{headerTitleAlign:"center", headerTintColor:"white", headerStyle:{backgroundColor:"#A60400"}}} />
        <Screen name="Scan" component={Scan} options={{cardStyle:{backgroundColor: 'transparent'}, headerShown: false, animationEnabled:false}} />
        <Screen name="Comanda" component={Comanda} options={{cardStyle:{backgroundColor: 'transparent'}, headerShown: false, animationEnabled:false}} />
    </Navigator>

)

export const ProfileStack = () => (<ProfileNavigator/>)