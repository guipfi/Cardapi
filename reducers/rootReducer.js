import { combineReducers } from 'redux';
import {cartReducer} from './cartReducer';
import {comandaReducer} from './comandaReducer';
import { gerenciamentoComandaReducer } from './gerenciamentoComandaReducer';
import {userReducer} from './userReducer';
import {consumoReducer} from './consumoReducer';

export const appReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  comanda: comandaReducer,
  comandas: gerenciamentoComandaReducer,
  consumo: consumoReducer
})

export const rootReducer = (state, action) => {   
  // Clear all data in redux store to initial.
  if(action.type === 'LOGOUT')
     state = undefined;
  
  return appReducer(state, action);
};
