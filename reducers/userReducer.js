const initState = [{
    'id':'',
    "name":'',
    "photoURL":'',
    'cpf':'',
    'phone':'',
    'email':'',
    'favorite': [],
    comanda: null
}];

export const userReducer = (state = initState, action) =>{
    let user;
    
    switch(action.type){
        case "LOGIN_USER":
            user = action.user;
            return user;
        case "GUEST_USER":
            return null
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
            return {
                ...state,
                comanda: action.payload
            }
        default:
            return state;
    }


}