import React, {useState, useEffect} from 'react';
import {View, Text,StyleSheet,ScrollView, KeyboardAvoidingView, Alert} from 'react-native';
import {firebase} from '../utils/firebase';
import Loading from '../shared/Loading'



// Estilo Global
import {globalStyles} from '../styles/global';
import InputNormal from '../shared/InputNormal';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Formik} from 'formik';
import * as yup from 'yup';
import PopUpMsg from '../shared/PopUpMsg';


const UserSchema  = yup.object({
    name: yup.string().required('Digite um nome válido').min(2,'Digite um nome maior'),
    phone: yup.string().required('Digite um telefone válido'),
    newPasswordConfirm: yup.string().oneOf([yup.ref('newPassword'),null], "As senhas devem ser iguais!"),
})

export default function MyData({navigation}){
    const user = firebase.auth().currentUser
    const [modal,setModal] = useState(false);
    const [isDelete,setDelete] = useState(false);
    const [userData,setUserData] = useState('')
    const [isLoading, setLoading] = useState(true)
    const [hidePass, setHidePass] = useState(true);
    const [hidePassConfirm, setHidePassConfirm] = useState(true);
    const [hideOldPass, setHideOldPass] = useState(true);
    const [errorMsg, setError] = useState(''); 
    
    const  deleteUser = () =>{
        user.delete().then(
            firebase.database().ref('users/'+user.uid).remove().then(() =>{
                navigation.navigate('Login')
                Alert.alert('Usuário Excluído','Sua conta foi excluída')
            })
        )
    }

    useEffect(() => {
        if(isDelete){
            deleteUser()
            return;
        }
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

    if(!isLoading){
    return(
        <ScrollView>
            <PopUpMsg message="Seus dados foram atualizados com sucesso!" onClosed={()=>navigation.navigate('MeuPerfil')} isOk={true} isOpen={modal}/>
            <View style={{width:'100%',height:"100%"}}>
            <View style={styles.containerForms}>     
            <Formik
                initialValues={{name: user.displayName, cpf:'', phone:userData[0].phone, email:user.email, newPassword:'', newPasswordConfirm:'', oldPassword:''}}
                validationSchema={UserSchema}
                onSubmit={ async (values) => {
                    var credential = firebase.auth.EmailAuthProvider.credential(
                        user.email,
                        values.oldPassword
                    )
                    try{
                        await user.reauthenticateWithCredential(credential).then(() =>{
                            if(values.newPassword!='')
                                user.updatePassword(values.newPassword)

                                user.updateProfile({
                                    ...user,
                                    displayName: values.name
                                })

                                firebase.database().ref("/users/"+user.uid+"/profile/").set({
                                    'name': values.name,
                                    'phone': values.phone,
                                    'cpf': userData[0].cpf
                                })
                                
                                user.updateEmail(values.email).then()
                                setModal(true)
                        })
                    } catch(e){
                        console.log(e.code)
                        if(e.code == "auth/wrong-password"){
                            setError("Por favor insira a senha correta para atualizar seus dados")
                        }
                    }
 
                }}
            >
                {(props) => (
                    <KeyboardAvoidingView
                    behavior='height'>
                        <InputNormal placeholder="(Insira seu nome aqui)" label="Nome" onChangeText={props.handleChange('name')} value={props.values.name} />
                        <Text style={styles.errorStyle}>{props.errors.name}</Text>  
                        <InputNormal placeholder={userData[0].cpf} keyboardType='numeric' label='CPF' editable={false} iconName="lock" onChangeText={props.handleChange('cpf')} value={props.values.cpf} />
                        <Text style={styles.errorStyle}></Text>  

                        <InputNormal placeholder="Telefone" keyboardType='numeric' label="Telefone" onChangeText={props.handleChange('phone')} value={props.values.phone} />
                        <Text style={styles.errorStyle}>{props.errors.phone}</Text>  
                        
                        <InputNormal label="E-mail"  placeholder="(Insira um e-mail aqui)" onChangeText={props.handleChange('email')} value={props.values.email} />
                        <Text style={styles.errorStyle}>{props.errors.passwordConfirm}</Text>  

                        <InputNormal placeholder='(Digite uma nova senha)' label='Nova Senha' secureTextEntry={hidePass}  iconName="remove-red-eye" onPress={() => setHidePass(!hidePass)} onChangeText={props.handleChange('newPassword')} value={props.values.newPassword} />
                        <Text style={styles.errorStyle}>{props.errors.newPassword}</Text>  

                        <InputNormal placeholder='(Confirme a nova senha)' label='Confirme a Nova Senha' secureTextEntry={hidePassConfirm}  iconName="remove-red-eye" onPress={() => setHidePassConfirm(!hidePassConfirm)} onChangeText={props.handleChange('newPasswordConfirm')} value={props.values.newPasswordConfirm} />
                        <Text style={styles.errorStyle}>{props.errors.newPasswordConfirm}</Text>     

                        <InputNormal placeholder='(Digite sua senha atual)' label='Senha Atual' secureTextEntry={hideOldPass}  iconName="remove-red-eye" onPress={() => setHideOldPass(!hideOldPass)} onChangeText={props.handleChange('oldPassword')} value={props.values.oldPassword} />
                    
                        <Text style={styles.errorStyle}>{errorMsg}</Text>  

                        <View style={{alignItems:"center"}}>
                            <TouchableOpacity style={globalStyles.mediumButtonStyle} onPress={props.handleSubmit}>
                                <Text style={{color:"#FAFAFA"}}>Alterar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => setDelete(true)}>
                            <View style={{flexDirection:"row"}}>
                                <Text style={{...globalStyles.body3, marginTop:"14.06%",color:"#A60400"}}>Excluir Conta</Text>
                            </View>
                            </TouchableOpacity>

                        </View>
                    </KeyboardAvoidingView>
                )}
            </Formik>
        </View> 
        </View>
    </ScrollView>
    
    );} else{
        return(
            <Loading />
        )
    }
}


const styles = StyleSheet.create({
    containerForms:{
        backgroundColor:"white",
        borderRadius:16,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:"20%"
    },
    errorStyle:{
        ...globalStyles.body4,
        color: "#A60400",
        maxWidth:"88%",
    }
})