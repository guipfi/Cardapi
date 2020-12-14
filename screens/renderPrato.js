import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Image, KeyboardAvoidingView, Alert } from 'react-native';
import {globalStyles} from '../styles/global';
import { MaterialIcons } from '@expo/vector-icons'; 
import {firebase} from '../utils/firebase';
import Loading from '../shared/Loading';

export default function RenderPratos (item){
    
    const [image, setImage] = useState('default_profile.png')
    const [itens,setItens] = useState(null)
    
    
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
            <Image style={{position: 'relative', width: 80, minWidth: 50, height: 80, marginLeft: 40, flex: 1, borderWidth: 1, borderColor: 'black'}} 
                   source={{uri: item.item.img}} 
                   resizeMode="contain"/>
        </View>
    );
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
        flex: 6, 
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