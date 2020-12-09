import { combineReducers } from 'redux';
import {cartReducer} from './cartReducer';
import {comandaReducer} from './comandaReducer';
import { gerenciamentoComandaReducer } from './gerenciamentoComandaReducer';
import {profileReducer} from './profileReducer';
import {userReducer} from './userReducer';

export const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  comanda: comandaReducer,
  comandas: gerenciamentoComandaReducer,
})

