import React, {useEffect, useState} from 'react';
import {View,Text,StyleSheet,Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CardConquista from '../shared/cardConquista'

// Estilo Global
import {globalStyles} from '../styles/global';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';


export default function RestauranteConquistas({navigation}){
    
    const restaurant = useSelector(state => state.user);
    const renderItem = ({item}) =>{
        console.log(item)
        return(
            <CardConquista lista ={item} restaurante={restaurant.id} />
        )
    }
    
    return(
        <View styles={{backgroundColor:"white", flex:1}}>
            <FlatList ListHeaderComponent={
                <View>
                    <Text style={{...globalStyles.h5, marginLeft:"4%",marginTop:'5%',marginBottom:'3%'}}>Conquistas Ativas</Text>
                    <View style={{alignItems:"center", marginTop: 10}}>
                        <TouchableOpacity style={globalStyles.mediumButtonStyle}>
                            <Text style={{color:"#FAFAFA",...globalStyles.body1}}>Adicionar</Text>
                        </TouchableOpacity>
                    </View>
                </View>}
                data = {restaurant.conquistas}
                renderItem={renderItem} 
            />
        </View>
    )
}

const styles = StyleSheet.create({

})