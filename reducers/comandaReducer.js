const initState =
{
  comanda_id: null,
  mesa: null,
  owner: null,
  restaurante: null,
  chamando: null,
  // Status 0 = Comanda inexistente // Status 1 = Atribuida com sucesso // Status 2 = Comanda ocupada,
  status: null
};

export const comandaReducer = (state=initState, action) => {
  switch(action.type) {
    case "CHAMANDO_GARCOM":
      return {
        ...state,
        chamando: action.payload
      }
    case "COMANDA_ATRIBUIDA":
      return {
        ...state,
        comanda_id: payload[1],
        mesa: payload[0].mesa,
        owner: payload[3],
        restaurante: payload[0].restaurante,
        chamando: false
      }
    default:
      return state;
  }
}
