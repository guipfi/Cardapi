import React from 'react';
import {View, Text} from 'react-native';

// Estilo Global
import {globalStyles} from '../styles/global';



export default function Scan(){
    return(
        <View style={globalStyles.container}>
            <Text>
                Scan Screen
            </Text>
        </View>
    );
}