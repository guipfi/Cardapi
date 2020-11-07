import React, {useState, useEffect} from 'react';
import {View, Text,StyleSheet,ScrollView,Image,KeyboardAvoidingView, TextInput} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {firebase} from '../utils/firebase';

// Estilo Global
import {globalStyles} from '../styles/global';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Formik} from 'formik';
import * as yup from 'yup';


const UserSchema  = yup.object({
    name: yup.string().required('Digite um nome válido').min(2,'Digite um nome maior'),
    cpf: yup.string().min(11,'O cpf deve ter 11 números').max(11,'O cpf deve ter 11 números'),
    phone: yup.string().required('Digite um telefone válido'),
    newPasswordConfirm: yup.string().oneOf([yup.ref('newPassowrd'),null], "As senhas devem ser iguais!"),
})

export default function MyData({navigation}){
    const user = firebase.auth().currentUser
    const [userData,setUserData] = useState('')
    const [isLoading, setLoading] = useState(true)
    const [hidePass, setHidePass] = useState(true);
    const [hidePassConfirm, setHidePassConfirm] = useState(true);
    const [hideOldPass, setHideOldPass] = useState(true);
    const [errorMsg, setError] = useState(''); 

    useEffect(() => {
        const ref = firebase.database().ref('users/'+user.uid);
        const listener = ref.on('value', snapshot => {
            const fetchedTasks = [];
            snapshot.forEach(childSnapshot => {
                const key = childSnapshot.key;
                const data = childSnapshot.val();
                fetchedTasks.push({ id: key, ...data });
            });
            setUserData(fetchedTasks);
        });
        return () =>{ 
            ref.off('value', listener);
            setLoading(false)
        }
    }, [userData]);


    console.log(userData)

    if(!isLoading){
    return(
        <ScrollView>
            <View style={styles.containerForms}>     
            <Formik
                initialValues={{name: user.displayName, cpf:userData[0].cpf, phone:userData[0].phone, email:user.email, newPassword:'', newPasswordConfirm:'', oldPassword:''}}
                validationSchema={UserSchema}
                onSubmit={ async (values) => {
                    
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

                        <View style={styles.passwordEye}>
                            <TextInput
                                style={{flex:1}}
                                placeholder="CPF"
                                keyboardType = 'numeric'
                                editable={false}
                                onChangeText={props.handleChange('cpf')}
                                value={props.values.cpf} />
                            <Text style={styles.errorStyle}>{props.errors.cpf}</Text> 
                            <MaterialIcons name="lock" size={24} color="black" style={{padding:10}} /> 
                        </View>  

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
                                placeholder="(Digite uma nova senha)"
                                secureTextEntry={hidePass}
                                onChangeText={props.handleChange('newPassword')}
                                value={props.values.newPassword} />
                                <TouchableOpacity onPress={() => setHidePass(!hidePass)}>
                                    <MaterialIcons name='remove-red-eye' size={24} color="black" style={{padding:10}} />
                                </TouchableOpacity>
                        </View>  

                        <View style={styles.passwordEye}>
                            <TextInput
                                style={{flex:1}}
                                placeholder="(Digite uma nova senha)"
                                secureTextEntry={hidePassConfirm}
                                onChangeText={props.handleChange('newPasswordConfirm')}
                                value={props.values.newPasswordConfirm} />
                                <TouchableOpacity onPress={() => setHidePassConfirm(!hidePassConfirm)}>
                                    <MaterialIcons name='remove-red-eye' size={24} color="black" style={{padding:10}} />
                                </TouchableOpacity>
                        </View>
                        <Text style={styles.errorStyle}>{props.errors.passwordConfirm}</Text>     

                        <View style={styles.passwordEye}>
                            <TextInput
                                style={{flex:1}}
                                placeholder="Senha Atual"
                                secureTextEntry={hideOldPass}
                                onChangeText={props.handleChange('oldPassword')}
                                value={props.values.oldPassword} />
                                <TouchableOpacity onPress={() => setHideOldPass(!hideOldPass)}>
                                    <MaterialIcons name='remove-red-eye' size={24} color="black" style={{padding:10}} />
                                </TouchableOpacity>
                        </View>
                        <Text style={styles.errorStyle}>{props.errors.passwordConfirm}</Text>       


                        <View style={{alignItems:"center"}}>
                            <TouchableOpacity style={globalStyles.mediumButtonStyle} onPress={props.handleSubmit}>
                                <Text style={{color:"#FAFAFA"}}>Alterar</Text>
                            </TouchableOpacity>
                        <Text style={{...globalStyles.legenda1, color: "#A60400"}}>{errorMsg}</Text>

                            <TouchableOpacity>
                            <View style={{flexDirection:"row"}}>
                                <Text style={{...globalStyles.body3, marginTop:"14.06%",color:"#A60400"}}>Excluir Conta</Text>
                            </View>
                            </TouchableOpacity>

                        </View>
                    </KeyboardAvoidingView>
                )}
            </Formik>
        </View> 
    </ScrollView>
    );} else{
        return(
            <View>
                <Text>Carregando...</Text>
            </View>
        )
    }
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
        marginBottom:"20%"
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