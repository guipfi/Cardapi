import {firebase} from '../utils/firebase';

export const carregarConsumo = (comandaId=1) => {
  return (dispatch, getState) => {
    firebase.database().ref("comandas/"+comandaId+'/consumo').on('value', snap => {
      const consumo = [];
      let url_img;
      let processados=0
      snap.forEach(snapChild => {
        firebase.storage().ref(snapChild.val().foto).getDownloadURL().then((url) => {
          url_img=url;
          if(getState().consumo.participantes) {
            consumo.push({
              id: snapChild.key,
              ...snapChild.val(),
              foto: url_img,
              visivel: true
            });
          } else {
            consumo.push({
              id: snapChild.key,
              ...snapChild.val(),
              foto: url_img,
              visivel: getState().participantes[snapChild.key].visivel
            });
          }
          processados++;
        if(processados==Object.values(snap.val()).length) {
          console.log(JSON.stringify(consumo));
          dispatch({type: 'CARREGAR_CONSUMO', payload: consumo});
        }
        });
      })
    });
  }
}

export const setVisibilidade = (id) => {
  return {
    type: "SET_VISIBILIDADE",
    payload: id
  }
}

export const fazerPedido = (userId, comandaId, pedido) => {
  return () => {
    firebase.database().ref('comandas/'+comandaId+'/consumo/'+userId+'/pedidos').push(pedido);
  }
}