const initState = [{
    'id':'',
    "name":'',
    "photoURL":'',
    'cpf':'',
    'phone':'',
    'email':'',
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
        default:
            return state;
    }


}