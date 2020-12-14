import {Alert} from 'react-native';


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
        owner: action.payload[0].owner,
        status: 1
      }
    }
    case "LOAD_SUCCESS":
      return {
        ...state,
        isLoading: false
      }
    case "COMANDA_ATRIBUIDA":
      Alert.alert("Comanda iniciada","Você já pode começar a fazer pedidos!");
      return {
        ...state,
        comanda_id: action.payload[1],
        mesa: action.payload[0].mesa,
        restaurante: action.payload[0].restaurante,
        pagamento: false,
        chamando: false,
        owner: true,
        status: 1,
        isLoading: false
      }
    case "COMANDA_OCUPADA_ATRIBUIDA":
      Alert.alert("Bem vindo à comanda","Você já pode começar a fazer pedidos!");
      return {
        ...state,
        comanda_id: action.payload[1],
        mesa: action.payload[0].mesa,
        restaurante: action.payload[0].restaurante,
        pagamento: false,
        chamando: false,
        owner: false,
        status: 1,
        isLoading: false
      }
    case "COMANDA_INEXISTENTE":
      Alert.alert("Comanda inválida","O código inserido não é válido.");
      return {
        ...state,
        isLoading: false,
        status: 0
      }
    default:
      return state;
  }
}
