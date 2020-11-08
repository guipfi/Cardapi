import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';


const {Navigator, Screen} = createStackNavigator();

const ScanNavigator = () => (
    <Navigator initialRouteName="Comanda2" mode="modal" headerMode="screen" cardStyle={{backgroundColor: 'transparent', opacity: 1}} containerStyle={{backgroundColor: 'transparent', opactiy: 1}} transparentCard={true}> 
    <Screen name="Comanda5" component={Comanda} 
            options={{headerShown: false, cardStyle:{backgroundColor: 'transparent'}}}/>
    </Navigator>
)

export const ScanStack = () => (<ScanNavigator/>)