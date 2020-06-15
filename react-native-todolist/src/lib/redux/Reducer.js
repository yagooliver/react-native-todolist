import * as actionTypes from '../../pages/shared/actions/actionTypes';

const todoItemObj = {
  description: '',
  type: '',
  status: 0,
  date: new Date()
}

const initialState = {
  todoItem: todoItemObj,
  todoList: [],
  isSaved: false,
  buttonPressed: false,
  openModal: false,
  types: [
    {description: 'Today', value: 0},
    {description: 'At Work', value: 1},
    {description: 'Important', value: 2},
    {description: 'Goals', value: 3}
  ]
}

const Reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.GENERATE_DATABASE:
      return {
        ...state,
      }
    case actionTypes.GET_TODO_LIST:
      return {
        ...state,
        todoList: action.payload,
        openModal: false
      }
    case actionTypes.EDIT_TODO_ITEM:
      return {
        ...state,
        todoItem: action.payload
      }
    case actionTypes.ADD_TODO_ITEM:
      return initialState;
    case actionTypes.EDIT_TODO_ITEM:
      return {
        ...state,
        todoList: state.todoList.map(it => {
          if(it.id === action.payload){
            return {
              ...it,
              status: 1
            }
          }
          return it;
        })
      }
    case actionTypes.OPEN_MODAL:
      return {
        ...state,
        openModal: true,
        todoItem: todoItemObj
      }
    case actionTypes.CLOSE_MODAL:
      return {
        ...state,
        openModal: false,
        todoItem: todoItemObj
      }
    default: return state;
  }
}

export default Reducer;