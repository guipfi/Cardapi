import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import {globalStyles} from '../styles/global';
import {Formik} from 'formik';
import { MaterialIcons } from '@expo/vector-icons'; 


export default function Register({navigation}) {
    const [hidePass, setHidePass] = useState(true);
    const [hidePassConfirm, setHidePassConfirm] = useState(true);

    const LoginUser = () =>{
        navigation.navigate('Login')
    }

    return(
        <View style={styles.containerForms}>     
        <Formik
            initialValues={{name:'', cpf:'', phone:'', email:'', password:'', passwordConfirm:''}}
            onSubmit={(values) => {
            }}
        >
            {(props) => (
                <KeyboardAvoidingView
                behavior='position'>
                    <TextInput 
                        style={{...globalStyles.normalInput, marginTop:"5.468%"}}
                        placeholder="Nome"
                        onChangeText={props.handleChange('name')}
                        value={props.values.name}
                    />
                    <TextInput
                        style={globalStyles.normalInput}
                        placeholder="CPF"
                        keyboardType = 'numeric'
                        onChangeText={props.handleChange('cpf')}
                        value={props.values.cpf} />

                    <TextInput
                        style={globalStyles.normalInput}
                        placeholder="Telefone"
                        keyboardType = 'numeric'
                        onChangeText={props.handleChange('phone')}
                        value={props.values.phone} />

                    <TextInput
                        style={globalStyles.normalInput}
                        placeholder="E-mail"
                        onChangeText={props.handleChange('email')}
                        value={props.values.email} />

                    <View style={styles.passwordEye}>
                        <TextInput
                            style={{flex:1}}
                            placeholder="Senha"
                            secureTextEntry={hidePass}
                            onChangeText={props.handleChange('password')}
                            value={props.values.password} />
                            <TouchableOpacity onPress={() => setHidePass(!hidePass)}>
                                <MaterialIcons name='remove-red-eye' size={24} color="black" style={{padding:10}} />
                            </TouchableOpacity>
                    </View>

                    <View style={styles.passwordEye}>
                        <TextInput
                            style={{flex:1}}
                            placeholder="Confirmar Senha"
                            secureTextEntry={hidePassConfirm}
                            onChangeText={props.handleChange('passwordConfirm')}
                            value={props.values.passwordConfirm} />
                            <TouchableOpacity onPress={() => setHidePassConfirm(!hidePassConfirm)}>
                                <MaterialIcons name='remove-red-eye' size={24} color="black" style={{padding:10}} />
                            </TouchableOpacity>
                    </View>        
                    <View style={{alignItems:"center"}}>
                        <TouchableOpacity style={globalStyles.mediumButtonStyle} onPress={props.handleSubmit}>
                            <Text style={{color:"#FAFAFA"}}>Confirmar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={LoginUser}>
                        <View style={{flexDirection:"row"}}>
                            <Text style={{...globalStyles.body3, marginTop:"14.06%"}}>Já possui conta? Faça o <Text style={{color:"#A60400"}}>Login</Text></Text>
                        </View>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            )}
        </Formik>
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
    passwordEye:{
        paddingLeft:"5%",
        marginTop:"3.125%",
        borderRadius:8,
        minWidth:"88%",
        height:45,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:"#E5E5E5",
    }
})