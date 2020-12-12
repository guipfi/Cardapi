const initState = 
{
  isLoading: true
}

export const consumoReducer = (state=initState, action) => {
  switch(action.type) {
    case "CARREGAR_CONSUMO":
      return {
        ...state,
        ...action.payload
      }
    case "LOAD_SUCCESS":
    return {
      ...state,
      isLoading: false
    }
    default:
      return state;
  }
}

