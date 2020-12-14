export const addItem = (item) => {
  return {
    type: "ADD_ITEM_QTD",
    item: item
  }
}

export const adicionarCarrinho = (item) => {
  return {
    type: "ADD_NOVO_ITEM",
    payload: item
  }
}

export const deleteItem = (item) => {
  return {
    type: "REMOVE_ITEM",
    item: item
  }
}

export const limparCarrinho = () => {
  return {
    type: "LIMPAR_CARRINHO"
  }
}