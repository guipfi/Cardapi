import React, {useState,useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Loading from '../shared/Loading'
import {firebase} from '../utils/firebase';

import Card from '../shared/Card';
// Estilo Global
import {globalStyles} from '../styles/global';

export default function Home({navigation}){
    const dataHighlight = [require('../assets/images/home_card_subway.png'),require('../assets/images/home_mcdonalds.png')];
    const dataCard = [{img:require('../assets/images/home_outback_fachada.png'), key:'1' },{img:require('../assets/images/restaurantes_favoritos_tandoor.png'), key:'2'},{img:require('../assets/images/home_outback_fachada.png'), key:'3'}]
    const [activeSlide,setActive] = useState(0)
    const [isLoading,setLoading] = useState(false)
    const[data,setData] = useState([])

    useEffect(() => {
        const ref = firebase.database().ref('restaurant/');
        const listener =  ref.once('value', snapshot => {
            const fetchedTasks = [];
            snapshot.forEach(childSnapshot => {
                const key = childSnapshot.key;
                const data = childSnapshot.val();
                fetchedTasks.push({id: key, ...data });
            });
            setData(fetchedTasks)
        });
    }, []);
    console.log(data)
    const renderItem = ({item}) =>{
        return(
            <TouchableOpacity onPress={() => navigation.navigate('PageStack')}>
                <Card name={item.profile.name} img = {item.id} />
            </TouchableOpacity>
        )
    }

    const _renderItem = ({item,index}) =>{
        return(
            <TouchableOpacity>
            < Image style={styles.highlightStyle} source={item} />
            </TouchableOpacity>
        );
    }
    if(!isLoading){
    return(
        <View style={{marginBottom:"20%"}}>
            <FlatList
            data={data}
            ListHeaderComponent={ () =>(
            <View style={styles.container}>
                <View >
                    <Text style={{...globalStyles.h5, marginLeft:"4%",marginTop:'5%',marginBottom:'3%'}}>Destaque</Text>
                    <Carousel renderItem ={_renderItem} data={dataHighlight} layout={'default'} sliderWidth={320} itemWidth={300} itemHeight={164} onSnapToItem={(index) => setActive(index)} />
                    <Pagination dotsLength = {3} dotColor="#740300" inactiveDotColor="#BFBFBF" activeDotIndex={activeSlide} dotStyle={{width:7,height:7, marginRight:1}} inactiveDotOpacity={1}  inactiveDotScale={1} dotContainerStyle={{marginRight:"1%"}} />
                </View>
                    <View style={{marginBottom:5}}>
                        <Text style={{...globalStyles.h5, marginLeft:"4%", marginBottom:"2%"}}>Conhecer Locais</Text>
                        <View style={{alignItems:'center'}}>
                    </View>
                </View>
            </View>)
            }
            renderItem = {renderItem}
            />
        </View>
    );} else{
        return(
            <Loading />
        )
    }
}



const styles = StyleSheet.create({
    container:{
        flex:1,
        width:"100%",
        height:"100%"
    },
    highlightStyle:{
        maxWidth:"93.6%",
        borderRadius:30,
        marginLeft:"4%"
    }
})