import {firebase} from '../utils/firebase';

export const criarComanda= (mesa, restauranteId=20) => {
  return (dispatch) => {
    const ref = firebase.database().ref('comandas/').push({mesa: mesa, restaurante: restauranteId});
    const key = ref.getKey();
    dispatch({type: "ADICIONAR_COMANDA", payload: [key, mesa]});
  }
}

export const carregarComandas = (restauranteId=20) => {
  return (dispatch) => {
    const comandas = [];
    const ref = firebase.database().ref("comandas/");
    ref.orderByChild("restaurante").equalTo(restauranteId).once("value", snap => {
      snap.forEach(snapChild => {
        if(snapChild.val().owner) {
          comandas.push({comanda_id: snapChild.key, mesa: snapChild.val().mesa, owner: snapChild.val().owner});
        } else {
          comandas.push({comanda_id: snapChild.key, mesa: snapChild.val().mesa, owner: null});
        }
        
      });
    }).then(() => {
      dispatch({type: 'CARREGAR_COMANDAS', payload: comandas}) 
    });
  }
}

export const deletarComanda = (id=1) => {
  return (dispatch) => {
    const ref = firebase.database().ref("comandas/" + id).remove();
    dispatch({type: 'REMOVER_COMANDA', payload: id});
  }
}