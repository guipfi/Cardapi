const initState = []

export const gerenciamentoComandaReducer = (state=initState, action) => {
  switch(action.type) {
    case "ADICIONAR_COMANDA":
      var newState = state
      var novaComanda = { comanda_id: action.payload[0], mesa: action.payload[1] }
      newState.push(novaComanda);
      return newState;
    default:
      return state;
  }
}