import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import Modal from "react-native-modalbox";
import { MaterialIcons } from '@expo/vector-icons';
import Carrinho from '../shared/Carrinho';
import Participantes from '../shared/Participantes';
import Consumo from '../shared/Consumo';

// Estilo Global
import {globalStyles} from '../styles/global';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

export default function Comanda({navigation}){

  return (
      <Modal
        style= {styles.modalView}
        swipeToClose={false}
        backdropOpacity={0.5}
        position= {"bottom"}
        isOpen={true}
        onClosed={() => navigation.goBack()}
      >
      <View style={{...globalStyles.container}}>
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
        <View>
          <View style={{display: 'flex', flexDirection: 'row',  justifyContent: 'space-between', alignItems: 'center', marginBottom: 5, marginTop: 5}}>
            <View>
              <Text style={{...globalStyles.h5}}>Atalhos</Text>
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
          
          <View>
          {/* Seção atalhos */} 
          {/* 3 botões */}
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: 94}}> 
            {/* Botão cardápio */}
            <View style={{height: '100%', width: '29%'}}>
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

        <View style={{borderWidth: '1',  borderColor: globalStyles.branco5.color, marginTop: 40, marginBottom: 40}} />
          
        <Participantes />

        <View style={{marginTop: 30}} />
        
        <Consumo />
        
        <View style={{marginBottom: 100}}></View>

        </View>
        </View>
      }/>
      </View>
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