import React, {useState,useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Loading from '../shared/Loading'
import {firebase} from '../utils/firebase';

import {useSelector, useDispatch} from 'react-redux';
import {loginUser} from '../actions/userActions';

import Card from '../shared/Card';
// Estilo Global
import {globalStyles} from '../styles/global';

export default function Home({navigation}){
    const dataHighlight = [require('../assets/images/home_card_subway.png'),require('../assets/images/home_mcdonalds.png')];
    const dataCard = [{img:require('../assets/images/home_outback_fachada.png'), key:'1' },{img:require('../assets/images/restaurantes_favoritos_tandoor.png'), key:'2'},{img:require('../assets/images/home_outback_fachada.png'), key:'3'}]
    const [activeSlide,setActive] = useState(0)
    const [isLoading,setLoading] = useState(true)
    const[data,setData] = useState([]); // Lista de Restaurantes
    const [user,setUser] = useState(null); // Informações do Auth
    const dispatch = useDispatch()

    useEffect(() => {
        // Carrega os restaurantes antes de montar o componente
        const refRestaurant = firebase.database().ref('restaurant/');
        const listener =  refRestaurant.once('value', snapshot => {
            const restaurantes = [];
            snapshot.forEach(childSnapshot => {
                const key = childSnapshot.key;
                const data = childSnapshot.val();
                restaurantes.push({id: key, ...data });
            });
            setData(restaurantes)
        });
        setLoading(false)
    }, []);

    // Fica ouvindo qualquer tipo de alteração no Firebase Authorization
    firebase.auth().onAuthStateChanged(function(userListener) {
        if (userListener) {
            setUser(firebase.auth().currentUser);
            if(user != null){
                const realtime = []
                const refUser = firebase.database().ref('users/'+user.uid);
                const listener = refUser.once('value', snapshot =>{
                    snapshot.forEach(childSnapshot => {
                        const key = childSnapshot.key;
                        const data = childSnapshot.val();
                        realtime.push({id: key, ...data });
                    });
       
                    const object = {
                        'id': user.uid,
                        'email':user.email,
                        'photoURL':user.photoURL,
                        'name':realtime[0].name,
                        'cpf':realtime[0].cpf,
                        'phone':realtime[0].phone,
                        'favorite': realtime[0].favorite,
                        comanda: realtime[0].comanda
                    }
                    // Adiciona os dados do usuário logado para o estado do Redux
                    dispatch(loginUser(object))
                })
            }
        } else {
          // No user is signed in.
        }
      });
    
    const renderItem = ({item}) =>{
        return(
            <TouchableOpacity onPress={() => navigation.navigate('PageStack')}>
                <Card name={item.profile.name} type={item.profile.type} id={item.id} img = {item.profile.img} wifi = {item.profile.wifi} estacionameto = {item.profile.estacionameto} 
                music = {item.profile.music} acessible ={item.profile.acessible}  user = {user}/>
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
        <View style={{marginBottom:"20%", backgroundColor:"white"}}>
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