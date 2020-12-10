const initState = 
{
  consumo: [{nome: null, visivel: null, foto: null, pedido: [{}]}]
}

export const consumoReducer = (state=initState, action) => {
  switch(action.type) {
    default:
      return state;
  }
}

