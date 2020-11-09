import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet,ScrollView, KeyboardAvoidingView, CheckBox, Alert, TextInput} from 'react-native';
import {firebase} from '../utils/firebase';
import Loading from '../shared/Loading';
import PopUpMsg from '../shared/PopUpMsg';




// Estilo Global
import {globalStyles} from '../styles/global';
import InputNormal from '../shared/InputNormal';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Formik, Field} from 'formik';
import * as yup from 'yup';


const UserSchema  = yup.object({
    name: yup.string().required('Digite um nome válido').min(2,'Digite um nome maior'),
    phone: yup.string().required('Digite um telefone válido'),
    address: yup.string().required('Digite um endereço válido').min(2,'Digite um endereço maior'),
    newPasswordConfirm: yup.string().oneOf([yup.ref('newPassword'),null], "As senhas devem ser iguais!"),
    bio: yup.string().required('Digite um texto válido para sua biografia').min(2,'Dê mais informações a biografia'),
})

export default function RestaurantMyData({navigation}) {
    const user = firebase.auth().currentUser
    const [modal,setModal] = useState(false)
    const [isDelete,setDelete] = useState(false);
    const [userData,setUserData] = useState('')
    const [isLoading, setLoading] = useState(true)
    const [hidePass, setHidePass] = useState(true);
    const [hidePassConfirm, setHidePassConfirm] = useState(true);
    const [hideOldPass, setHideOldPass] = useState(true);
    const [errorMsg, setError] = useState(''); 
    const [isAcessible, setAcessible] = useState(false);
    const [isEstacionamento, setEstacionamento] = useState(false);
    const [isMusic, setMusic] = useState(false);
    const [isWifi, setWifi] = useState(false);


    const  deleteUser = () =>{
        user.delete().then(
            firebase.database().ref('restaurant/'+user.uid).remove().then(() =>{
                navigation.navigate('Login')
                Alert.alert('Usuário Excluído', 'Sua conta foi excluída')
            })
        )
    }

    useEffect(() => {
        if(isDelete){
            deleteUser()
            return;
        }
        const ref = firebase.database().ref('restaurant/'+user.uid);
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
                        <PopUpMsg message="Seus dados foram atualizados com sucesso!" onClosed={()=>navigation.navigate('Perfil do Restaurante')} isOk={true} isOpen={modal}/>
            <View style={{width:'100%',height:"100%"}}>
            <View style={styles.containerForms}>     
            <Formik
                initialValues={{name: user.displayName, 
                                cnpj:userData[0].cnpj, 
                                phone:userData[0].phone, 
                                email:user.email, 
                                newPassword:'', 
                                newPasswordConfirm:'', 
                                oldPassword:'',
                                acessible: userData[0].acessible,
                                estacionamento: userData[0].estacionamento,
                                endereco:userData[0].endereco,
                                music: userData[0].music,
                                wifi: userData[0].wifi,
                                bio:userData[0].bio}
                            }

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
                                
                                try{
                                firebase.database().ref("/restaurant/"+user.uid+"/profile/").set({
                                    'name': values.name,
                                    'cnpj':values.cnpj,
                                    'endereco':values.endereco,
                                    'phone': values.phone,
                                    'bio':values.bio,
                                    'wifi':isWifi,
                                    'music':isMusic,
                                    'estacionamento':isEstacionamento,
                                    'acessible':isAcessible
                                }).then(()=>{
                                    user.updateEmail(values.email)
                                    setModal(true)
                                })} catch(e){
                                    console.log(e)
                                }
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

                        <Text style={{...globalStyles.h6, marginTop: 30}}>Informações</Text>

                        <InputNormal placeholder='Escreva o nome do seu restaurante' label={"Nome"} onChangeText={props.handleChange('name')} value={props.values.name} />
                        <Text style={styles.errorStyle}>{props.errors.name}</Text>  
                        <InputNormal placeholder={userData[0].cnpj} keyboardType='numeric' label='CNPJ' editable={false} iconName="lock" onChangeText={props.handleChange('cnpj')} value={userData[0].cnpj} />
                        <Text style={styles.errorStyle}></Text>  

                        <InputNormal placeholder="Endereço" label="Endereço" onChangeText={props.handleChange('endereco')} value={props.values.endereco} />
                        <Text style={styles.errorStyle}>{props.errors.phone}</Text> 

                        <InputNormal placeholder={userData[0].phone} keyboardType='numeric' label="Telefone" onChangeText={props.handleChange('phone')} value={props.values.phone} />
                        <Text style={styles.errorStyle}>{props.errors.phone}</Text>  
                        
                        <InputNormal label="E-mail"  placeholder="(Insira um e-mail aqui)" onChangeText={props.handleChange('email')} value={props.values.email} />
                        <Text style={styles.errorStyle}>{props.errors.passwordConfirm}</Text>  

                        <InputNormal placeholder='(Digite uma nova senha)' label='Nova Senha' secureTextEntry={hidePass}  iconName="remove-red-eye" onPress={() => setHidePass(!hidePass)} onChangeText={props.handleChange('newPassword')} value={props.values.newPassword} />
                        <Text style={styles.errorStyle}>{props.errors.newPassword}</Text>  

                        <InputNormal placeholder='(Confirme a nova senha)' label='Confirme a Nova Senha' secureTextEntry={hidePassConfirm}  iconName="remove-red-eye" onPress={() => setHidePassConfirm(!hidePassConfirm)} onChangeText={props.handleChange('newPasswordConfirm')} value={props.values.newPasswordConfirm} />
                        <Text style={styles.errorStyle}>{props.errors.newPasswordConfirm}</Text>     

                        <InputNormal placeholder='(Digite sua senha atual)' label='Senha Atual' secureTextEntry={hideOldPass}  iconName="remove-red-eye" onPress={() => setHideOldPass(!hideOldPass)} onChangeText={props.handleChange('oldPassword')} value={props.values.oldPassword} />                    
                        <Text style={styles.errorStyle}>{errorMsg}</Text>  
                        
                        <View style={{borderTopWidth: 1, paddingTop: 1, marginTop: 5, marginBottom: 10}}>
                            <Text style={{...globalStyles.h6, marginTop: 20}}>Serviços</Text>
                        </View>
                        
                        <View style={{flexDirection: 'row', marginBottom: 10, alignItems: "center"}}>
                        <CheckBox 
                            value={isAcessible}
                            onValueChange={setAcessible}
                            style={{alignSelf: "center"}}
                        />
                            <Text>Acessibilidade</Text>
                        </View>

                        <View style={{flexDirection: 'row', marginBottom: 10, alignItems: "center"}}>
                            <CheckBox 
                                value={isEstacionamento}
                                onValueChange={setEstacionamento}
                                style={{alignSelf: "center"}}
                            />
                            <Text>Estacionamento</Text>
                        </View>

                        <View style={{flexDirection: 'row', marginBottom: 10, alignItems: "center"}}>
                            <CheckBox 
                                value={isMusic}
                                onValueChange={setMusic}
                                style={{alignSelf: "center"}}
                            />
                            <Text>Música Ao Vivo</Text>
                        </View>

                        <View style={{flexDirection: 'row', marginBottom: 10, alignItems: "center"}}>
                            <CheckBox 
                                value={isWifi}
                                onValueChange={setWifi}
                                style={{alignSelf: "center"}}
                            />
                            <Text>Wi-Fi</Text>
                        </View>                      

                        <View style={{borderTopWidth: 1, paddingTop: 1, marginTop: 5, marginBottom: 10}}>
                            <Text style={{...globalStyles.h6, marginTop: 20}}>Biografia</Text>
                        </View>

                        
                        <View style={styles.inputLabel}>
                            <Text style={{...globalStyles.legenda2, ...globalStyles.preto2, marginTop:"4%"}}>Biografia</Text>
                            <TextInput 
                                style={{marginBottom:"3%", ...globalStyles.body1}}
                                placeholder="(Escreva sua biografia)"
                                onChangeText={props.handleChange('bio')} 
                                value={props.values.bio}
                            />
                        </View>
                        
                        <Text style={styles.errorStyle}>{props.errors.bio}</Text>  


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
    },
    inputLabel:{
        paddingLeft:"5%",
        marginTop:"3.125%",
        borderRadius:8,
        minWidth:"88%",
        height:200,
        backgroundColor:"#E5E5E5",
    }
})