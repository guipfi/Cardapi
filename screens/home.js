import React from 'react';
import {View, Text} from 'react-native';

// Estilo Global
import {globalStyles} from '../styles/global';

export default function Home(){
    return(
        <View style={globalStyles.container}>
            <Text>
                HomeScreen
            </Text>
        </View>
    );
}