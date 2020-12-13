import React, {useState,useEffect} from 'react';
import {firebase} from '../utils/firebase'
import {StyleSheet, View, Text,Image, TouchableOpacity} from 'react-native';
import {useSelector,useDispatch} from 'react-redux'
import {updateFavorite,deleteFavorite} from '../actions/userActions';

// Estilo Global
import {globalStyles} from '../styles/global';

import { MaterialIcons } from '@expo/vector-icons'; 

export default function Card({img,name,type,wifi,estacionamento,music,acessible,user, id}){
    const [image, setImage] = useState('default_profile.png')
    const userRedux = useSelector(state => state.user)
    const dispatch = useDispatch()
    console.log(userRedux)
    // Se o array do estado do redux for diferente de vazio e encontrar o elemento no array, então pinta o coração de vermelho
    const [isFavorite, setFavorite] = useState((userRedux!=null && userRedux.favorite.length > 0 &&
        userRedux.favorite.find((element) => element == id) !=undefined) ? true: false);
    
    // Função que realiza as ações de favoritamento/desfavoritamento
    const Favorite = (param) =>{
        if(user) {
            if(param == true){
                // O parâmetro user  pode ser tanto vindo do Auth quanto do State do Redux
                if(user.uid == undefined){  
                    firebase.database().ref('users/'+user.id+"/profile/favorite/"+id).set(true)
                } else{
                    firebase.database().ref('users/'+user.uid+"/profile/favorite/"+id).set(true)
                }
                dispatch(updateFavorite(id))
            } else{
                if(user.uid == undefined){
                    firebase.database().ref('users/'+user.id+"/profile/favorite/"+id).remove()
                } else{
                    firebase.database().ref('users/'+user.uid+"/profile/favorite/"+id).remove()
                }
                dispatch(deleteFavorite(id))
            }
            setFavorite(param);
        }
    }
    useEffect(() => {
            if(img == undefined){
                img = image
            }
            firebase.storage().ref(img).getDownloadURL().then((url) =>{
                setImage(url);
            })
    }, []);

    return(
        <View style={styles.cardContainer}>
            <View>
                <Image source={{uri:image}} style={{position:'relative', borderTopLeftRadius:20, borderTopRightRadius:20, width:"100%", height:133}}/>
                {user ?
                    <View style={{backgroundColor:"#F2F2F2", position:'absolute', left:"86%", height:"25%", width:"10%", borderBottomLeftRadius:20, borderBottomRightRadius:20, alignItems:'center',justifyContent:'center'}}>
                    <TouchableOpacity onPress={() => Favorite(!isFavorite)}>
                        {isFavorite ? <MaterialIcons name="favorite" size={25} color="#740300"/> : <MaterialIcons name="favorite-border" size={25} color="black"/>  } 
                    </TouchableOpacity>
                </View>: <View></View>
                }

             </View>
    <Text style={{...globalStyles.sub1, marginLeft:"3.5%",marginTop:'2.8%'}}>{name}</Text>
            <View style={styles.rowContainerTipo}>
                <Text style={{...globalStyles.body4,color:"#404040",paddingRight: "1.5%"}}>Categoria - {type}</Text>
            </View>
            <View style={styles.rowContainerConquistas}>
                <Text style={{...globalStyles.body3, marginLeft:"3.5%"}}>Conquistas Disponíveis:10/10</Text>
                <View style={{marginLeft:"18%",flexDirection:'row'}}>
                    {acessible ? <MaterialIcons name="accessible" size={15} color="black" style={{paddingRight:"1%"}} />:<MaterialIcons name="accessible" size={15} color="gray" style={{paddingRight:"1%"}} />}
                    {estacionamento ? <MaterialIcons name="directions-car" size={15} color="black" style={{paddingRight:"1%"}}/>: <MaterialIcons name="directions-car" size={15} color="gray" style={{paddingRight:"1%"}}/>}
                    {wifi ? <MaterialIcons name="wifi" size={15} color="black" style={{paddingRight:"1%"}}/>:<MaterialIcons name="wifi" size={15} color="gray" style={{paddingRight:"1%"}}/>}
                    {music ? <MaterialIcons name="music-note" size={15} color="black" />:<MaterialIcons name="music-note" size={15} color="gray" style={{paddingRight:"1%"}}/>}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    rowContainerTipo:{
        marginTop:"1.4%",
        flexDirection:'row',
        marginLeft:"3.5%",
    },
    rowContainerConquistas:{
        marginTop:10,
        flexDirection:'row',
    },
    cardContainer:{
        borderRadius:20,
        height:215,
        alignSelf:'center',
        backgroundColor:"#F2F2F2",
        elevation:3,
        minWidth:'93.6%',
        marginBottom:20,
    }
})