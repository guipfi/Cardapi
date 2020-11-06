import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';

import Card from '../shared/Card';
// import Highlight from '../shared/Highlight'
// Estilo Global
import {globalStyles} from '../styles/global';

export default function Home(){
    const dataHighlight = [require('../assets/images/home_card_subway.png'),require('../assets/images/home_mcdonalds.png')];
    const dataCard = [{img:require('../assets/images/home_outback_fachada.png'), key:'1' },{img:require('../assets/images/restaurantes_favoritos_tandoor.png'), key:'2'},{img:require('../assets/images/home_outback_fachada.png'), key:'3'}]
    const [activeSlide,setActive] = useState(0)

    const renderItem = ({item}) =>{
        return(
            <Card img={item.img} />
        )
    }

    const _renderItem = ({item,index}) =>{
        return(
            <TouchableOpacity>
            < Image style={styles.highlightStyle} source={item} />
            </TouchableOpacity>
        );
    }

    return(
        <View style={{marginBottom:"20%"}}>
            <FlatList
            data={dataCard}
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
    );
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