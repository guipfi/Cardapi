import React from 'react';
import {View, Text} from 'react-native';

// Estilo Global
import {globalStyles} from '../styles/global';




export default function Search(){
    return(
        <View style={globalStyles.container}>
            <Text>
                Search Screen
            </Text>
        </View>
    );
}