import React from 'react';
import {View, Text,StyleSheet} from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { globalStyles } from '../styles/global';
import {useSelector} from 'react-redux';

import CardMenu from '../shared/cardMenu';
import CardAcompanhamento from '../shared/cardAcompanhamento';


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

    const renderPratos = (item,tipo) => {
        return(
            <TouchableOpacity onPress={() => navigation.navigate('Editar Item', {restaurante:restaurant.id, id:item,tipo:tipo})}>
                <CardMenu lista={item} restaurante ={restaurant.id} tipo = {tipo}/>
            </TouchableOpacity>
        )
    }

    const renderAcompanhamentos = ({item}) => {
        return(
            <CardAcompanhamento lista ={item} restaurante = {restaurant.id} />
        )
    }

    return(
                <FlatList ListHeaderComponent={
                    <View style={styles.container}>
                    <View style={styles.section}>
                        <View style={styles.headerSection}>
                            <Text style={{...globalStyles.sub1}}>Pratos</Text>
                            <TouchableOpacity onPress={toNewItem}>
                                <Text style={{...globalStyles.body3, ...globalStyles.vermelho1}}>+ Adicionar</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList data ={restaurant.pratos} keyExtractor={item => item} renderItem={({item, tipo = "pratos"}) => renderPratos(item,tipo)}  />
                    </View>

                    <View style={styles.section}>
                        <View style={styles.headerSection}>
                            <Text style={{...globalStyles.sub1}} >Bebidas</Text>
                            <TouchableOpacity onPress={toNewDrink}>
                                <Text style={{...globalStyles.body3, ...globalStyles.vermelho1}}>+ Adicionar</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList data={restaurant.bebidas}  keyExtractor={item => item} renderItem={({item, tipo = "bebidas"}) => renderPratos(item,tipo)}  />
                    </View>

                    <View style={styles.section}>
                        <View style={styles.headerSection}>
                            <Text style={{...globalStyles.sub1}}>Sobremesas</Text>
                            <TouchableOpacity onPress={toNewDessert}>
                                <Text style={{...globalStyles.body3, ...globalStyles.vermelho1}}>+ Adicionar</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList data={restaurant.sobremesas} keyExtractor={item => item}  renderItem={({item, tipo = "sobremesas"}) => renderPratos(item,tipo)}  />
                    </View>

                    <View style={styles.section}>
                        <View style={{...styles.headerSection, borderBottomColor:'transparent'}}>
                            <Text style={{...globalStyles.sub1}}>Acompanhamento</Text>
                            <TouchableOpacity onPress={toNewIngredient}>
                                <Text style={{...globalStyles.body3, ...globalStyles.vermelho1}}>+ Adicionar</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList data={restaurant.acompanhamentos} keyExtractor={item => item}  renderItem={renderAcompanhamentos}/>
                    </View>
                </View>
                } />
            
    );
}

const styles = StyleSheet.create({
    container:{
        width:"100%",
        backgroundColor:'white',
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