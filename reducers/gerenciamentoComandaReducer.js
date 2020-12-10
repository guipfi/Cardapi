const initState = null

export const gerenciamentoComandaReducer = (state=initState, action) => {
  switch(action.type) {
    case "ADICIONAR_COMANDA":
      var newState = state
      var novaComanda = { comanda_id: action.payload[0], mesa: action.payload[1] }
      newState.push(novaComanda);
      newState.sort((a,b) => {
        a.mesa = parseInt(a.mesa);
        b.mesa = parseInt(b.mesa);
        if(a.mesa < b.mesa) return -1;
        if(a.mesa > b.mesa) return 1;
        return 0;
      });
      return newState;
    case "CARREGAR_COMANDAS":
      var newState = action.payload;
      newState.sort((a,b) => {
        a.mesa = parseInt(a.mesa);
        b.mesa = parseInt(b.mesa);
        if(a.mesa < b.mesa) return -1;
        if(a.mesa > b.mesa) return 1;
        return 0;
      });
      return newState;
    case "REMOVER_COMANDA":
      var newState = state;
      newState = newState.filter((e) => {
        if(e.comanda_id==action.payload) {
          return 0;
        }
        return 1;
      });
      return newState;
    default:
      return state;
  }
}