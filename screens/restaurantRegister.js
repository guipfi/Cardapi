import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert} from 'react-native';
import {globalStyles} from '../styles/global';
import {Formik} from 'formik';
import { MaterialIcons } from '@expo/vector-icons'; 
import {firebase} from '../utils/firebase';
import {Picker} from '@react-native-picker/picker';
import * as yup from 'yup';

const UserSchema  = yup.object({
    name: yup.string().required('Digite um nome válido').min(2,'Digite um nome maior'),
    cnpj: yup.string().min(14,'O cnpj deve ter 14 números').max(14,'O cnpj deve ter 14 números'),
    phone: yup.string().required('Digite um telefone válido'),
    passwordConfirm: yup.string().oneOf([yup.ref('password'),null], "As senhas devem ser iguais!"),
})

export default function RestaurantRegister({navigation}) {
    const [errorMsg, setError] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [hidePass, setHidePass] = useState(true);
    const [hidePassConfirm, setHidePassConfirm] = useState(true);

    const LoginUser = () =>{
        navigation.navigate('Login')
    }

    return(
        <View style={styles.containerForms}>     
        <Formik
            initialValues={{name:'', cnpj:'', phone:'', email:'', password:'', passwordConfirm:'', type:''}}
            validationSchema={UserSchema}
            onSubmit={ async (values) => {
                try{
                    await firebase.auth().createUserWithEmailAndPassword(values.email,values.password).then((response) =>{
                        firebase.auth().currentUser.updateProfile({
                            displayName:values.name,
                            photoURL:'default_profile.png'
                        }).then(() =>{
                            firebase.database().ref('restaurant/' + firebase.auth().currentUser.uid + '/profile').set({
                                name:values.name,
                                cnpj:values.cnpj,
                                phone:values.phone,
                                endereco: '',
                                acessible: false,
                                estacionamento: false,
                                music: false,
                                wifi: false,
                                bio: '',
                                img:"default_profile.png",
                                type:values.type
                            })
                            firebase.database().ref('restaurant/'+firebase.auth().currentUser.uid+"/cardapio/").set("")
                        })
                    }).then(() =>{
                        Alert.alert("Seu Cadastro foi um sucesso","Agora você já pode trabalhar com a Cardapi!", [{text:"Entendido",onPress: () => console.log("apertado")}])
                        navigation.replace('Home Restaurante3')
                    })
                } catch(e){
                    console.log(e.code)
                    if(e.code == 'auth/email-already-in-use'){
                        setError('O email inserido já está em uso');
                    } else if(e.code == 'auth/invalid-email'){
                        setError("O email inserido não é válido. Digite um email válido.");
                    } else if(e.code == 'auth/operation-not-allowed'){
                        setError('Seu email ' + values.email + " não é válido.")
                    } else if(e.code == 'auth/weak-password'){
                        setError('Sua senha não é forte o suficiente. Use números e caracteres para criar uma senha forte');
                    }   
                }
            }}
        >
            {(props) => (
                <KeyboardAvoidingView
                behavior='height'>
                    <TextInput 
                        style={{...globalStyles.normalInput, marginTop:"5.468%"}}
                        placeholder="Nome"
                        onChangeText={props.handleChange('name')}
                        value={props.values.name}
                    />
                    <Text style={styles.errorStyle}>{props.errors.name}</Text>  
 
                    <TextInput
                        style={globalStyles.normalInput}
                        placeholder="CNPJ"
                        keyboardType = 'numeric'
                        onChangeText={props.handleChange('cnpj')}
                        value={props.values.cnpj} />
                    <Text style={styles.errorStyle}>{props.errors.cnpj}</Text>  

                    <TextInput
                        style={globalStyles.normalInput}
                        placeholder="Telefone"
                        keyboardType = 'numeric'
                        onChangeText={props.handleChange('phone')}
                        value={props.values.phone} />
                    <Text style={styles.errorStyle}>{props.errors.phone}</Text>  

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

                    <Picker
                        selectedValue={props.values.type}
                        style={{height: 50, width: 300}}
                        onValueChange={props.handleChange('type')}>
                        <Picker.Item label="Selecione uma Categoria" value="" />    
                        <Picker.Item label="Comida Brasileira" value="Brasileira" />
                        <Picker.Item label="Comida Indiana" value="Indiano" />
                        <Picker.Item label="Pizzaria" value="Pizzaria" />
                        <Picker.Item label="Churrascaria" value="Churrascaria" />
                        <Picker.Item label="Sorveteria" value="Sorveteria" />
                    </Picker>
                    <Text style={styles.errorStyle}>{props.errors.passwordConfirm}</Text>        
                    <View style={{alignItems:"center"}}>
                        <TouchableOpacity style={globalStyles.mediumButtonStyle} onPress={props.handleSubmit}>
                            <Text style={{color:"#FAFAFA"}}>Confirmar</Text>
                        </TouchableOpacity>
                    <Text style={{...globalStyles.legenda1, color: "#A60400"}}>{errorMsg}</Text>

                        <TouchableOpacity onPress={LoginUser}>
                        <View style={{flexDirection:"row"}}>
                            <Text style={{...globalStyles.body3, marginTop:"7.06%"}}>Já possui conta? Faça o <Text style={{color:"#A60400", textDecorationLine:" underline"}}>Login</Text></Text>
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
    },
    errorStyle:{
        ...globalStyles.legenda1,
        color: "#A60400"
    }
})