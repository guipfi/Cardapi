import React, { useEffect, useState } from 'react';
import {View, Text,StyleSheet, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { globalStyles } from '../styles/global';
import {firebase} from '../utils/firebase';

export default function CardConquista({lista,restaurante}){
    const [itens,setItens] = useState(null)

    useEffect(() => {
        let isMounted = true
        firebase.database().ref("restaurant/"+restaurante+"/conquistas/ativas/"+lista).once('value', snapshot =>{
            if(isMounted){
                setItens(snapshot.val())
            }
        })
        return () => {isMounted = false}
    }, [itens]);
    console.log(itens)

    const excluirItem = () =>{
        firebase.database().ref("restaurant/"+restaurante+"/conquistas/ativas/"+lista).remove()
    }
   
    return(
        <View style={{flexGrow:0, flexDirection:'row', alignItems:'center',justifyContent:'center'}}>
            <View>
            <View style={{backgroundColor:"#F1C552", width:152,  marginLeft:16, alignItems:'center', borderRadius:11, padding:20, marginBottom:25}}>
                <FontAwesome name="trophy" size={24} color="black" />
                <Text style={{...globalStyles.body3}}>{itens && itens.nome}</Text>
                <Text style={{...globalStyles.legenda1}}>{itens && itens.descricao}</Text>
                <Text style={{...globalStyles.legenda2, alignSelf:'flex-start'}}>Ativo até: {itens && itens.data}</Text>
            </View>
            <View style={{borderRadius:5,backgroundColor:"#740300", width:60,height:28, alignItems:'center', justifyContent:'center', position:'absolute', top:110, left:60}}>
                <View style={{flexDirection:'row'}}>
                    <Image style={{marginRight:"1%"}}  source={require('../assets/icons/white_fork.png')} />
                    <Text style={{...globalStyles.legenda2, color:"white"}}>{itens && itens.points}</Text>
                </View>
            </View>
            </View>
            <TouchableOpacity onPress={excluirItem}>
                <MaterialCommunityIcons name="trash-can-outline" size={48} color="black" />
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