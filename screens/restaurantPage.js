import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import {globalStyles} from '../styles/global';
import { MaterialIcons } from '@expo/vector-icons'; 
import {firebase} from '../utils/firebase';
import Loading from '../shared/Loading';

import Header from '../shared/Header';

export default function RestaurantPage({route, navigation}) {

    const [picture, setPicture] = useState(route.params.profile.img);
    const[data,setData] = useState([]); // Lista de Restaurantes

    const ToAbout = () =>{
        console.log("To About Img:")
        console.log(route.params.profile.img);
        navigation.navigate("Sobre", 
                            {name: route.params.profile.name,
                             bio: route.params.profile.bio,
                             img: route.params.profile.img,   
                            //  monday: route.params.profile.monday,
                            //  tuesday: route.params.profile.tuesday,
                            //  wednesday: route.params.profile.wednesday,
                            //  thursday: route.params.profile.thursday,
                            //  friday: route.params.profile.friday,
                            //  saturday: route.params.profile.saturday,
                            //  sunday: route.params.profile.sunday   
                            });
    }

    const ToProduct = () => {
        navigation.navigate("Produto")
    }

    const ToConquistas = () => {
        navigation.navigate("Conquistas")
    }

    useEffect(() => {
        // Carrega os pratos antes de montar o componente
        const refPratos = firebase.database().ref('restaurant/' + route.params.id + '/cardapio/pratos/');
        const listener =  refPratos.once('value', snapshot => {
            const pratos = [];
            snapshot.forEach(childSnapshot => {
                const key = childSnapshot.key;
                const data = childSnapshot.val();
                pratos.push({id: key, ...data });
            });
            setData(pratos)
            console.log("Agora vai")
            console.log(data)
        });
    }, []);


    useEffect(() => {
        if(picture == undefined){
            setPicture('default_profile.png');
        }
        firebase.storage().ref(route.params.profile.img).getDownloadURL().then((url) =>{
            setPicture(url);
        })
    }, []);

    const renderPratos = (item) => {
        console.log("Render Pratoss");
        console.log(item);
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
                        <Text style={{...globalStyles.sub1, flex: 5}}>R${item.item.preco}</Text>
                    </View> 
                </View>
                <Image style={{position: 'relative', width: 50, minWidth: 50, height: 50, flex: 2, }} source={{uri: item.item.img}} resizeMode="contain"/>
            </View>
        );
    }

    return (
         <View style={styles.container}>
        <View style={styles.content}>      
                <FlatList 
                    data={data}
                    renderItem={renderPratos}
                    ListFooterComponent= {()=> (
                        <View style={{marginBottom:"30.5%"}}></View>
                    )}
                    keyExtractor={(item) => item.nome}
                    ListHeaderComponent={() => (
                    <View style={{flex:1}}>
                        <Image source={{uri: picture}} 
                               style={{position:'relative', width:"100%", height:150}} 
                        />
                        <View style={{padding:10}}>
                        <Header name={route.params.profile.name} 
                                type={route.params.profile.type}
                                id={route.params.id}
                                img={route.params.profile.img}
                                price={route.params.profile.price}
                        />
                    
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
                            <TouchableOpacity onPress={ToConquistas}>
                                <Text style={globalStyles.body3}>Ver Todas</Text>
                            </TouchableOpacity>
                        </View> 

                        <View style={{flexDirection: 'row', flex: 1, justifyContent: "space-between", margin: 10}}>
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

                            <View style={styles.awardCard}>
                                <MaterialIcons name="star" size={25} color="#E0A819"/>
                                <Text style={{...globalStyles.body1}}>Rei de Roma</Text>
                                <Text style={{...globalStyles.legenda1, textAlign: "center", marginTop: 10, marginBottom: 10}}>Peça todas as massas com 45% de desconto.</Text>
                                
                                    <TouchableOpacity style={{...globalStyles.smallButtonStyle, height: 30}}>                              
                                        <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center", padding: 5}}>
                                            <MaterialIcons name="star" size={15} color="white"/>
                                            <Text style={{color:"#FAFAFA", marginLeft: 5}}>200</Text>
                                        </View>
                                    </TouchableOpacity>
                            </View>

                        </View>                        
                        <View style={styles.label}>
                            <Text style={globalStyles.h6}>Destaques</Text>
                        </View> 

                        <TouchableOpacity onPress={ToProduct}>
                            <View style={styles.cardDestaque}>
                                <Image style={{Width:"100%",borderRadius:5}} 
                                        source={require("../assets/images/pagina_restaurante_macarao_destaque.png")}
                                        resizeMode="contain"
                                />
                                <View style={styles.destaqueNome}>
                                    <Text style={{...globalStyles.sub1, ...globalStyles.branco1}}>Macarronada Indiana</Text>
                                    <View style={{flexDirection: 'row', alignItems: "center"}}>
                                        <MaterialIcons style={{marginRight: 2}} name="star" size={15} color="#fff" />
                                        <Text style={{...globalStyles.body4, ...globalStyles.branco1}}>4,2 (42)</Text>
                                    </View>
                                    <Text style={{...globalStyles.sub1, ...globalStyles.branco1}}>R$ {44.85}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <View style={styles.label}>
                            <Text style={globalStyles.h6}>Cardápio</Text>
                        </View> 

                        <View style={{...styles.subHeader, justifyContent: "space-between"}}>
                            <TouchableOpacity style={{...globalStyles.smallButtonStyle, height: 30, backgroundColor: '#9c0000'}}>
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
        flex: 4, 
        maxWidth: "50%",
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