const initState =
{
  comanda_id: null,
  mesa: null,
  owner: null,
  restaurante: null,
  chamando: null,
  // Status 0 = Comanda inexistente // Status 1 = Atribuida com sucesso // Status 2 = Comanda ocupada,
  status: null,
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
        comanda_id: action.payload[1],
        mesa: action.payload[0].mesa,
        owner: action.payload[3],
        restaurante: action.payload[0].restaurante,
        chamando: false,
        status: 1
      }
    case "COMANDA_OCUPADA":
      return {
        ...state,
        status: 2
      }
    case "COMANDA_INEXISTENTE":
      return {
        ...state,
        status: 0
      }
    default:
      return state;
  }
}
