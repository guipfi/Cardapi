import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Image, KeyboardAvoidingView, Alert } from 'react-native';
import {globalStyles} from '../styles/global';
import { MaterialIcons } from '@expo/vector-icons'; 
import {firebase} from '../utils/firebase';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Loading from '../shared/Loading';

import Header from '../shared/Header';

export default function RestaurantPage({navigation}) {

    const ToAbout = () =>{
        navigation.navigate("Sobre");
    }

    const pratos = [
        {nome: "Macarronada Toscana", 
        descricao: "Macarronada feita com frango, curry e couve flor",
        preco: 32.90,
        media_avaliacao: 4.2,
        num_avaliacao: 10,
        foto: require("../assets/images/pagina_restaurante_pomba_assada.png")
        },
        {nome: "Carne Assada ao Rum", 
        descricao: "Medalhão de alcatra acompanhando de batatas rústicas e molho especial",
        preco: 67.90,
        media_avaliacao: 4.7,
        num_avaliacao: 24,
        foto: {img:require("../assets/images/pagina_restaurante_pomba_assada.png")  }
        },
        {nome: "Nhoque tradicional", 
        descricao: "Nhoque tradicional de várias gerações acompanhando do molho de tomate clássico da casa",
        preco: 58.90,
        media_avaliacao: 4.9,
        num_avaliacao: 54,
        foto: {img:require("../assets/images/pagina_restaurante_pomba_assada.png")  }
        },
    ];

    const renderPratos = (item) => {
        console.log(item)
        return(
            <View style={{...styles.cardContainer, padding: 10, marginBottom: 20}}>
                <View style={styles.cardContent}>
                    <View>
                        <Text style={globalStyles.sub1}>{item.item.nome}</Text>
                    </View>
                    
                    <View style={globalStyles.legenda1, styles.descricao}>
                        <Text>{item.item.descricao}</Text>
                    </View>
                    
                    <View style={styles.sideInformation}>
                        <Text style={{...globalStyles.sub1, flex: 3}}>R${item.item.preco}</Text>
                        <MaterialIcons style={{marginRight: 2}} name="star" size={15} color="#000" />
                        <Text style={globalStyles.body4}>{item.item.media_avaliacao} ({item.item.num_avaliacao})</Text>
                    </View> 
                </View>
                <Image style={{width: 120, height: 120}} source={require("../assets/images/detalhe_produto_macarrao.png")} resizeMode="contain"/>
            </View>
        );
    }

    return (
         <View style={styles.container}>
        <View style={styles.content}>      
                <FlatList 
                    data={pratos}
                    renderItem={renderPratos}
                    ListFooterComponent= {()=> (
                        <View style={{marginBottom:"30.5%"}}></View>
                    )}
                    keyExtractor={(item) => item.nome}
                    ListHeaderComponent={() => (
                    <View style={{flex:1}}>
                        <Image source={require("../assets/images/pagina_restaurantecantina_capa.png")} style={{width:"100%"}} />
                        <View style={{padding:10}}>
                        <Header />
                    
                        <View style={styles.subHeader}>
                            <TouchableOpacity style={{...globalStyles.smallButtonStyle, height: 30}}>
                                <Text style={{color:"#FAFAFA"}}>Descontos</Text>
                            </TouchableOpacity>
                            <MaterialIcons name="accessible" size={15} color="black" style={{paddingRight:"1%"}} />
                            <MaterialIcons name="directions-car" size={15} color="black" style={{paddingRight:"1%"}}/>
                            <MaterialIcons name="wifi" size={15} color="black" style={{paddingRight:"1%"}}/>
                            <MaterialIcons name="music-note" size={15} color="black" />
                            <TouchableOpacity style={{...globalStyles.smallButtonStyle, height: 30}} onPress={ToAbout}>
                                <Text style={{color:"#FAFAFA"}}>Sobre</Text>
                            </TouchableOpacity>                    
                        </View>
                        <View style={styles.label}>
                            <Text style={globalStyles.h6}>Conquistas Disponíveis</Text>
                            <TouchableOpacity>
                                <Text style={globalStyles.body3}>Ver Todas</Text>
                            </TouchableOpacity>
                        </View> 

                        <View style={styles.awardCard}>
                            <MaterialIcons name="star" size={25} color="#E0A819"/>
                            <Text style={{...globalStyles.body1}}>Aventureiro</Text>
                            <Text style={{...globalStyles.legenda1, textAlign: "center", marginTop: 10, marginBottom: 10}}>Peça uma picanha com 70% de desconto.</Text>
                            <TouchableOpacity style={{...globalStyles.smallButtonStyle, height: 30}}>                              
                                <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center", padding: 5}}>
                                    <MaterialIcons name="star" size={15} color="white"/>
                                    <Text style={{color:"#FAFAFA", marginLeft: 5}}>300</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        
                        <View style={styles.label}>
                            <Text style={globalStyles.h6}>Destaques</Text>
                        </View> 

                        <View style={styles.cardDestaque}>
                            <Image style={{maxWidth:"100%",borderRadius:5}} source={require("../assets/images/pagina_restaurante_macarao_destaque.png")}/>
                            <View style={styles.destaqueNome}>
                                <Text style={{...globalStyles.sub1, ...globalStyles.branco1}}>Macarrão Italiano</Text>
                                <View style={{flexDirection: 'row', alignItems: "center"}}>
                                    <MaterialIcons style={{marginRight: 2}} name="star" size={15} color="#fff" />
                                    <Text style={{...globalStyles.body4, ...globalStyles.branco1}}>4,2 (42)</Text>
                                </View>
                                <Text style={{...globalStyles.sub1, ...globalStyles.branco1}}>R$30,90</Text>
                            </View>
                        </View>

                        <View style={styles.label}>
                            <Text style={globalStyles.h6}>Cardápio</Text>
                        </View> 

                        <View style={{...styles.subHeader, justifyContent: "space-between"}}>
                            <TouchableOpacity style={{...globalStyles.smallButtonStyle, height: 30}}>
                                <Text style={{color:"#FAFAFA"}}>Pratos</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{...globalStyles.smallButtonStyle, height: 30}}>
                                <Text style={{color:"#FAFAFA"}}>Bebidas</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{...globalStyles.smallButtonStyle, height: 30}}>
                                <Text style={{color:"#FAFAFA"}}>Sobremesas</Text>
                            </TouchableOpacity>
                        </View>             
                    </View>
                </View>
                    )}
                />
            </View>
        </View> 

    )
};

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    content: {
        flex:1,
        backgroundColor: 'white',
        borderRadius: 16,
    },

    subHeader: {
        maxHeight: 50,
        marginTop: "1%",
        height: "auto",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    label: {
        marginTop: "5%",
        maxHeight: 30,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    cardContainer: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: "#E5E5E5",
        height: "auto",
        marginTop: 10,
        marginRight: 10,
        marginLeft: 10,
        borderRadius: 8,
    },
    
    cardContent: {

        maxWidth: "60%",
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

    cardDestaque: {
        flexDirection: "column",
        borderRadius: 5,
        justifyContent: "flex-start",
        backgroundColor: "#740300",
        marginTop: 10,
    },

    destaqueNome: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: "#740300",
        padding: 10,
        alignItems: "center",
        borderRadius:5,
        justifyContent: "space-between"
    },

    awardCard: {
        flex: 1,
        backgroundColor: "#E5E5E5",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: "45%",
        minWidth: "45%",
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        elevation: 4
    }
});