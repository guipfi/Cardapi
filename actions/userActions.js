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

export const updatePratos = (prato) =>{
  return{
    type: "UPDATE_PRATOS",
    payload: prato
  }
}

export const deletePratos = (prato) =>{
  return{
    type: "DELETE_PRATOS",
    payload: prato
  }
}

export const updateBebidas = (bebida) =>{
  return{
    type: "UPDATE_BEBIDAS",
    payload: bebida
  }
}

export const deleteBebidas = (bebida) =>{
  return{
    type: "DELETE_BEBIDAS",
    payload: bebida
  }
}

export const updateSobremesas = (sobremesa) =>{
  return{
    type: "UPDATE_SOBREMESAS",
    payload: sobremesa
  }
}

export const deleteSobremesas = (sobremesa) =>{
  return{
    type: "DELETE_SOBREMESAS",
    payload: sobremesa
  }
}

export const deleteFavorite = (favorito) =>{
  return{
    type: "DELETE_FAVORITO",
    payload: favorito
  }
}
export const updateAcompanhamentos = (acompanhamento) =>{
  return{
    type: "UPDATE_ACOMPANHAMENTOS",
    payload: acompanhamento
  }
}

export const deleteAcompanhamentos = (acompanhamento) =>{
  return{
    type: "DELETE_ACOMPANHAMENTOS",
    payload: acompanhamento
  }
}

export const setComanda = (comanda=null, userID=1, autorizado=true, outUser=null) => {
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
      if(outUser) {
        console.log("aqui")
        firebase.database().ref('comandas/'+comanda+referencia).update({
          nome: outUser.nome,
          foto: outUser.foto
        });
      } else {
        console.log("aqui2")
        firebase.database().ref('comandas/'+comanda+referencia).update({
          nome: getState().user.name,
          foto: getState().user.photoURL
        });
      } 
    } else {
      firebase.database().ref('users/'+userID+'/profile/comanda').remove();
    }
    if(getState().user.id==userID) {
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