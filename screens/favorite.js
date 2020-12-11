import React, {useState,useEffect} from 'react'
import {View, Text, StyleSheet, TextInput, Image, FlatList, TouchableOpacity } from 'react-native';
import {globalStyles} from '../styles/global';
import {SearchBar} from 'react-native-elements'
import { MaterialIcons } from '@expo/vector-icons';
import Card from '../shared/Card';
import {firebase} from '../utils/firebase';
import {useSelector} from 'react-redux';

export default function Favorite(){

    const [isFavorite, setIsFavorite] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const user = useSelector(state => state.user)
    //const restaurantes =  [{img:require('../assets/images/home_outback_fachada.png'),name:'Outback', key:'1' },{img:require('../assets/images/restaurantes_favoritos_tandoor.png'), name:"Tandoor" ,key:'2'},{img:require('../assets/images/home_outback_fachada.png'), name:"Outback Steak" ,key:'3'}]
    const [restaurantes,setRestaurantes] = useState([])
    const [restaurantesFavoritos,setRestaurantesFavoritos] = useState([])
    const [encontrados, setEncontrados] = useState(restaurantes)
    const [value,setValue] = useState("")


    useEffect(() => {
        // Pega os ids dos restaurantes favoritos do usuário antes de montar o componente
        const refRestaurantFavoritos = firebase.database().ref('users/'+user.id+"/profile/favorite/");
        const listener =  refRestaurantFavoritos.on('value', snapshot => {
            const listaRestaurantes = [];
            snapshot.forEach(childSnapshot => {
                const key = childSnapshot.key;
                listaRestaurantes.push(key);
            });
            setRestaurantesFavoritos(listaRestaurantes)
        });
        const dadosRestaurantes = [];
        restaurantesFavoritos.forEach((value)=>{
            const refRestaurant = firebase.database().ref('restaurant/'+value);
            const listenerRestaurant =  refRestaurant.once('value', snapshot => {
                snapshot.forEach(childSnapshot => {
                    const key = childSnapshot.key;
                    const data = childSnapshot.val();
                    dadosRestaurantes.push({id: key, ...data });
                });
                setRestaurantes(dadosRestaurantes)
            });
        })



        return () =>{ 
            refRestaurantFavoritos.off('value',listener)
        }

    },[restaurantesFavoritos]);

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
                renderItem={renderItem}                                     
            />       
        </View>
    )

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