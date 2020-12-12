const initState = [];

export const cartReducer = (state=initState, action) => {
  let newCarrinho;
  let newQuantidade;
  let index;
  switch(action.type) {
    case "ADD_NOVO_ITEM":
      newCarrinho = [...state];
      let tamanho = newCarrinho.length;
      for(let i=0; i<tamanho; i++) {
        if(newCarrinho[i].product_id==action.payload.product_id && newCarrinho[i].observacao==action.payload.observacao && newCarrinho[i].adicionais.length==action.payload.adicionais.length) {
          let qtdAdicionais = newCarrinho[i].adicionais.length;
          let ehIgual=1
          for(let j=0; j<qtdAdicionais && ehIgual; j++) {
            if(newCarrinho[i].adicionais[j].nome!=action.payload.adicionais[j].nome) {
              ehIgual=0;
            }
          }
          if(ehIgual) {
            newCarrinho[i].quantidade += action.payload.quantidade;
            return newCarrinho;
          }
        }
      }
      newCarrinho.push({...action.payload});
      return newCarrinho;
    case "ADD_ITEM_QTD":
      newCarrinho = [...state];
      newQuantidade=parseInt(action.item.quantidade)+1;
      index = newCarrinho.findIndex(e => e.product_id == action.item.product_id ? true : false);
      newCarrinho[index].quantidade=newQuantidade;
      return newCarrinho;
    case "REMOVE_ITEM":
      newCarrinho = [...state];
      newQuantidade=parseInt(action.item.quantidade)-1;
      index = newCarrinho.findIndex(e => e.product_id == action.item.product_id ? true : false);
      if(newQuantidade < 1) {
        newCarrinho.splice(index,1)
      } else {
        newCarrinho[index].quantidade=newQuantidade
      }
      return newCarrinho;
    default:
      return state;
  }
}