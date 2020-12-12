const initState = [{
    'id':'',
    "name":'',
    "photoURL":'',
    'cpf':'',
    'phone':'',
    'email':'',
    comanda: null
}];

export const userReducer = (state = initState, action) =>{
    let user;
    
    switch(action.type){
        case "LOGIN_USER":
            user = action.user;
            return user;
        case "LOGOUT_USER":
            user = [{}]
            return user;
        case "SET_COMANDA":
            return {
                ...state,
                comanda: action.payload
            }
        default:
            return state;
    }


}