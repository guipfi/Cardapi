import React, {useEffect, useState} from 'react';
import {View, Text,StyleSheet,ScrollView,Image,Platform} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {firebase} from '../utils/firebase';
import * as ImagePicker from 'expo-image-picker';

import {useSelector, useDispatch} from 'react-redux';
import {loginUser,guestUser} from '../actions/userActions';

// Estilo Global
import {globalStyles} from '../styles/global';
import { TouchableOpacity } from 'react-native-gesture-handler';



export default function Profile({navigation}){
    const [user,setUser] = useState(firebase.auth().currentUser)
    const [image,setImage] = useState(null)
    const userData = useSelector((state)=>state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        if(user) {
        firebase.storage().ref(user.photoURL).getDownloadURL().then((url) =>{
            setImage(url);
        })}
    }, [userData]);
    const pickImage = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
            if (status !== 'granted') {
              alert('Nos perdoe, mas só poderemos fazer o upload da foto com a sua permissão');
            }
        }
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
    
        if (!result.cancelled) {
          setImage(result.uri);

            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = function() {
                resolve(xhr.response);
                };
                xhr.onerror = function(e) {
                reject(new TypeError('Network request failed'));
                };
                xhr.responseType = 'blob';
                xhr.open('GET', result.uri, true);
                xhr.send(null);
            });
            
            if(userData.photoURL == '' || userData.photoURL== 'default_profile.png'){
                firebase.auth().currentUser.updateProfile({
                    ...user,
                    photoURL:userData.id
                }).then(() =>{
                    dispatch(loginUser({...userData,photoURL:userData.id}));
                })
            }
            
            const upload = await firebase.storage().ref(userData.id).put(blob)

            blob.close()
    }
      };

    
    const toData = () => {
        navigation.navigate('Meus Dados')
    }

    const toAbout = () => {
        navigation.navigate('Sobre nós')
    }
    
    const toFavorite = () =>{
        navigation.navigate('Restaurantes Favoritos')
    }

    useEffect(() =>{
        if(user == null){
            return navigation.replace('Login')
        }
    })

    if(user){
    return(
        <ScrollView>
        <View style={{flex:1}}>
            <View style={{marginLeft:"5%", marginTop:"4.8%"}}>
                <View style={{flexDirection:'row' }}>
                    <TouchableOpacity onPress={pickImage}>
                       {image && <Image source={{ uri: image }} style={{borderWidth:1, width:77,height:77 ,borderColor:'black',borderRadius:77/2}}/>}
                    </TouchableOpacity>
                    <View style={{flex:1}}>
                        <View style={{flex:1,flexDirection:'row',marginBottom:"4.375%", justifyContent:'space-between'}}>
                            <Text style={{...globalStyles.sub1, marginLeft:"4%"}}>{userData && userData['name']}</Text>
                                <Text style={{...globalStyles.body3, marginRight:"4%"}}>Ver mais</Text>
                            </View>
                        <View style={{marginLeft:"4%"}}>
                            <Image source={require('../assets/images/progresso.png')} style={{flex:1, resizeMode:'contain', maxWidth:"93%"}}/>
                            <Text style={globalStyles.body4}>Total de Conquistas: 9</Text>
                            <Text style={globalStyles.body4}>Restaurantes Frequentados</Text>
                        </View>
                    </View>
                </View>
                <View>

                    <View style={{flexDirection:'row', marginTop:"4.3%"}}>
                        <Image style={{marginRight:"1%"}} source={require('../assets/icons/fork.png')} />
                        <Text style={globalStyles.body3}>1020 Cardapoints disponíveis</Text>
                    </View>
                    <View style={{flexDirection:'row', marginTop:"1%"}}>
                        <MaterialCommunityIcons style={{marginRight:"1%"}} name="ticket-percent" size={16} color="black" />
                        <Text style={globalStyles.body3}>3 cupons disponíveis</Text>
                    </View>
                    <Text style={{...globalStyles.body4, marginTop:"2.03%"}}>Utilizando os cupons você já economizou: <Text style={{color:"#009922",...globalStyles.body1}}>R$ 143,90</Text></Text>
                </View>
            </View>
            <View style={styles.menuContainer}>
                <View style={{height:59,justifyContent:"center",alignItems:"center"}}>
                    <TouchableOpacity onPress={toData}>
                        <Text style={globalStyles.body1}>Meus Dados</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.OptionMenu}>
                    <Text style={globalStyles.body1}>Conquistas e Cupons</Text>
                </View>
                <View style={styles.OptionMenu}>
                    <TouchableOpacity onPress={toFavorite}>
                        <Text style={globalStyles.body1}>Meus Restaurantes Favoritos</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.OptionMenu}>
                    <Text style={globalStyles.body1}>Formas de Pagamento</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Meu Cardápio')}>
                <View style={styles.OptionMenu}>
                    <Text style={globalStyles.body1}>Ajuda</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={toAbout}>
                    <View style={styles.OptionMenu}>
                        <Text style={globalStyles.body1}>Quem Somos</Text>
                    </View>
                </TouchableOpacity>
                
                <View style={{alignItems:"center", marginTop:"9%"}}>
                <TouchableOpacity onPress={() => {firebase.auth().signOut().then(() =>{
                    dispatch(guestUser())
                }).then(() =>{
                    navigation.replace('Login');
                    dispatch({type: 'LOGOUT'});
                })}}>
                    <Text style={{...globalStyles.body1, color:"#8C0A07"}}>Sair</Text>
                </TouchableOpacity>
                </View>
            </View>
        </View>
        </ScrollView>
   
    );} else{
        return(
            <View></View>
        )
    }
}

const styles = StyleSheet.create({
    menuContainer:{
        marginTop:"2.6%",
        borderTopLeftRadius:50,
        borderTopRightRadius:50,
        width:"100%",
        flex:1,
        marginBottom:90,
        borderColor:"#E5E5E5",
        borderBottomWidth:0,
        borderWidth:1
    },
    OptionMenu:{
        borderTopColor:"#E5E5E5",
        borderTopWidth:1,
        height:59,
        alignItems:'center',
        justifyContent:'center',
        
    }
})