import React from 'react';
import {useSelector} from 'react-redux';
import Comanda from '../screens/comanda';
import Scan from '../screens/scan';

export default function ComandaControl({navigation}) {

  const comanda = useSelector((state) => state.comanda);

  console.log(comanda.comanda_id);

  if(comanda.comanda_id) {
    return <Comanda navigation={navigation} /> 
  } else {
    return <Scan navigation={navigation} />
  }
}