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
          if(getState().consumo.participantes[snapChild.key]) {
            consumo.push({
              id: snapChild.key,
              ...snapChild.val(),
              foto: url_img,
              visivel: getState().participantes[snapChild.key].visivel   
            });
          } else {
            consumo.push({
              id: snapChild.key,
              ...snapChild.val(),
              foto: url_img,
              visivel: true
            });
          }
          processados++;
        if(processados==Object.values(snap.val()).length) {
          consumo.forEach((participante) => {
            let pedidos = [];
            if(participante.pedidos) {
              Object.keys(participante.pedidos).forEach((key) => {
                pedidos.push({
                  id: key,
                  pedidos: participante.pedidos[key]
                });
              });
              participante.pedidos=pedidos;
            }
          });
          consumo.reverse();
          dispatch({type: 'CARREGAR_CONSUMO', payload: consumo});
        }
        });
      });
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
