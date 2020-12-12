
const initState = 
{
  isLoading: true
}

export const comandaReducer = (state=initState, action) => {
  switch(action.type) {
    case "CHAMANDO_GARCOM":
      return {
        ...state,
        chamando: action.payload
      }
    case "REQUISITAR_PAGAMENTO":
      return {
        ...state,
        pagamento: true
      }
    case "CARREGAR_COMANDA": {
      return {
        ...state,
        comanda_id: action.payload[1],
        mesa: action.payload[0].mesa,
        restaurante: action.payload[0].restaurante,
        pagamento: action.payload[0].pagamento,
        chamando: action.payload[0].chamando,
        status: 1
      }
    }
    case "LOAD_SUCCESS":
      return {
        ...state,
        isLoading: false
      }
    case "COMANDA_ATRIBUIDA":
      alert("Comanda iniciada com sucesso!");
      return {
        ...state,
        comanda_id: action.payload[1],
        mesa: action.payload[0].mesa,
        restaurante: action.payload[0].restaurante,
        pagamento: false,
        chamando: false,
        status: 1,
        isLoading: false
      }
    case "COMANDA_OCUPADA":
      alert("Essa comanda já está ocupada.");
      return {
        ...state,
        isLoading: false,
        status: 2
      }
    case "COMANDA_INEXISTENTE":
      alert("Comanda inválida.");
      return {
        ...state,
        isLoading: false,
        status: 0
      }
    default:
      return state;
  }
}
