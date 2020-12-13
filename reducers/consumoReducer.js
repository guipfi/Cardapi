const initState = 
{
  participantes: [],
  isLoading: true
}

export const consumoReducer = (state=initState, action) => {
  switch(action.type) {
    case "CARREGAR_CONSUMO":
      return {
        ...state,
        participantes: action.payload,
        isLoading: false
      }
    case "SET_VISIBILIDADE":
      let index = state.participantes.findIndex((e) => e.id == action.payload ? true : false);
      let newConsumo = state.participantes;
      newConsumo[index].visivel=!newConsumo[index].visivel
      console.log("oi");
      console.log(newConsumo[index].visivel);
      return {
        ...state,
        participantes: newConsumo
      }
    default:
      return state;
  }
}

