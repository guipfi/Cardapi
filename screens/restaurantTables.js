import React, {useState} from 'react';
import { render } from 'react-dom';
import {View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Modal from "react-native-modalbox";
import QRCode from 'react-native-qrcode-generator';
import { Dimensions } from 'react-native';

import {criarComanda} from '../actions/gerenciamentoComandaActions';

// Estilo Global
import {globalStyles} from '../styles/global';

export default function restaurantTable({navigation}) {

  const [openModal, setOpenModal] = useState(false);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [comandaID, setComandaID] = useState('');
  const [mesa, setMesa] = useState('');

  const windowWidth = Dimensions.get('window').width;

  const renderFooter = () => {
    return (
      <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
        <View>
          <TouchableOpacity style={globalStyles.mediumButtonStyle} onPress={() => setOpenModalAdd(true)}>
            <Text style={{color:"#FAFAFA"}}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const dispatch = useDispatch();

  const comandas = useSelector((state) => state.comandas);

  const adicionarComandaHandler = () => {
    dispatch(criarComanda(mesa));
    setMesa('');
    setOpenModalAdd(false);
  }

  return (
    
    <View style={{height: "100%"}}>
      <Modal 
        style={{width: "90%", height: "70%", borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center'}}
        swipeToClose={false}
        backdropOpacity={0.8}
        isOpen={openModal}
        onClosed={() => setOpenModal(false)}>
        <View>
          <QRCode
            value={comandaID}
            size={windowWidth*0.8}
            bgColor='black'
            fgColor='white'
          />
        </View>
      </Modal>     
      <Modal 
        style={{width: "90%", height: 250, borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center'}}
        swipeToClose={false}
        backdropOpacity={0.8}
        isOpen={openModalAdd}
        onClosed={() => setOpenModalAdd(false)}>
        <View>
          <Text style={globalStyles.h5}>Qual é a mesa da nova comanda?</Text>
          <TextInput 
            style={{...globalStyles.normalInput, marginTop:"5.468%"}}
            placeholder="Mesa"
            onChangeText={(e) => setMesa(e)}
            value={mesa}
          />
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
            <View>
              <TouchableOpacity style={globalStyles.mediumButtonStyle} onPress={adicionarComandaHandler}>
                <Text style={{color:"#FAFAFA"}}>Adicionar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>     
      <FlatList
        scrollEnabled={true}
        data={comandas}
        listKey={'comandas'}
        keyExtractor={item => item.comanda_id}
        ListFooterComponent={renderFooter}
        renderItem={({item})=> (
          <View style={{marginBottom:5}}>
            <View style={styles.Shadow}>
              <TouchableOpacity onPress={() => {
                setComandaID(item.comanda_id.toString());
                setOpenModal(true);
              }}>
                <View style={{backgroundColor: globalStyles.branco1.color , marginTop:'5%', height: 80, width: "85%", alignSelf: 'center', justifyContent: 'center'}}>
                  <View style={{display: 'flex', flexDirection: 'row', marginLeft: 30}}>
                    <View style={{flex:1}}>
                      <Text style={globalStyles.sub2}>{item.comanda_id}</Text>
                    </View>
                    <View style={{flex:1, marginLeft: 30, alignSelf: 'center'}}>
                      <Text style={globalStyles.sub2}>Mesa: {item.mesa}</Text>
                    </View>
                  </View>
                </View> 
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  Shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.2,
    backgroundColor: 'transparent',
  },
});
