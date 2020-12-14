import React, {useState,useEffect} from 'react';
import {View, Text,StyleSheet,KeyboardAvoidingView,TextInput} from 'react-native';
import InputNormal from '../shared/InputNormal';
import {TouchableOpacity } from 'react-native-gesture-handler';
import { globalStyles } from '../styles/global';
import {firebase} from '../utils/firebase'

import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';

import {Formik} from 'formik';
import {useSelector} from 'react-redux';
import * as yup from 'yup';

import Loading from '../shared/Loading'
import PopUpMsg from '../shared/PopUpMsg';


export default function NewConquista({navigation}){
    const [modal,setModal] = useState(false)
    const [itens,setItens] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const restaurant = useSelector(state => state.user);

    useEffect(() => {
        let isMounted = true
        if(isMounted){
            setItens([...restaurant.bebidas,...restaurant.pratos,...restaurant.sobremesas])
        }
        return () =>  {isMounted = false}
    }, [itens])

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
      };
    
      const showDatepicker = () => {
        showMode('date');
      };

    const UserSchema  = yup.object({
        name: yup.string().required('Digite um nome de conquista válido').min(2,'Digite um nome maior'),
        desc: yup.number().required("Sua conquista precisa de uma descrição"),
        points: yup.number().required("Sua conquista precisa fornecer pontos").min(1,"Você deve premiar pelo menos 1 Cardapoint").max(100, "100 é o número de Cardapoints que você pode fornecer por conquista"),
        date: yup.date().required("Sua conquista precisa de uma data limite"),
        item: yup.string().required("Sua conquista precisa de um item dependente"),
        quant: yup.number().required("Selecione a quantidade de vezes que o item deve ser consumido").min(1,"A quantidade do item deve ser pelo menos 1.")
    })

    return(
            <View style={{backgroundColor:'white', marginBottom:10,height:640}}>
                <PopUpMsg message="A sua nova conquista foi adicionada com sucesso!" onClosed={()=>navigation.navigate('Conquistas')} isOk={true} isOpen={modal}/>    
                <View style={styles.containerForms}>
                    <Formik
                        initialValues={{name:'', desc:'',points:'', date:'',item:'', quant:''}}
                        validationSchema={UserSchema}
                        onSubmit={async (values) =>{
                            setLoading(true)
                            const object = {
                                "nome":values.name,
                                "descricao":values.desc,
                                "points":values.points,
                                "date": values.date,
                                "item": values.item,
                                "quant": values.quant
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

                                    <InputNormal placeholder="(Insira aqui o nome da conquista)" label="Nome da conquista" onChangeText={props.handleChange('name')} value={props.values.name} />
                                    <Text style={styles.errorStyle}>{props.errors.name}</Text>

                                    <View style={{...styles.inputLabel}}>
                                        <Text style={{...globalStyles.legenda2, ...globalStyles.preto2, marginTop:"4%"}}>Descrição</Text>
                                        <View style={styles.passwordEye}>
                                            <TextInput 
                                            multiline={true}
                                            style={{marginBottom:"3%", ...globalStyles.body1, flex:1}}
                                            placeholder="(Digite a descrição da conquista)"
                                            onChangeText= {props.handleChange('desc')} 
                                            value={props.values.desc}
                                            />
                                        </View>
                                    </View>
                                    <Text style={styles.errorStyle}>{props.errors.desc}</Text>    

                                    <InputNormal placeholder="(Digite o número de cardapoints)" label="Cardapoints" keyboardType='numeric' onChangeText={props.handleChange('points')} value={props.values.points} />
                                    <Text style={styles.errorStyle}>{props.errors.points}</Text>  

                                    <Text styles={{...globalStyles.legenda2}}>Selecione o prato relacionado a conquista</Text>
                                    <Picker
                                    selectedValue={props.values.item}
                                    style={{height: 50, width: 300}}
                                    onValueChange={props.handleChange('item')}>
                                        {
                                        itens.map((value,index)=>{
                                            return(
                                                <Picker.Item key={value} label={value} value={value} />
                                            )

                                        })
                                        }
                                    </Picker>

                                    <InputNormal placeholder="(Insira aqui a quantidade de vezes que ele precisa consumir o item)" label="Quant de itens" onChangeText={props.handleChange('quant')} value={props.values.quant} />
                                    <Text style={styles.errorStyle}>{props.errors.quant}</Text>

                                    <View>
                                        <View style={{alignItems:"center", marginTop:"72.9%"}}>
                                            <TouchableOpacity style={globalStyles.mediumButtonStyle} onPress={showDatepicker}>
                                                <Text style={{color:"#FAFAFA", ...globalStyles.body1}}>Selecione a data limite</Text>
                                            </TouchableOpacity>
                                        </View>
                                        {show && (
                                        <DateTimePicker
                                        testID="dateTimePicker"
                                        value={props.values.date}
                                        mode={mode}
                                        display="default"
                                        onChange={props.handleChange('date')}
                                        />
                                        )}
                                    </View>

                                    <View style={{alignItems:"center", marginTop:"72.9%"}}>
                                        <TouchableOpacity style={globalStyles.mediumButtonStyle} onPress={props.handleSubmit}>
                                            <Text style={{color:"#FAFAFA", ...globalStyles.body1}}>Criar nova Conquista</Text>
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