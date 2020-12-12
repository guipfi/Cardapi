import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { carregarComanda } from '../actions/comandaActions';
import { carregarConsumo } from '../actions/consumoActions';
import Comanda from '../screens/comanda';
import Scan from '../screens/scan';
import Loading from '../shared/Loading';

export default function ComandaControl({navigation}) {

  const user = useSelector((state) => state.user);

  const consumo = useSelector(state => state.consumo)

  const comanda = useSelector((state) => state.comanda)

  const dispatch = useDispatch();

  if(user.comanda) {
    if(!comanda.isLoading && !consumo.isLoading) {
      return <Comanda navigation={navigation} /> 
    } else {
      dispatch(carregarComanda(user.comanda));
      dispatch(carregarConsumo(user.comanda));
      return <Loading /> 
    }
  } else {
    return <Scan navigation={navigation} />
  }
}