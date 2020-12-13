import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { carregarComanda } from '../actions/comandaActions';
import Comanda from '../screens/comanda';
import Scan from '../screens/scan';
import Loading from '../shared/Loading';

export default function ComandaControl({navigation}) {

  const user = useSelector((state) => state.user);

  const comanda = useSelector((state) => state.comanda)

  const dispatch = useDispatch();

  if(user.comanda) {
    if(!comanda.isLoading) {
      return <Comanda navigation={navigation} /> 
    } else {
      dispatch(carregarComanda(user.comanda));
      return <Loading /> 
    }
  } else {
    return <Scan navigation={navigation} />
  }
}