import { combineReducers } from 'redux';
import {cartReducer} from './cartReducer';
import {userReducer} from './userReducer';

export const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer
})

