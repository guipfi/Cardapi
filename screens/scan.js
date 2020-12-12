import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView
} from "react-native";
import Modal from "react-native-modalbox";
import { MaterialIcons } from '@expo/vector-icons';
import QRCode from '../shared/QRCode';
import {firebase} from '../utils/firebase';
import {useDispatch, useSelector} from 'react-redux';
import {abrirComanda} from '../actions/comandaActions';

// Estilo Global
import {globalStyles} from '../styles/global';
import { QrCode } from '../assets/icons/icons';

function Scan({navigation}){

  const user = firebase.auth().currentUser;

  useEffect(() => {    
    if (!user) {
      alert("Você precisa estar logado para ter acesso a comanda!");
      navigation.pop();
    }
  },[]);

  const [codComanda, setCodComanda] = useState('');

  const dispatch = useDispatch();

  const submitHandler = (cod=codComanda) => {
    dispatch(abrirComanda(cod, user.uid));
  }

  return (
    
    <Modal
    style= {styles.modalView}
    swipeToClose={false}
    backdropOpacity={0.5}
    position= {"bottom"}
    isOpen={true}
    onClosed={() => navigation.goBack()}
  >
  <ScrollView>
  <View style={{...globalStyles.container}}>
    <View style={{width: '91%', height: 800}}>
      <View style={{marginTop: 15, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{width: '70%', marginTop: 20}}>
          <Text style={{...globalStyles.h5}}>Escaneie o QR Code para iniciar a sua comanda</Text>
        </View>
        <View>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack()
            }}
            >
            <Text style={{...globalStyles.h4, padding: '5%'}}>X</Text>
          </TouchableOpacity>
        </View>
      </View>
  
      <View style={{height: "30%", marginTop: 30}}>
        <QRCode autenticar={submitHandler}/>
      </View>
      <View>
        <View style={{display: 'flex', alignItems: 'center', flexDirection: 'row', marginTop: '15%'}}>
          <View 
            style={{...styles.itens,
              borderBottomColor: 'black', 
              borderBottomWidth: 1,
              flex: 2
            }}
          />
          <Text style={{...globalStyles.body1, color: 'black', flex: 1, textAlign: 'center'}}>ou</Text>
          <View 
            style={{...styles.itens,
              borderBottomColor: 'black', 
              borderBottomWidth: 1,
              flex: 2
            }}
          />
        </View>
      </View>
      <View style={{marginTop: 40}}>

        <View>
          <Text style={{...globalStyles.body2}}>Digite o código da comanda</Text>
        </View>
        <View style={{display: 'flex', flexDirection: 'row', marginTop: 10}}>
          <View style={{ width: '72%', height: 60 }}> 
            <TextInput placeholder="03a54fgh2..." style={{
              paddingLeft: 20,
              width: '100%',
              height: '100%',
              borderWidth: 2,
              borderRadius: 5,
              borderColor: 'black',
              color: 'black',
            }} value={codComanda} onChangeText={(codComanda) => setCodComanda(codComanda)} returnKeyType="send" onSubmitEditing={() => submitHandler()} />
          </View>
          <View style={{width: 60 , height: 60, marginLeft: '2%'}}>
            <View style={{...styles.buttonShadow}}>
              <TouchableOpacity
                onPress={() => {
                  submitHandler();
                }}
                style={{width: '100%', height: '100%'}}
              >
                <View style={{...styles.buttonStyle}}>
                  <View>
                    <MaterialIcons name="done" size={40} color={globalStyles.branco1.color}/>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 500}}></View>
        </View>
        </View>
      </View>
    </View>
  </View>
  </ScrollView>
</Modal>

  );
};


const styles = StyleSheet.create({
  
  modalView: {
    height: "88%",
    backgroundColor: globalStyles.branco2.color,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
  }, 
  buttonShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    borderRadius: 5,
    backgroundColor: 'transparent',
  },
  buttonStyle: {
    backgroundColor: globalStyles.vermelho3.color,
    borderRadius: 5,
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 8,
  }

});


export default Scan;