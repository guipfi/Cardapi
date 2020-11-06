import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import Modal from "react-native-modalbox";

// Estilo Global
import {globalStyles} from '../styles/global';



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
          <ScrollView showsVerticalScrollIndicator='false'>
          <View style={{height: 1080}}>
            <View style={{display: 'flex', alignSelf: 'flex-end', margin: '-5%'}}>
              <TouchableHighlight
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
                >
                <Text style={{...globalStyles.h4, padding: '5%'}}>X</Text>
              </TouchableHighlight>
            </View>

            <Text style={{...globalStyles.h5, marginRight: '12%'}}>Escaneie o QR Code para iniciar a sua comanda</Text>
            
            <View style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexDirection: 'row', marginTop: '15%'}}>
              <View 
                style={{...styles.itens,
                  borderBottomColor: 'black', 
                  borderBottomWidth: 1,
                }}
              />
              <Text style={{...globalStyles.body1, color: 'black', height: 16}}>ou</Text>
              <View 
                style={{...styles.itens,
                  borderBottomColor: 'black', 
                  borderBottomWidth: 1,
                }}
              />
            </View>
            
            
            <Text style={{...globalStyles.body2, marginTop: '15%'}}>Digite o código da comanda</Text>
            
            <View style={{display: 'flex', flexDirection: 'row', width: '100%', height: '6%', marginTop: '3%'}}>
              <View style={{ width: '72%', height: '100%' }}> 
                <TextInput placeholder="03a54fgh2..." style={{
                  paddingLeft: 20,
                  width: '100%',
                  height: '100%',
                  borderWidth: 2,
                  borderRadius: 5,
                  borderColor: 'black',
                  color: 'black',
                }}
                />
              </View>
              <View style={{ width: '20%', height: '100%', marginLeft: '2%', ...styles.buttonShadow}}>
                <View style={styles.buttonStyle}>
                <TouchableHighlight
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                  >
                  <Text style={{...globalStyles.h4, color: globalStyles.branco1.color}}>V</Text>
                </TouchableHighlight>
                </View>
              </View>

            </View>
            
          </View>
          </ScrollView>
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
    backgroundColor: "white",
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
  itens: {
    width: 130,
    alignSelf: 'center'
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
    padding: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  }

});