import {firebase} from '../utils/firebase';

export const carregarConsumo = (comandaId=1) => {
  return (dispatch) => {
    const ref = firebase.database().ref("comandas/"+comandaId+'/consumo');
    ref.on("value", snap => {
      const consumo = [];
      let url_img;
      snap.forEach(snapChild => {
        firebase.storage().ref(snapChild.val().foto).getDownloadURL().then((url) => {
          url_img=url;
          consumo.push({
            id: snapChild.getKey(),
            ...snapChild.val(),
            foto: url_img
          });
        });
      });
      dispatch({type: 'CARREGAR_CONSUMO', payload: consumo});
    });
    dispatch({type: "LOAD_SUCCESS"});
  }
}