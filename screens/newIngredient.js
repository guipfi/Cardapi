import React, {useState} from 'react';
import {View, Text,StyleSheet,ScrollView,Image, KeyboardAvoidingView,TextInput} from 'react-native';
import InputNormal from '../shared/InputNormal';
import {TouchableOpacity } from 'react-native-gesture-handler';
import { globalStyles } from '../styles/global';
import {firebase} from '../utils/firebase'
import {Formik} from 'formik';
import {useSelector} from 'react-redux';
import * as yup from 'yup';

import Loading from '../shared/Loading'
import PopUpMsg from '../shared/PopUpMsg';


export default function NewIngredient({navigation}){
    const [modal,setModal] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const restaurant = useSelector(state => state.user);
    const myRef = firebase.database().ref("restaurant/"+restaurant.id+"/cardapio/acompanhamentos").push();
    const key = myRef.key

    const UserSchema  = yup.object({
        name: yup.string().required('Digite um nome válido').min(2,'Digite um nome maior'),
        price: yup.number().required("O acompanhamento deve ter um preço.")
    })

    return(
            <View style={{backgroundColor:'white', marginBottom:10,height:640}}>
                <View style={styles.containerForms}>
                    <Formik
                        initialValues={{name:'', price:''}}
                        validationSchema={UserSchema}
                        onSubmit={async (values) =>{
                            setLoading(true)
                            const object = {
                                "nome":values.name,
                                "preco":values.price,
                            }
                            
                            myRef.update(object).then(() =>{
                                setModal(true)
                            })

                        }}
                    >
                    {(props) =>{
                        if(!isLoading){
                            return(
                                <KeyboardAvoidingView behavior='height'>
                                    <InputNormal placeholder="(Insira aqui o nome do acompanhamento)" label="Nome do Acompanhamento" onChangeText={props.handleChange('name')} value={props.values.name} />
                                    <InputNormal placeholder="(Digite o preço)" label="Preço" keyboardType='numeric' onChangeText={props.handleChange('price')} value={props.values.price} />
                                    <View style={{alignItems:"center", marginTop:"72.9%"}}>
                                        <TouchableOpacity style={globalStyles.mediumButtonStyle} onPress={props.handleSubmit}>
                                            <Text style={{color:"#FAFAFA", ...globalStyles.body1}}>Adicionar</Text>
                                        </TouchableOpacity>
                                    </View>
                                </KeyboardAvoidingView>
                            )
                        } else{
                            return(
                                <View style={{width:360, height:640}}>
                                <PopUpMsg message="O seu novo acompanhamento foi adicionado com sucesso!" onClosed={()=>navigation.navigate('Meu Cardápio')} isOk={true} isOpen={modal}/>    
                                <Loading />
                                </View>
                            )    
                        }
                        }    
                    }
                    </Formik>
                </View>
            </View>
    );
}

const styles = StyleSheet.create({
    containerForms:{
        backgroundColor:"white",
        borderRadius:16,
        alignItems:'center',
        marginBottom:"20%",
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