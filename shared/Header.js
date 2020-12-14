import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Image, KeyboardAvoidingView, Alert } from 'react-native';
import {globalStyles} from '../styles/global';
import { MaterialIcons } from '@expo/vector-icons'; 
import {firebase} from '../utils/firebase';
import Loading from '../shared/Loading';

export default function Header(props) {
    
    const [picture, setPicture] = useState(props.img);
    const [isFavorite, setFavorite] = useState('false');
    const Favorite = () =>{
        setFavorite(!isFavorite);
    }

    useEffect(() => {
        if(picture == undefined){
            setPicture('default_profile.png');
        }
        firebase.storage().ref(props.img).getDownloadURL().then((url) =>{
            setPicture(url);
        })
    }, []);
    
    return(
        <View style={styles.header}>
            <View style={styles.logoContainer}>
                <Image  style={styles.logo} 
                        source={{uri: picture}}
                        resizeMode="contain"     
                />
            </View>
            <View style={styles.headerText}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <View style={{flex: 8}}>
                       <Text style={{...globalStyles.sub2, marginRight: 5}}>{props.name}</Text>
                    </View>
                    <View style={{flex: 1}}>
                    <TouchableOpacity onPress={Favorite} style={styles.favorite}>
                        {isFavorite ? <MaterialIcons name="favorite-border" size={25} color="#000"/> : <MaterialIcons name="favorite" size={25} color="#000"/>  } 
                    </TouchableOpacity>    
                    </View>
                </View>
                <View style={styles.subdetail}>
                    <Text style={{...globalStyles.legenda1}}>{props.type}</Text>
                    <Text style={{...globalStyles.legenda1}}>3,7km</Text>
                    <Text style={{...globalStyles.legenda1, color: "green"}}>Aberto</Text>
                </View>
                <View style={styles.subInfo}>
                    <View style={{flex: 2, flexDirection: "row"}}>
                        <MaterialIcons style={{marginRight: 2}} name="star" size={15} color="#000" />
                        <Text style={{...globalStyles.body3}}>3,8 (26)</Text>
                    </View>
                    <View style={{flex: 2, flexDirection: "row", justifyContent: "center"}}>
                        <Image source={require("../assets/icons/trophy_icon.png")} />
                        <Text style={{...globalStyles.body3}}>5/12 (41%)</Text>
                    </View>
                    <View style={{flex: 3, flexDirection: "row"}}>
                        <MaterialIcons style={{marginRight: 2, marginLeft: 20}} name="local-offer" size={15} color="#000" />
                        <Text style={{...globalStyles.body3}}>{props.price}</Text>
                    </View>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        marginTop: "1%",
        maxHeight: 100,
        minHeight: 80,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        margin: 10,
        borderBottomWidth: 1
    },
    logoContainer: {
        flex: 1,
        width: "8%",
        height: "8%"
    }, 

    logo: {
        flex: 1,
        minWidth: 60,
        minHeight: 60,
        borderColor:'black',
        borderWidth: 1
    },
   
    headerText: {
        flex: 8,
        marginLeft:"13.4%",
        flexDirection: 'column',
    },

    favorite: {
        flex: 1,
        marginTop: "20%",
        marginRight: "1.5%"
    },
    subdetail: {
        flex: 1, 
        flexDirection: "row", 
        justifyContent: "space-between", 
        maxWidth: 160,
        maxHeight: 20
    },
    subInfo: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between",
        maxHeight: 20 
    },
    subHeader: {
        flex: 1,
        maxHeight: 50,
        marginTop: "1%",
        height: "auto",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})