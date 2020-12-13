import React, {useState,useEffect} from 'react'
import {View, Text, StyleSheet, TextInput, Image, FlatList, TouchableOpacity } from 'react-native';
import {globalStyles} from '../styles/global';
import {SearchBar} from 'react-native-elements'
import { MaterialIcons } from '@expo/vector-icons';
import Card from '../shared/Card';
import {firebase} from '../utils/firebase';
import {useSelector} from 'react-redux';
import Loading from '../shared/Loading'
import { ref } from 'yup';

export default function Favorite(){

    const [isLoading, setLoading] = useState(true);
    const user = useSelector(state => state.user)
    const [restaurantes,setRestaurantes] = useState([])
    const [restaurantesFavoritos,setRestaurantesFavoritos] = useState([])
    const [encontrados, setEncontrados] = useState(restaurantes)
    const [value,setValue] = useState("")
    const refRestaurantFavoritos = firebase.database().ref('users/'+user.id+"/profile/favorite/");

    useEffect(() => {
        // Pega os ids dos restaurantes favoritos do usuário antes de montar o componente
        if(isLoading == true){
        const listener =  refRestaurantFavoritos.once('value', snapshot => {
            const listaRestaurantes = [];
            snapshot.forEach(childSnapshot => {
                const key = childSnapshot.key;
                listaRestaurantes.push(key);
            });
            setRestaurantesFavoritos(listaRestaurantes)
            const dadosRestaurantes = [];
            restaurantesFavoritos.forEach((value)=>{
                const refRestaurant = firebase.database().ref('restaurant/'+value+"/profile");
                const listenerRestaurant =  refRestaurant.once('value', snapshot => {
                    dadosRestaurantes.push({...snapshot.val(),id:value})
                });
                setRestaurantes(dadosRestaurantes)
            })
        
            setEncontrados(restaurantes)
            
            if(encontrados.length > 0){
                setLoading(false)
            }
        })
    }
      

    },[restaurantesFavoritos,restaurantes]);

    const searchFilterFunction = text => {
        setValue(text)
        const newData = restaurantes.filter(item => {      
          const itemData = `${item.name.toUpperCase()}`;
          
           const textData = text.toUpperCase();
            
           return itemData.indexOf(textData) > -1;    
        });
         setEncontrados(newData)
      };

      const renderItem = ({item}) =>{
        return(
            <TouchableOpacity onPress={() => navigation.navigate('PageStack')}>
                <Card name={item.name} type={item.type} id={item.id} img = {item.img} wifi = {item.wifi} estacionameto = {item.estacionameto} 
                music = {item.music} acessible ={item.acessible}  user = {user}/>
            </TouchableOpacity>
        )
    }
    if(!isLoading){
        return(
            <View style={{backgroundColor:'white', marginBottom:"20%", flex:1}}>
                <SearchBar        
                placeholder="Buscar Favoritos"        
                round
                placeholderTextColor="#BFBFBF"
                searchIcon={{size:20, color:'black'}}
                inputStyle={{...globalStyles.body1 ,backgroundColor:'#F2F2F2', borderColor:'red', color:'black'}}
                containerStyle={{backgroundColor: 'white', marginBottom:'1.4%', marginTop:'1.4%', borderBottomColor:'transparent', borderTopColor:'transparent'}}
                inputContainerStyle={{backgroundColor: '#F2F2F2'}}
                value={value}
                onChangeText={text => searchFilterFunction(text)}
                autoCorrect={false}             
                />      
                <FlatList          
                    data={encontrados}
                    keyExtractor={item => item.id}        
                    renderItem={renderItem}                                 
                />       
            </View>
        )
    } else{
        return(
            <Loading />
        )
    }

}

const styles = StyleSheet.create({
    rowContainerTipo:{
        marginTop:"1.4%",
        flexDirection:'row',
        marginLeft:"3.5%",
    },
    rowContainerConquistas:{
        marginTop:"5%",
        paddingBottom:'2%',
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