import React, {useState,useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Alert } from 'react-native';
import {globalStyles} from '../styles/global';
import {Formik} from 'formik';
import { MaterialIcons } from '@expo/vector-icons'; 
import {firebase} from '../utils/firebase';
import Loading from '../shared/Loading';
import Modal from "react-native-modalbox";

import {useSelector, useDispatch} from 'react-redux';
import {loginUser} from '../actions/userActions';

export default function Login({navigation}) {
    const [initializing, setInitializing] = useState(true);
    const [errorMsg, setError] = useState('');
    const [isRestaurant, setRestaurant] = useState(false)
    const [isLoading, setLoading] = useState(false);
    const [user,setUser] = useState(null)
    
    
    const ToRegisterUser = () =>{
        navigation.navigate('Registro')
    }

    const ToRegisterRestaurant = () => {
        navigation.navigate('Cadastro do Restaurante');
    }

    const ToHome = () =>{
        navigation.replace('Nav')
    }

    return(
        <View style={{flex:1}}>
            
            <View style={styles.containerForms}>
            <Modal
            style= {{...styles.modalView}}
            swipeToClose={false}
            position= {"bottom"}
            isOpen={true}
            backdropPressToClose={false}
            backdrop={false}
            onClosed={() => ToHome()}
            >    
                <Formik
                    initialValues={{email:'', password:''}}
                    onSubmit={ async (values) => {
                        try{
                            setLoading(true)
                            setError('');
                            await firebase.auth().signInWithEmailAndPassword(values.email,values.password).then(()=>{
                                const ref = firebase.database().ref('restaurant/'+firebase.auth().currentUser.uid).once('value',(snapshot)=>{
                                    if(snapshot.exists()){
                                        navigation.replace('Perfil do Restaurante')
                                    } else{
                                        navigation.replace('Nav');
                                    }
                            })
                        })} catch (e) {
                            console.log(e.code)
                            if(e.code == 'auth/invalid-email'){
                                setError('Um campo ou mais estão inválidos');
                            } else if(e.code == 'auth/user-disabled'){
                                setError('O usuário com o email: '+ values.email + ' foi desabilitado');
                            } else if(e.code == 'auth/user-not-found'){
                                setError('Não existe nenhum usuário com o email:' + values.email)
                            } else if(e.code == 'auth/wrong-password'){
                                setError('Senha incorreta, tente novamente');
                            }
                        }
                        setLoading(false)
                    }
                }
                >
                    {(props) => {
                        if(!isLoading){
                            return(
                                <View>
                                    <TouchableOpacity onPress={ToHome}>
                                        <MaterialIcons style={{alignSelf:"flex-end", marginTop:"2.34375%",padding:1}} name="close" size={22} color="black" />
                                    </TouchableOpacity>
                                    <Text style={{...globalStyles.h5, marginBottom:"3.125%" ,color:"#740300", alignSelf:"center" }}>Login</Text>
                                    
                                    <TextInput 
                                    style={globalStyles.normalInput}
                                    placeholder="E-mail"
                                    onChangeText={props.handleChange('email')}
                                    value={props.values.email}
                                    />

                                    <TextInput
                                    style={globalStyles.normalInput}
                                    placeholder="Senha"
                                    secureTextEntry={true}
                                    onChangeText={props.handleChange('password')}
                                    value={props.values.password} />

                                    <Text style={{...globalStyles.legenda1, color: "#A60400"}}>{errorMsg}</Text>

                                    <View style={{alignItems:"center"}}>
                                        <TouchableOpacity style={globalStyles.mediumButtonStyle} onPress={props.handleSubmit}>
                                            <Text style={{color:"#FAFAFA"}}>Entrar</Text>
                                        </TouchableOpacity>

                                        <View style={{flexDirection:"row"}}>
                                            <Text>Não possui conta?</Text>
                                            <TouchableOpacity onPress={ToRegisterUser}>
                                                <Text style={{color:"#A60400", marginLeft:"5%", marginBottom:"5%"}}>Cadastre-se</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <TouchableOpacity onPress={ToRegisterRestaurant}>
                                            <Text style={{color:"#A60400"}}>Cadastro de restaurante</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>)
                        } else{
                            return (<Loading />)
                        }
                    }}
                </Formik>
                </Modal>
                <View>

            </View>     
            <Image source={require('../assets/images/login_bonecos.png')} style={{width:"100%", height: '60%'}}/>
  
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,

    },
    containerForms:{
        flex:1,
        alignItems:'center',
        backgroundColor:"white",
        borderRadius:16,
    },
    modalView: {
        height: "50%",
        backgroundColor: globalStyles.branco2.color,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.2,
      }, 
});