import React, {useState} from 'react'
import {View, Text, StyleSheet, TextInput, Image, FlatList } from 'react-native';
import {globalStyles} from '../styles/global';
import {SearchBar} from 'react-native-elements'
import Card from '../shared/Card';
import {firebase} from '../utils/firebase';
import Loading from '../shared/Loading';

export default function Favorite(){
    const restaurantes =  [{img:require('../assets/images/home_outback_fachada.png'),name:'Outback', key:'1' },{img:require('../assets/images/restaurantes_favoritos_tandoor.png'), name:"Tandoor" ,key:'2'},{img:require('../assets/images/home_outback_fachada.png'), name:"Outback Steak" ,key:'3'}]
    const [encontrados, setEncontrados] = useState(restaurantes)
    const [value,setValue] = useState("")

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
            <Card img={item.img} name={item.name} />
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