import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput,
} from "react-native";
import Modal from "react-native-modalbox";
import { MaterialIcons } from '@expo/vector-icons';
import Carrinho from './carrinho';

// Estilo Global
import {globalStyles} from '../styles/global';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

export default function Scan(){
  const [modalVisible, setModalVisible] = useState(false);

  return (
    
    <View style={globalStyles.container}>
      <Modal
        style= {styles.modalView}
        swipeToClose={false}
        swipeThreshold={300} // The threshold to reach in pixels to close the modal
        backdropOpacity={0.1}
        position= {"bottom"}
        isOpen= {modalVisible}
        onClosed= {() => setModalVisible(false)}
      >
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
        <View>
          <View style={{display: 'flex', alignSelf: 'flex-end', margin: '-5%'}}>
            <TouchableHighlight
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
              >
              <Text style={{...globalStyles.h4, padding: '5%'}}>X</Text>
            </TouchableHighlight>
          </View>
          
          <View style={{height: 640}}>
          {/* Seção atalhos */}
          <Text style={{...globalStyles.h5, marginBottom: 15}}>Atalhos</Text>
          
          {/* 3 botões */}
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: '12%'}}> 
            {/* Botão cardápio */}
            <View style={{height: '100%', width: '30%'}}>
              <View style={styles.buttonShadow}>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                    style={{width: '100%', height: '100%'}}
                  >
                    <View style={{...styles.buttonStyle}}>
                      <View>
                        <MaterialIcons name="book" size={20} color={globalStyles.branco1.color}/>
                      </View>
                      <Text style={{color: globalStyles.branco1.color, marginTop: 5}}>Abrir cardápio</Text>
                    </View>  
                  </TouchableOpacity>  
                </View>        
            </View>
            {/* Botão Garçom */}
            <View style={{height: '100%', width: '30%'}}>
              <View style={styles.buttonShadow}>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                    style={{width: '100%', height: '100%'}}
                  >
                    <View style={{...styles.buttonStyle}}>
                      <View>
                        <MaterialIcons name="pan-tool" size={20} color={globalStyles.branco1.color}/>
                      </View>
                      <Text style={{color: globalStyles.branco1.color, marginTop: 5}}>Chamar garçom</Text>
                    </View>  
                  </TouchableOpacity>  
                </View>        
            </View>
            {/* Botão Comanda */}
            <View style={{height: '100%', width: '30%'}}>
              <View style={styles.buttonShadow}>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                    style={{width: '100%', height: '100%'}}
                  >
                    <View style={{...styles.buttonStyle}}>
                      <View>
                        <MaterialIcons name="settings" size={20} color={globalStyles.branco1.color}/>
                      </View>
                      <Text style={{color: globalStyles.branco1.color, marginTop: 5}}>Gerenciar comanda</Text>
                    </View>  
                  </TouchableOpacity>  
                </View>        
            </View>
          </View>

        <Text style={{...globalStyles.h5, marginBottom: 15, marginTop: 40}}>Meu carrinho</Text> 
        <Carrinho />



        </View>
        </View>
      }/>
      </Modal>

        <TouchableHighlight
          style={styles.openButton}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        >
        <Text>Show Modal</Text>
      </TouchableHighlight>
    </View>

);
};

const styles = StyleSheet.create({
  
  modalView: {
    height: "90%",
    backgroundColor: globalStyles.branco2.color,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 35,
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
    backgroundColor: globalStyles.vermelho1.color,
    borderRadius: 5,
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 8,
  }

});