import {createStore, applyMiddleware} from 'redux';
import RootReducer from './redux/RootReducer';
import thunk from 'redux-thunk';

export default function configStore () {
  return createStore(RootReducer,{}, applyMiddleware(thunk));
}