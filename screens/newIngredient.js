import React from 'react';
import {View, Text,StyleSheet,ScrollView,Image, KeyboardAvoidingView,TextInput} from 'react-native';
import InputNormal from '../shared/InputNormal';
import {TouchableOpacity } from 'react-native-gesture-handler';
import { globalStyles } from '../styles/global';
import { MaterialIcons } from '@expo/vector-icons';
import {Formik} from 'formik';
import * as yup from 'yup';


export default function NewIngredient(){
    const UserSchema  = yup.object({
        name: yup.string().required('Digite um nome válido').min(2,'Digite um nome maior'),
        desc: yup.string().required('Digite um telefone válido'),
        price: yup.string().oneOf([yup.ref('newPassword'),null], "As senhas devem ser iguais!"),
    })

    return(
            <View style={{backgroundColor:'white'}}>
                <View style={styles.containerForms}>
                    <Formik
                        initialValues={{name:'', price:''}}
                        validationSchema={UserSchema}
                        onSubmit={(values) =>{}}
                    >
                    {(props) =>(
                        <KeyboardAvoidingView behavior='height'>
                            <InputNormal placeholder="(Insira aqui o nome do acompanhamento)" label="Nome do Acompanhamento" onChangeText={props.handleChange('name')} value={props.values.name} />
                            <InputNormal placeholder="(Digite o preço)" label="Preço" keyboardType='numeric' onChangeText={props.handleChange('price')} value={props.values.price} />
                            <View style={{alignItems:"center", marginTop:"72.9%"}}>
                                <TouchableOpacity style={globalStyles.mediumButtonStyle} onPress={props.handleSubmit}>
                                    <Text style={{color:"#FAFAFA"}}>Adicionar</Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                        )    
                    }
                    </Formik>
                </View>
            </View>
    );
}

const styles = StyleSheet.create({
    containerForms:{
        marginTop:"6%", 
        backgroundColor:"white",
        borderRadius:16,
        alignItems:'center',
        marginBottom:"20%",
        width:"100%",
        height:"100%"
    },
    inputLabel:{
        paddingLeft:"5%",
        marginTop:"3.125%",
        borderRadius:8,
        minWidth:"88%",
        height:150,
        backgroundColor:"#E5E5E5",
    },
    passwordEye:{
        flexDirection:'row',
        justifyContent:'space-between'
    },

});