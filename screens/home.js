import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

import Card from '../shared/Card';

// Estilo Global
import {globalStyles} from '../styles/global';

export default function Home(){
    return(
        <ScrollView>
        <View style={styles.container}>
            <View>
                <Text style={{...globalStyles.h5, marginLeft:"4%",marginTop:'5%'}}>Destaque</Text>
            </View>
            <View style={{marginBottom:'20%'}}>
                <Text style={{...globalStyles.h5, marginLeft:"4%",marginTop:'5%', marginBottom:"2%"}}>Conhecer Locais</Text>
                    <View style={{alignItems:'center'}}>
                        <Card />
                        <Card />
                        <Card />
                    </View>
            </View>
        </View>

         </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:"100%",
        height:"100%"
    }
})