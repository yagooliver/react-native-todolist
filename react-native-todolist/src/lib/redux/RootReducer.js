import {combineReducers} from 'redux';
import Reducer from './Reducer';

const RootReducer = combineReducers({
  todo: Reducer
})

export default RootReducer;