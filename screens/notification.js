import React from 'react';
import {View, Text} from 'react-native';

// Estilo Global
import {globalStyles} from '../styles/global';



export default function Notification(){
    return(
        <View style={globalStyles.container}>
            <Text>
                Notification Screen
            </Text>
        </View>
    );
}