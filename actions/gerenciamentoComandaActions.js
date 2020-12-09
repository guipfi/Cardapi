import {firebase} from '../utils/firebase';

export const criarComanda= (mesa, restauranteId=20) => {
  return (dispatch) => {
    const ref = firebase.database().ref('comandas/').push({mesa: mesa, restaurante: restauranteId});
    const key = ref.getKey();
    dispatch({type: "ADICIONAR_COMANDA", payload: [key, mesa]});
  }
}