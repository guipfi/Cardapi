import React, {useState} from 'react';
import {View, Text,StyleSheet,ScrollView,Image, KeyboardAvoidingView,TextInput} from 'react-native';
import InputNormal from '../shared/InputNormal';
import {TouchableOpacity } from 'react-native-gesture-handler';
import { globalStyles } from '../styles/global';
import { MaterialIcons } from '@expo/vector-icons';
import {Formik} from 'formik';
import * as yup from 'yup';
import {firebase} from '../utils/firebase'
import {useSelector,useDispatch} from 'react-redux';


import {updateBebidas} from '../actions/userActions';
import Loading from '../shared/Loading'
import PopUpMsg from '../shared/PopUpMsg';
import * as ImagePicker from 'expo-image-picker';

export default function NewDrink({navigation}){
    const restaurant = useSelector(state => state.user);
    const myRef = firebase.database().ref("restaurant/"+restaurant.id+"/cardapio/bebidas").push();
    const key = myRef.key
    const dispatch = useDispatch()
    const [isLoading, setLoading] = useState(false)
    const [image, setImage] = useState("default_profile.png")
    const [modal,setModal] = useState(false);

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
        }
      };
      
      const UserSchema  = yup.object({
          name: yup.string().required('Digite um nome para o sua bebida').min(2,'Digite um nome maior'),
          desc: yup.string().required('Digite uma descrição para o sua bebida').min(5, "a bebida deve ter uma descrição de no mínimo 5 caracteres."),   
          price: yup.number().required('A bebida deve possuir um preço')
        })
        
        return(
            <ScrollView>
                    <PopUpMsg message="A sua nova bebida foi adicionada com sucesso!" onClosed={()=>navigation.navigate('Meu Cardápio')} isOk={true} isOpen={modal}/>    
            <View style={{backgroundColor:'white', marginBottom:10,height:640}}>
                <View style={styles.containerForms}>
                    <Formik
                        initialValues={{name:'',desc:'', price:'', img:''}}
                        validationSchema={UserSchema}
                        onSubmit={async (values) =>{
                            setLoading(true)
                            console.log("aqui")
                            dispatch(updateBebidas(key))
                            const object = {
                                "nome":values.name,
                                "descricao":values.desc,
                                "preco":values.price,
                                "img":image =="default_profile.png" ? image:restaurant.id +"/"+key
                            }    
                            myRef.update(object).then(async () => {
                                if(image != "default_profile.png"){
                                    const blob = await new Promise((resolve, reject) => {
                                        const xhr = new XMLHttpRequest();
                                        xhr.onload = function() {
                                        resolve(xhr.response);
                                        };
                                        xhr.onerror = function(e) {
                                        console.log(e);
                                        reject(new TypeError('Network request failed'));
                                        };
                                        xhr.responseType = 'blob';
                                        xhr.open('GET', image, true);
                                        xhr.send(null);
                                    });
                            
                                    console.log(key)
                            
                                    const upload = await firebase.storage().ref(object['img']).put(blob)
                            
                                    blob.close()
                                }
                            }).then(() =>{
                                setModal(true)
                            })

                        }}
                    >
                    {(props) =>{
                        if(!isLoading){
                            return(
                                <KeyboardAvoidingView behavior='height'>
                                <InputNormal placeholder="(Insira aqui o nome da sua bebida)" label="Nome da bebida" onChangeText={props.handleChange('name')} value={props.values.name} />
                                <Text style={styles.errorStyle}>{props.errors.name}</Text>  
    
                                <View style={{...styles.inputLabel}}>
                                <Text style={{...globalStyles.legenda2, ...globalStyles.preto2, marginTop:"4%"}}>Descrição</Text>
                                <View style={styles.passwordEye}>
                                    <TextInput 
                                    multiline={true}
                                    style={{marginBottom:"3%", ...globalStyles.body1, flex:1}}
                                    placeholder="(Digite a descrição da bebida)"
                                    onChangeText= {props.handleChange('desc')} 
                                    value={props.values.desc}
                                    />
                                </View>
                            </View>
                            <Text style={styles.errorStyle}>{props.errors.desc}</Text>  
    
                            <InputNormal placeholder="(Digite o preço)" label="Preço" keyboardType='numeric' onChangeText={props.handleChange('price')} value={props.values.price} />
                            <Text style={styles.errorStyle}>{props.errors.price}</Text>  
                                
                                <View style={{marginTop:"9.9%", alignItems:'center'}}>
                                       {image && <Image source={{ uri: image }} style={{borderWidth:1,width:100,height:100 ,marginBottom:10,borderColor:'black'}}/>}
                                    <TouchableOpacity onPress={pickImage} style={{flexDirection:'row', borderWidth:1, borderColor:"#A60400", borderRadius:5, justifyContent:'center', alignItems:'center', alignContent:'center',height:40,minWidth:"89%"}}>
                                        <MaterialIcons name="camera-alt" size={20} color="#A60400" />
                                        <Text style={{color:'#A60400', marginLeft:"3%", ...globalStyles.body1}}>Adicione Imagem</Text>
                                    </TouchableOpacity>
                                </View>
    
                                <View style={{alignItems:"center", marginTop: 20}}>
                                    <TouchableOpacity style={globalStyles.mediumButtonStyle} onPress={props.handleSubmit}>
                                        <Text style={{color:"#FAFAFA",...globalStyles.body1}}>Adicionar</Text>
                                    </TouchableOpacity>
                                </View>
    
                            </KeyboardAvoidingView>
                            )
                        } else{
                            return(
                                <View style={{width:360, height:640}}>
                                <Loading />
                                </View>
                            )    
                        }

                        }
                    }
                    </Formik>
                </View>
            </View>
        </ScrollView>
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
    errorStyle:{
        ...globalStyles.legenda1,
        color: "#A60400"
    }

});