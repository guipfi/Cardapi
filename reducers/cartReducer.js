const initState = [{
  "id": "0",
  "produto": "Coca-Cola",
  "quantidade": "1",
  "valor_uni": "6.00",
  "observacao": ""
},{
  "id": "1",
  "produto": "Pastel de frango milho e catupiry",
  "quantidade": "2",
  "valor_uni": "7.25",
  "observacao": "Por favor, retirar o milho e enviar vinagrete"
}];

export const cartReducer = (state=initState, action) => {
  let newCarrinho;
  let newQuantidade;
  let index;
  switch(action.type) {
    case "ADD_ITEM":
      newCarrinho = [...state];
      newQuantidade=parseInt(action.item.quantidade)+1;
      index = newCarrinho.findIndex(e => e.id == action.item.id ? true : false);
      newQuantidade = newQuantidade.toString();
      newCarrinho[index].quantidade=newQuantidade;
      return newCarrinho;
    case "REMOVE_ITEM":
      newCarrinho = [...state];
      newQuantidade=parseInt(action.item.quantidade)-1;
      index = newCarrinho.findIndex(e => e.id == action.item.id ? true : false);
      newQuantidade = (newQuantidade < 1) ? (
        newCarrinho.splice(index,1)
      ) : (
        newQuantidade = newQuantidade.toString(),
        newCarrinho[index].quantidade=newQuantidade
      )
      return newCarrinho;
    default:
      return state;
  }
}