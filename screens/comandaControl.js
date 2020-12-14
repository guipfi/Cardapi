import React, {useEffect} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import { carregarComanda, cancelarEntrada } from '../actions/comandaActions';
import { setComanda } from '../actions/userActions';
import Comanda from '../screens/comanda';
import Scan from '../screens/scan';
import Loading from '../shared/Loading';
import Modal from 'react-native-modalbox';
import {globalStyles} from '../styles/global';

export default function ComandaControl({navigation}) {

  const user = useSelector((state) => state.user);

  const comanda = useSelector((state) => state.comanda)

  const dispatch = useDispatch();

  if(user.comanda) {
    if(comanda.isLoading) {
      dispatch(carregarComanda(user.comanda.id, user.id));
      return <Loading />
    } else {
      console.log(30 + JSON.stringify(user));
      if(!user.comanda.autorizado) {
        return (
          <Modal 
            style={{width: "85%", height: 230, borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center'}}
            swipeToClose={false}
            backdropPressToClose={false}
            backdropOpacity={0.8}
            isOpen={true}>
            <View style={{width: "85%"}}>
              <Text style={{...globalStyles.h5, textAlign: 'center', marginBottom:20}}>Aguardando autorização...</Text>
              <Text style={{...globalStyles.body2, textAlign: 'center', color: globalStyles.preto5}}>O responsável pela comanda precisa aprovar a sua entrada.</Text>
              <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
                <View>
                  <TouchableOpacity style={globalStyles.mediumButtonStyle} onPress={() => {
                    dispatch(cancelarEntrada(user.comanda.id, user.id));
                    dispatch(setComanda(null, user.id, false));
                  }}>
                    <Text style={{color:globalStyles.vermelho3.color}}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              </View>
           </View>
          </Modal>     
        );   
      } else {
        return <Comanda navigation={navigation} /> 
      }
    } 
  } else {
    return <Scan navigation={navigation} />
  }
}