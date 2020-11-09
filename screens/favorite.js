import React, {useState} from 'react'
import {View, Text, StyleSheet, TextInput, Image, FlatList, TouchableOpacity } from 'react-native';
import {globalStyles} from '../styles/global';
import {SearchBar} from 'react-native-elements'
import { MaterialIcons } from '@expo/vector-icons';
import Card from '../shared/Card';
import {firebase} from '../utils/firebase';
import Loading from '../shared/Loading';

export default function Favorite(){

    const [isFavorite, setIsFavorite] = useState(false);
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
            <View style={styles.cardContainer}>
            <View>
                <Image source={item.img} style={{position:'relative', borderTopLeftRadius:20, borderTopRightRadius:20, width:"100%", height:133}}/>
                <View style={{backgroundColor:"#F2F2F2", position:'absolute', left:"90%", height:"25%", width:"10%", borderBottomLeftRadius:20, borderBottomRightRadius:20, alignItems:'center',justifyContent:'center'}}>
                    <TouchableOpacity onPress={Favorite}>
                        {isFavorite ? <MaterialIcons name="favorite-border" size={25} color="#740300"/> : <MaterialIcons name="favorite" size={25} color="#740300"/>  } 
                    </TouchableOpacity>
                </View>
             </View>
    <Text style={{...globalStyles.sub1, marginLeft:"3.5%",marginTop:'2.8%'}}>{item.name}</Text>
            <View style={styles.rowContainerTipo}>
                <Text style={{...globalStyles.legenda1,color:"#404040",paddingRight: "1.5%"}}>SteakHouse • 3,5km •</Text>
                <Image source={require('../assets/icons/coupon.png')} style={{marginRight:"0.6%"}} />
                <Text style={{...globalStyles.legenda1,color:"#404040"}}>Consumo Médio: R$ 80,00</Text>
            </View>
            <View style={styles.rowContainerConquistas}>
                <Text style={{...globalStyles.body3, marginLeft:"3.5%"}}>Conquistas Disponíveis:10/10</Text>
                <View style={{marginLeft:"18%",flexDirection:'row'}}>
                    <MaterialIcons name="accessible" size={15} color="black" style={{paddingRight:"1%"}} />
                    <MaterialIcons name="directions-car" size={15} color="black" style={{paddingRight:"1%"}}/>
                    <MaterialIcons name="wifi" size={15} color="black" style={{paddingRight:"1%"}}/>
                    <MaterialIcons name="music-note" size={15} color="black" />
                </View>
            </View>
        </View>
    );
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