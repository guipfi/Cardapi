import {firebase} from '../utils/firebase';

export const loginUser = (user) => {
    return {
        type: "LOGIN_USER",
        user: user
    }
}

export const guestUser = () => {
    return {
        type: "GUEST_USER",
    }
}

export const updateFavorite = (favorito) =>{
  return{
    type: "UPDATE_FAVORITOS",
    payload: favorito
  }
}

export const deleteFavorite = (favorito) =>{
  return{
    type: "DELETE_FAVORITO",
    payload: favorito
  }
}

export const setComanda = (comanda=null, userID=1, autorizado=true) => {
  return (dispatch, getState) => {
    if(comanda) {
      firebase.database().ref('users/'+userID+'/profile/comanda').update({
        id: comanda,
        autorizado: autorizado
      });
      let referencia
      if(autorizado) {
        referencia="/consumo/"+userID;
        firebase.database().ref('comandas/'+comanda+'/autorizacoes/'+userID).remove();
      } else {
        referencia="/autorizacoes/"+userID;
      }
      firebase.database().ref('comandas/'+comanda+referencia).update({
        nome: getState().user.name,
        foto: getState().user.photoURL
      });
    } else {
      firebase.database().ref('users/'+userID+'/profile/comanda').remove();
    }
    if(getState().user.id==userID) {
       console.log("ENTROU P SETAR A COMANDA");
      dispatch({type: 'SET_COMANDA', payload: {id: comanda, autorizado: autorizado}});
    }
  }
}

export const removerParticipantes = (consumo) => {
  return () => {
    consumo.participantes.forEach((participante) => {
      firebase.database().ref('users/'+participante.id+'/profile/comanda').remove();
    });
  }
}

export const controleComanda = () => {
  return (dispatch, getState) => {
    const id = getState().user.id;
    firebase.database().ref('users/'+ id + '/profile/comanda').on('value', snap => {
      dispatch({type: 'SET_COMANDA', payload: snap.val()});
    });
  }
}