import {firebase} from '../utils/firebase';

export const criarComanda= (mesa, restauranteId=20) => {
  return (dispatch) => {
    const ref = firebase.database().ref('comandas/').push({mesa: mesa, restaurante: restauranteId});
  }
}

export const carregarComandas = (restauranteId=20) => {
  return (dispatch) => {
    const ref = firebase.database().ref("comandas/");
    ref.orderByChild("restaurante").equalTo(restauranteId).on("value", snap => {
      const comandas = [];
      snap.forEach(snapChild => {
          comandas.push({comanda_id: snapChild.key, mesa: snapChild.val().mesa, owner: snapChild.val().owner, chamando: snapChild.val().chamando, pagamento: snapChild.val().pagamento});
      });
      dispatch({type: 'CARREGAR_COMANDAS', payload: comandas}) 
    })
  }
}

export const deletarComanda = (id=1) => {
  return (dispatch) => {
    const ref = firebase.database().ref("comandas/" + id).remove();
  }
}