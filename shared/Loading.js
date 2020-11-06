import React from 'react';
import {ActivityIndicator, View, Text} from 'react-native';

export default function Loading(){
    return(
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Text>Carregando...</Text>
            <ActivityIndicator animating={true} size="large" color="#740300" />
        </View>
    )
}
