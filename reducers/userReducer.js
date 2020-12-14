const initState = [{
    'id':'',
    "name":'',
    "photoURL":'',
    'cpf':'',
    'phone':'',
    'email':'',
    'favorite': [],
    comanda: null,
    'pratos': [],
    'bebidas': [],
    'sobremesas':[],
    'acompanhamentos':[]
}];

export const userReducer = (state = initState, action) =>{
    let user;
    
  switch(action.type) {
    case "LOGIN_USER":
      return {
        ...action.user
      }
    case "GUEST_USER":
      return null

    case "UPDATE_PRATOS":
     const newPratos = state.pratos!=undefined ? [...state.pratos, action.payload] : [action.payload];
     return{
       ...state,
       pratos:newPratos
     }
    case "DELETE_PRATOS":
    return{
        ...state,
        pratos: state.pratos.filter(item => item !== action.payload) 
    }

    case "UPDATE_BEBIDAS":
      const newBebidas = state.bebidas!=undefined ? [...state.bebidas, action.payload] : [action.payload];
      return{
        ...state,
        bebidas:newBebidas
      }
     case "DELETE_BEBIDAS":
     return{
         ...state,
         bebidas: state.bebidas.filter(item => item !== action.payload) 
     }

     case "UPDATE_SOBREMESAS":
      const newSobremesas = state.sobremesas!=undefined ? [...state.sobremesas, action.payload] : [action.payload];
      return{
        ...state,
        sobremesas:newSobremesas
      }
     case "DELETE_SOBREMESAS":
     return{
         ...state,
         sobremesas: state.sobremesas.filter(item => item !== action.payload) 
     }

     case "UPDATE_ACOMPANHAMENTOS":
      const newAcompanhamentos = state.acompanhamentos!=undefined ? [...state.acompanhamentos, action.payload] : [action.payload];
      return{
        ...state,
        acompanhamentos:newAcompanhamentos
      }
     case "DELETE_ACOMPANHAMENTOS":
     return{
         ...state,
         acompanhamentos: state.acompanhamentos.filter(item => item !== action.payload) 
     }


    case "UPDATE_FAVORITOS":
      const newFavoritos =state.favorite!=undefined ?  [...state.favorite,action.payload] : [action.payload];
      return{
          ...state,
          favorite: newFavoritos
      }
    case "DELETE_FAVORITO":
      return{
          ...state,
          favorite: state.favorite.filter(item => item !== action.payload) 
      }
    case "SET_COMANDA":
      if(action.payload) {
        return {
          ...state,
          comanda: {id: action.payload.id, autorizado: action.payload.autorizado}
        }
      } else {
        return {
          ...state,
          comanda: null
        }
      }
      
    default:
      return state;
  }
}