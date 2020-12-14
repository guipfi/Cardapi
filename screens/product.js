import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image, KeyboardAvoidingView, Alert } from 'react-native';
import {globalStyles} from '../styles/global';
import { MaterialIcons } from '@expo/vector-icons'; 
import {firebase} from '../utils/firebase';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Loading from '../shared/Loading';
import {adicionarCarrinho} from '../actions/cartActions';
import {useDispatch} from 'react-redux';

export default function Product({route, navigation}) {

    const teste = {
        product_id: 10,
        nome: "Macarronada Indiana",
        valor: 30.9,
        quantidade: 1,
        adicionais: [{nome: "Molho Rosê", valor: 10}, {nome: "Maionese", valor: 5.5}],
        observacao: null,
        total: 0
    };

    const dispatch = useDispatch();

    const [preco, setPreco] = useState(Number(route.params.preco));
    const [total, setTotal] = useState(0)
    const [qtd, setQtd] = useState(0);
    const molhos = [17, 11];

    const somaQtd = () => {
        setQtd(qtd+1)
    }

    return (  
            <FlatList 
                ListFooterComponent= {()=> {
                    return(
                    <View style={styles.content}> 
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: 10}}>
                            <Image source={require('../assets/images/pagina_restaurante_macarao_destaque.png')} 
                                    resizeMode="contain"
                            />
                        </View>
                        <View style={styles.destaqueNome}>
                            <Text style={{...globalStyles.sub1}}>{route.params.nome}</Text>
                            <View style={{flexDirection: 'row', alignItems: "center"}}>
                                <MaterialIcons style={{marginRight: 2}} name="star" size={15} color="#000" />
                                <Text style={{...globalStyles.body4}}>4,2 (42)</Text>
                            </View>
                            <Text style={{...globalStyles.sub1}}>R${preco}</Text>
                        </View>
                        <View style={{margin: 10, textAlign: 'justify'}}>
                            <Text>{route.params.descricao}</Text>
                        </View>
                        <Text style={{...globalStyles.sub1, marginLeft: 10, marginTop: 20}}>Adicionais</Text>

                        <View style={styles.adicional}>
                            <View>
                                <Text>Molho Rosê</Text>
                                <Text>+ R$17,00</Text>
                            </View>
                            <TouchableOpacity onPress={() => setTotal(total + molhos[0])}>
                                <MaterialIcons name="add" size={25} color="#000" />
                            </TouchableOpacity>
                        </View>
                        
                        <View style={styles.adicional}>
                            <View>
                                <Text>Molho Napolitano</Text>
                                <Text>+ R$11,00</Text>
                            </View>
                            <TouchableOpacity onPress={() => setTotal(total + molhos[1])}>
                                <MaterialIcons name="add" size={25} color="#000" />
                            </TouchableOpacity>                        
                        </View>

                        <Text style={{...globalStyles.sub1, marginLeft: 10, marginTop: 20}}>Observação</Text>

                        <View style={styles.inputLabel}>
                            <Text style={{...globalStyles.legenda2, ...globalStyles.preto2, marginTop:"4%"}}>Observação</Text>
                            <TextInput 
                                style={{marginBottom:"3%", ...globalStyles.body1}}
                                placeholder="(Escreva seu comentário)"
                                value=""
                            />
                        </View>

                        <Text style={{...globalStyles.sub1, marginLeft: 10, marginTop: 20}}>Adicionar ao seu pedido</Text>

                        <View style={{flexDirection: 'row', justifyContent: "space-between"}}>
                            <View style={{flexDirection: 'row', margin: 10, alignItems: "center", justifyContent: "space-between"}}>
                                <TouchableOpacity onPress={() => {setQtd(qtd-1); setTotal(total - preco)}}>
                                    <MaterialIcons name="remove-circle-outline" size={30} color="#262626"/>
                                </TouchableOpacity>
                                <View style={{ height: 30, width: 30, justifyContent: "center", alignItems: 'center', backgroundColor: "#262626", borderRadius: 8, marginRight: 10, marginLeft: 10}}>
                                    <Text style={{...globalStyles.branco1, ...globalStyles.h6}}>{qtd}</Text>
                                </View>
                                <TouchableOpacity onPress={() => {setQtd(qtd+1); setTotal(total + preco)}}>
                                    <MaterialIcons name="add-circle-outline" size={30} color="#262626"/>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={{...globalStyles.mediumButtonStyle, height: 30, width: 180, marginRight: 10}} onPress={() => {
                                console.log(teste.quantidade);
                                dispatch(adicionarCarrinho(teste));
                            }
                            }>
                                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                    <Text style={{color:"#FAFAFA", ...globalStyles.sub2, marginRight: 20}}>Adicionar</Text> 
                                    <Text style={{color:"#FAFAFA", ...globalStyles.sub1}}>R${total}</Text>
                                </View>
                            </TouchableOpacity>   
                        </View>

                        <Text style={{...globalStyles.sub1, marginLeft: 10, marginTop: 20}}>Avaliações dos clientes</Text>

                        <View style={styles.comment}>
                            <View style={{flex: 1, flexDirection: "row", justifyContent: "space-between"}}>
                                <View style={{flex: 3, flexDirection: "row"}}>
                                    <MaterialIcons name="account-circle" size={20} color="black"/>
                                    <Text style={{...globalStyles.body2, marginLeft: 5}}>Patrícia</Text>
                                    <Text style={{...globalStyles.body1, marginLeft: 10}}>Muito bom</Text>
                                </View>
                                <View style={{flex: 1, flexDirection: "row"}}> 
                                    <MaterialIcons name="star" size={15} color="black"/>
                                    <MaterialIcons name="star" size={15} color="black"/>
                                    <MaterialIcons name="star" size={15} color="black"/>
                                    <MaterialIcons name="star" size={15} color="black"/>
                                    <MaterialIcons name="star" size={15} color="black"/>
                                </View>
                            </View>
                            <View style={{marginTop: 10, marginBottom: 20}}>
                                <Text>Gostei bastante do prato, muito bom. É o melhor da cidade</Text>
                            </View>
                        </View>

                        <View style={styles.comment}>
                            <View style={{flex: 1, flexDirection: "row", justifyContent: "space-between"}}>
                                <View style={{flex: 3, flexDirection: "row"}}>
                                    <MaterialIcons name="account-circle" size={20} color="black"/>
                                    <Text style={{...globalStyles.body2, marginLeft: 5}}>Marcos</Text>
                                    <Text style={{...globalStyles.body1, marginLeft: 10}}>Não gostei</Text>
                                </View>
                                <View style={{flex: 1, flexDirection: "row"}}> 
                                    <MaterialIcons name="star" size={15} color="black"/>
                                    <MaterialIcons name="star" size={15} color="#D9D9D9"/>
                                    <MaterialIcons name="star" size={15} color="#D9D9D9"/>
                                    <MaterialIcons name="star" size={15} color="#D9D9D9"/>
                                    <MaterialIcons name="star" size={15} color="#D9D9D9"/>
                                </View>
                            </View>
                            <View style={{marginTop: 10, marginBottom: 20}}>
                                <Text>O prato veio frio, sem gosto, fiquei esperando na fila por duas horas. Além disso, os funcionários não são receptivos.</Text>
                            </View>
                        </View>

                        <View style={styles.comment}>
                            <View style={{flex: 1, flexDirection: "row", justifyContent: "space-between"}}>
                                <View style={{flex: 3, flexDirection: "row"}}>
                                    <MaterialIcons name="account-circle" size={20} color="black"/>
                                    <Text style={{...globalStyles.body2, marginLeft: 5}}>Letícia</Text>
                                    <Text style={{...globalStyles.body1, marginLeft: 10}}>Bom</Text>
                                </View>
                                <View style={{flex: 1, flexDirection: "row"}}> 
                                    <MaterialIcons name="star" size={15} color="black"/>
                                    <MaterialIcons name="star" size={15} color="black"/>
                                    <MaterialIcons name="star" size={15} color="black"/>
                                    <MaterialIcons name="star" size={15} color="#D9D9D9"/>
                                    <MaterialIcons name="star" size={15} color="#D9D9D9"/>
                                </View>
                            </View>
                            <View style={{marginTop: 10, marginBottom: 20}}>
                                <Text>Não é tão bom como dizem, mas é saboroso. Mas o preço é bastante inviável, não vale o preço sugerido.</Text>
                            </View>
                        </View>

                    </View>
                )
                }}
            />

    )
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        marginBottom: 60
    },

    destaqueNome: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        alignItems: "center",
        justifyContent: "space-between"
    },

    adicional: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        margin: 10,
        padding: 10,
        borderBottomWidth: 1       
    },

    inputLabel:{
        paddingLeft:"5%",
        margin:"3.125%",
        borderRadius:8,
        minWidth:"88%",
        height:200,
        backgroundColor:"#E5E5E5",
    },

    comment: {
        backgroundColor: "#E5E5E5",
        borderRadius: 8,
        margin: 10,
        padding: 10
    }
});