import React, { useEffect, useState } from 'react';
import {View, Text,StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { globalStyles } from '../styles/global';
import {firebase} from '../utils/firebase';

export default function CardAcompanhamento({lista,restaurante}){
    const [itens,setItens] = useState(null)

    useEffect(() => {
        let isMounted = true
        firebase.database().ref("restaurant/"+restaurante+"/cardapio/acompanhamentos/"+lista).once('value', snapshot =>{
            if(isMounted){
                setItens(snapshot.val())
            }
        })
        return () => {isMounted = false}
    }, [itens]);

    const excluirItem = () =>{
        firebase.database().ref("restaurant/"+restaurante+"/cardapio/acompanhamentos/"+lista).remove()
    }
   
    return(
        <View style={{marginLeft:8,height:"auto", flexDirection:"row", justifyContent:'space-between'}}>
            <View>
                <Text style={{...globalStyles.sub2,...globalStyles.preto2}}>{itens && itens.nome}</Text>
                <Text style={{...globalStyles.body3, ...globalStyles.preto2}}>R$ {itens && itens.preco} </Text>
            </View>
            <TouchableOpacity style={{paddingLeft:30, paddingRight:30}} onPress={excluirItem}>
                <MaterialCommunityIcons name="trash-can-outline" size={24} color="black" />
            </TouchableOpacity>
        </View>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: "#E5E5E5",
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