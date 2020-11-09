import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';


import Profile from '../screens/profile';
import MyData from '../screens/mydata';
import About from '../screens/about';
import Favorite from '../screens/favorite';
import UploadScreen from '../shared/UploadScreen';
import Comanda from '../screens/comanda';
import MyMenu from '../screens/mymenu';
import NewItem from '../screens/newItem';
import NewIngredient from '../screens/newIngredient';
import EditItem from '../shared/editItem'
import controlComanda from '../control/controlComanda';
import Scan from '../screens/scan';

const {Navigator, Screen} = createStackNavigator();

const ProfileNavigator = () => (
    <Navigator initialRouteName="MeuPerfil" headerMode="screen" initial={false}>
        <Screen name="MeuPerfil" component = {Profile} options ={{headerTitleAlign:"center", headerTintColor:"white", headerStyle:{backgroundColor:"#A60400"}}} />
        <Screen name="Meus Dados" component={MyData}  options ={{headerTitleAlign:"center", headerTintColor:"white", headerStyle:{backgroundColor:"#A60400"}}} />
        <Screen name="Sobre nós" component={About}  options ={{headerTitleAlign:"center", headerTintColor:"white", headerStyle:{backgroundColor:"#A60400"}}} />
        <Screen name="Upload" component={UploadScreen}  options ={{headerTitleAlign:"center", headerTintColor:"white", headerStyle:{backgroundColor:"#A60400"}}} />   
        <Screen name="Restaurantes Favoritos" component={Favorite}  options ={{headerTitleAlign:"center", headerTintColor:"white", headerStyle:{backgroundColor:"#A60400"}}} />
        <Screen name="Comanda" component={controlComanda} options={{cardStyle:{backgroundColor: 'transparent'}, headerShown: false, animationEnabled:false}} />
        <Screen name="Scan" component={Scan} options={{cardStyle:{backgroundColor: 'transparent'}, headerShown: false, animationEnabled:false}} />
        <Screen name="Comanda2" component={Comanda} options={{cardStyle:{backgroundColor: 'transparent'}, headerShown: false, animationEnabled:false}} />
        <Screen name="Meu Cardápio" component={EditItem}  options ={{headerTitleAlign:"center", headerTintColor:"white", headerStyle:{backgroundColor:"#A60400"}}} />
    </Navigator>

)

export const ProfileStack = () => (<ProfileNavigator/>)