import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
// React Navigation V5
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
// Estilo Global
import {globalStyles} from '../styles/global';
// Telas
import Home from '../screens/home';
import Profile from '../screens/profile';
import Search from '../screens/search';
import Scan from '../screens/scan';
import Notification from '../screens/notification';
import Comanda from '../screens/comanda';
// Icones
import {QrCode,Lupa,HomeOutline} from '../assets/icons/icons';
import { MaterialIcons } from '@expo/vector-icons'; 


const Tab = createBottomTabNavigator();
const Icon = (iconName) => <MaterialIcons style={{position:'absolute',bottom:"35%"}} name={iconName} size={30} color="black" />;

export default function NavBar(){
    return(
            <Tab.Navigator  tabBarOptions={{style:style.navbar, activeTintColor:'#060606', labelStyle:style.labelStyle, inactiveTintColor:'#595959'}}>
                <Tab.Screen name="Início"  component={Home} options = {{ tabBarIcon: ({focused}) => focused ? Icon('home') :  <HomeOutline /> }} />
                <Tab.Screen name="Buscar" component={Search} options = {{ tabBarIcon: ({focused}) => focused ? <Lupa /> :  Icon('search') }} />
                <Tab.Screen name="Comanda" component={Comanda} options = {{tabBarLabel: () => (<Text style={style.comandaStyle}>Comanda</Text>),tabBarIcon: () => (<View style={{position:'absolute', bottom: '0%', height: 65, width: 65, borderRadius: 58, backgroundColor: '#590B09',justifyContent: 'center', alignItems: 'center',top:'-12%'}}><QrCode /></View>)}} />
                <Tab.Screen name="Notificações" component={Notification} options = {{ tabBarIcon: ({focused}) => focused ? Icon('notifications') :  Icon('notifications-none') }}/>
                <Tab.Screen name="Perfil" component={Profile} options = {{ tabBarIcon: ({focused}) => focused ? Icon('person') :  Icon('person-outline') }}/>
            </Tab.Navigator>
    );
}

const style = StyleSheet.create({
    navbar:{
        backgroundColor:'#D9D9D9',
        position:'absolute',
        height:65,
    },
    labelStyle:{
        ...globalStyles.legenda2,
        position:'absolute',
        bottom:'20%',
    },
    comandaStyle:{
        ...globalStyles.legenda2,
        color:'#E0A819',
        position:'absolute',
        bottom:'30%'
    },
})	