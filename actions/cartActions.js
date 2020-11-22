export const addItem = (item) => {
  return {
    type: "ADD_ITEM",
    item: item
  }
}

export const deleteItem = (item) => {
  return {
    type: "REMOVE_ITEM",
    item: item
  }
}

export const getItems = () => {
  return {
    type: "GET_ITEMS"
  }
}