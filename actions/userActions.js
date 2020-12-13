import {firebase} from '../utils/firebase';

export const loginUser = (user) => {
    return {
        type: "LOGIN_USER",
        user: user
    }
}

export const logoutUser = (user) => {
    return {
        type: "LOGOUT_USER",
        user: user
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

export const setComanda = (comanda=1, userID=1) => {
  console.log("entrou");
  console.log(userID);
  console.log(comanda);
  return (dispatch) => {
    console.log(1);
    if(comanda) {
      console.log(2);
      firebase.database().ref('users/'+userID+'/profile').update({
        comanda: comanda
      });
      console.log(3);
    } else {
      console.log(4);
      firebase.database().ref('users/'+userID+'/profile/comanda').remove();
    }
    console.log(5);
    dispatch({type: 'SET_COMANDA', payload: comanda});
  }
}