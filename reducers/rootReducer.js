import { combineReducers } from 'redux';
import {cartReducer} from './cartReducer';
import {comandaReducer} from './comandaReducer';
import { gerenciamentoComandaReducer } from './gerenciamentoComandaReducer';
import {userReducer} from './userReducer';
import {consumoReducer} from './consumoReducer';

export const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  comanda: comandaReducer,
  comandas: gerenciamentoComandaReducer,
  consumo: consumoReducer
})

