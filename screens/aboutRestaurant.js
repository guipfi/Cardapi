import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Image, KeyboardAvoidingView, Alert } from 'react-native';
import {globalStyles} from '../styles/global';
import { MaterialIcons } from '@expo/vector-icons'; 
import {firebase} from '../utils/firebase';
import Loading from '../shared/Loading';

export default function AboutRestaurant(){
    return(
        <View style={styles.container}>
            <FlatList
                ListFooterComponent={
                    <View style={{marginLeft: "4%", marginTop:'5%', marginRight:"4%"}}>
                    <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: "5%"}}>
                        <Image  source={require('../assets/images/pagina_restaurante_cantina_logo.png')} 
                                resizeMode="contain"
                        />
                    </View>
                    <View>
                        <Text style={{...globalStyles.h5, marginBottom: 10, marginRight: 10}}>Cantina Tradicional de Santos</Text>
                        <Text style={{...globalStyles.body4, textAlign: "justify"}}>A Cantina Tradicional é um restaurante de tradição na gastronomia italiana clássica. Com mais de 30 anos no mercado, a Cantina é um negócio familiar que foi preservado pelas gerações. Os pratos preferidos pelos clientes são a Macarronada Indiana e a Pomba Assada no Rum. A casa conta com música ao vivo, estacionamento além de espaço kids, acessibilidade e desafios para obter creditos</Text>
                    </View>
                    <View>
                    <Text style={{...globalStyles.h5, marginBottom: 10, marginTop: 10}}>Serviços</Text>
                    </View>
                    <View style={{flexDirection: "row", alignItems: "center", marginBottom: 10}}>
                        <MaterialIcons name="accessible" size={20} color="black" style={{paddingRight:"1%"}} />
                        <Text style={globalStyles.body3}>Acessibilidade</Text>
                    </View>
                    
                    <View style={{flexDirection: "row", alignItems: "center", marginBottom: 10}}>
                        <MaterialIcons name="directions-car" size={20} color="black" style={{paddingRight:"1%"}}/>
                        <Text style={globalStyles.body3}>Estacionamento</Text>
                    </View>
                    
                    <View style={{flexDirection: "row", alignItems: "center", marginBottom: 10}}>
                        <MaterialIcons name="wifi" size={20} color="black" style={{paddingRight:"1%"}}/>
                        <Text style={globalStyles.body3}>Wi-Fi</Text>
                    </View>
                    
                    <View style={{flexDirection: "row", alignItems: "center", marginBottom: 10}}>
                        <MaterialIcons name="music-note" size={20} color="black" />
                        <Text style={globalStyles.body3}>Música Ao Vivo</Text>
                    </View>
                    
                    <View style={{flexDirection: "row", alignItems: "center", marginBottom: 10, marginTop: 15}}>
                        <MaterialIcons name="room" size={20} color="black" />
                        <Text style={globalStyles.body3}>Rua Fernando Diniz, 4222, Boqueirão - Santos - SP</Text>
                    </View>
                    <Text style={{...globalStyles.h5, marginBottom: 10, marginTop: 10}}>Horário de Funcionamento</Text>
                    
                    <View style={{flexDirection: 'row', maxWidth: "60%", justifyContent: "space-between", marginBottom: 5}}>
                        <Text style={globalStyles.body1}>Domingo</Text>
                        <Text>11:00 até 23:00</Text>
                    </View>  
                    <View style={{flexDirection: 'row', maxWidth: "60%", justifyContent: "space-between", marginBottom: 5}}>
                        <Text style={globalStyles.body1}>Segunda-Feira</Text>
                        <Text style={{color: 'red'}}>Fechado</Text>
                    </View>  
                    <View style={{flexDirection: 'row', maxWidth: "60%", justifyContent: "space-between", marginBottom: 5}}>
                        <Text style={globalStyles.body1}>Terça-Feira</Text>
                        <Text>11:00 até 23:00</Text>
                    </View> 
                    <View style={{flexDirection: 'row', maxWidth: "60%", justifyContent: "space-between", marginBottom: 5}}>
                        <Text style={globalStyles.body1}>Quarta-Feira</Text>
                        <Text>11:00 até 23:00</Text>
                    </View> 
                    <View style={{flexDirection: 'row', maxWidth: "60%", justifyContent: "space-between", marginBottom: 5}}>
                        <Text style={globalStyles.body1}>Quinta-Feira</Text>
                        <Text>11:00 até 23:00</Text>
                    </View> 
                    <View style={{flexDirection: 'row', maxWidth: "60%", justifyContent: "space-between", marginBottom: 5}}>
                        <Text style={globalStyles.body1}>Sexta-Feira</Text>
                        <Text>11:00 até 01:00</Text>
                    </View> 
                    <View style={{flexDirection: 'row', maxWidth: "60%", justifyContent: "space-between"}}>
                        <Text style={globalStyles.body1}>Sábado</Text>
                        <Text>11:00 até 01:00</Text>
                    </View> 
                    <Text style={{marginTop: 5}}>* Sujeito a mudanças.</Text>
                    <Text style={{...globalStyles.h5, marginBottom: 10, marginTop: 10}}>Meios de Pagamento</Text>
                    
                    <View style={{flexDirection: 'row', marginBottom:"50%", flexWrap:"wrap"}}>
                        <View style={{backgroundColor: "#E5E5E5", minWidth: 55, minHeight: 55, alignItems: 'center', justifyContent: "center", marginRight: 10, marginBottom:10}}>
                            <Image source={require("../assets/images/sobre_restaurante_american_express.png")} />
                        </View>
                        <View style={{backgroundColor: "#E5E5E5", minWidth: 55, minHeight: 55, alignItems: 'center', justifyContent: "center", marginRight: 10, marginBottom:10}}>
                            <Image source={require("../assets/images/sobre_restaurante_elo.png")} />
                        </View>
                        <View style={{backgroundColor: "#E5E5E5", minWidth: 55, minHeight: 55, alignItems: 'center', justifyContent: "center", marginRight: 10, marginBottom:10}}>
                            <Image source={require("../assets/images/sobre_restaurante_hipercard.png")} />
                        </View>
                        <View style={{backgroundColor: "#E5E5E5", minWidth: 55, minHeight: 55, alignItems: 'center', justifyContent: "center", marginRight: 10, marginBottom:10}}>
                            <Image source={require("../assets/images/sobre_restaurante_mastercard.png")} />
                        </View>
                        <View style={{backgroundColor: "#E5E5E5", minWidth: 55, minHeight: 55, alignItems: 'center', justifyContent: "center", marginRight: 10, marginBottom:10}}>
                            <Image source={require("../assets/images/sobre_restaurante_visa.png")} />
                        </View>
                        <View style={{backgroundColor: "#E5E5E5", minWidth: 55, minHeight: 55, alignItems: 'center', justifyContent: "center", marginRight: 10, marginBottom:10}}>
                            <Image source={require("../assets/images/sobre_restaurante_dinheiro.png")} />
                        </View>
                    </View>

                    </View>
            }/>
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
    }
})