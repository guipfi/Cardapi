import React, { useState } from 'react';
import {View, Text,StyleSheet,ScrollView,Image} from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { globalStyles } from '../styles/global';
import {firebase} from '../utils/firebase';
import { MaterialIcons } from '@expo/vector-icons';
import {useSelector} from 'react-redux';
import CardMenu from '../shared/cardMenu';

export default function MyMenu({navigation}){

    const restaurant = useSelector(state => state.user);

    const toNewItem = ()=>{
        navigation.navigate('Novo Item')
    }

    const toNewDrink = () =>{
        navigation.navigate('Nova Bebida')

    }
    const toNewDessert = () =>{
        navigation.navigate('Nova Sobremesa')
    }
    const toNewIngredient = ()=>{
        navigation.navigate('Novo Acompanhamento')
    }

    const renderPratos = (item) => {
        console.log(item)
        return(
            <CardMenu lista={item['item']} restaurante ={restaurant}/>
        )
 
    }

    const renderAcompanhamentos = (item) => {
        return(
            <View style={{marginBottom:"4%", marginLeft: 10}}>
                <Text style={{...globalStyles.sub2,...globalStyles.preto2}}></Text>
                <Text style={{...globalStyles.body3, ...globalStyles.preto2}}>R$ </Text>
            </View>
        )
    }

    return(
        <ScrollView style={{backgroundColor:'white'}}>
            <View style={{backgroundColor:'white', marginBottom:"50%"}}>
                <View style={styles.container}>
                    <View style={styles.section}>
                        <View style={styles.headerSection}>
                            <Text style={{...globalStyles.sub1}}>Pratos</Text>
                            <TouchableOpacity onPress={toNewItem}>
                                <Text style={{...globalStyles.body3, ...globalStyles.vermelho1}}>+ Adicionar</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList data={restaurant.pratos} renderItem={renderPratos} />
                    </View>

                    <View style={styles.section}>
                        <View style={styles.headerSection}>
                            <Text style={{...globalStyles.sub1}} >Bebidas</Text>
                            <TouchableOpacity onPress={toNewDrink}>
                                <Text style={{...globalStyles.body3, ...globalStyles.vermelho1}}>+ Adicionar</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList data={restaurant.bebidas}  renderItem={renderPratos} />
                    </View>

                    <View style={styles.section}>
                        <View style={styles.headerSection}>
                            <Text style={{...globalStyles.sub1}}>Sobremesas</Text>
                            <TouchableOpacity onPress={toNewDessert}>
                                <Text style={{...globalStyles.body3, ...globalStyles.vermelho1}}>+ Adicionar</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList data={restaurant.sobremesas}  renderItem={renderPratos} />
                    </View>

                    <View style={styles.section}>
                        <View style={{...styles.headerSection, borderBottomColor:'transparent'}}>
                            <Text style={{...globalStyles.sub1}}>Acompanhamento</Text>
                            <TouchableOpacity onPress={toNewIngredient}>
                                <Text style={{...globalStyles.body3, ...globalStyles.vermelho1}}>+ Adicionar</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList data={restaurant.acompanhamentos}  renderItem={renderAcompanhamentos}/>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        marginLeft:'4%',
        marginRight:'4%',
    },

    headerSection:{
        flexDirection:'row',
        marginBottom:"3%",
        marginLeft:"3%",
        marginRight:"3%",
        justifyContent:'space-between'
    },
    section:{
        borderBottomWidth:2,
        marginTop:"5%",
        borderBottomColor:"#BFBFBF",
    },
    cardContent: {
        maxWidth: "60%",
        padding:10
    },
    cardContainer: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: "#E5E5E5",
        height: "auto",
        marginBottom:"5%",
        marginTop: 5,
        marginRight: 10,
        marginLeft: 10,
        borderRadius: 8,
    },
    descricao: {
        flex: 3,
    },
    sideInformation:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
})