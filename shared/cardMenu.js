import React, { useState } from 'react';
import {View, Text,StyleSheet,ScrollView,Image} from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { globalStyles } from '../styles/global';
import {firebase} from '../utils/firebase';
import { MaterialIcons } from '@expo/vector-icons';
import {useSelector} from 'react-redux';

export default function CardMenu({lista,restaurante}){
    const [image, setImage] = useState('default_profile.png')

    const upd = firebase.database().ref("restaurant/"+restaurante.id+"/cardapio/pratos"+lista)
    console.log(upd)
    firebase.storage().ref(img).getDownloadURL().then((url) =>{
        setImage(url)
    })

    return(
        <View style={{...styles.cardContainer}}>
            <View style={styles.cardContent}>
                <View>
                    <Text style={globalStyles.sub1}>{nome}</Text>
                </View>
                
                <View style={globalStyles.legenda1, styles.descricao}>
                    <Text>{descricao}</Text>
                </View>
                
                <View style={styles.sideInformation}>
                    <Text style={{...globalStyles.sub1, flex: 3}}>R${preco}</Text>
                </View> 
            </View>
            {image && <Image style={{width: "36%", height:"auto",resizeMode:'stretch'}} source={{ uri: image }}/>}
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