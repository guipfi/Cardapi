import React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView} from 'react-native';
import {globalStyles} from '../styles/global';
import {Formik} from 'formik';
import { MaterialIcons } from '@expo/vector-icons'; 


export default function Login({navigation}){
    const ToRegisterUser = () =>{
        navigation.navigate('Registro')
    }

    const ToHome = () =>{
        navigation.navigate('Nav')
    }

    return(
        <View style={{flex:1}}>
            <View style={{flex:1}}>
                <Image source={require('../assets/images/login_bonecos.png')} style={{width:"100%"}}/>
            </View>
            <View style={styles.containerForms}>
                 <KeyboardAvoidingView
                behavior='position'>     
                <Formik
                    initialValues={{email:'', password:''}}
                    onSubmit={(values) => {
                    }}
                >
                    {(props) => (
                        <View>
                            <TouchableOpacity onPress={ToHome}>
                                <MaterialIcons style={{alignSelf:"flex-end", marginTop:"2.34375%"}} name="close" size={22} color="black" />
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

                                <TouchableOpacity onPress={props.handleSubmit}>
                                <Text style={{color:"#A60400"}}>Cadastro de restaurante</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </Formik>
                </KeyboardAvoidingView>
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
    input:{
        minHeight: 45,
        marginTop:"3.125%",
        minWidth:"88%",
        borderRadius:8,
        backgroundColor:"#E5E5E5",
        paddingLeft:"5%"
    },

})