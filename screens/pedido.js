import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import Modal from "react-native-modalbox";
import { MaterialIcons } from '@expo/vector-icons';
import Carrinho from '../shared/Carrinho';

// Estilo Global
import {globalStyles} from '../styles/global';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

export default function Pedido(){
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={globalStyles.container}>
      <Modal
        style= {styles.modalView}
        swipeToClose={false}
        swipeThreshold={300} // The threshold to reach in pixels to close the modal
        backdropOpacity={0.1}
        position= {"bottom"}
        isOpen= {true}
        onClosed= {() => setModalVisible(false)}
      >
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
        <View>
          <View style={{display: 'flex', alignSelf: 'flex-end', margin: '-5%'}}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
              >
              <Text style={{...globalStyles.h4, padding: '5%'}}>X</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={{...globalStyles.h5, marginBottom: 15}}>Pedido</Text>
          
          <Carrinho />
        </View>
      }/>
      </Modal>
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
    backgroundColor: globalStyles.vermelho3.color,
    borderRadius: 5,
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 8,
  }

});