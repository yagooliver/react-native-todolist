import {
  getItem,
  getList,
  updateItem,
  openModal,
  closeModal,
  addItem,
  changeItem
} from '../shared/actions/actions';
import {connect} from 'react-redux';
import TodoList from './TodoList';

const mapStateToProps = (state) => ({
  todoList: state.todo.todoList,
  todoItem: state.todo.todoItem,
  types: state.todo.types,
  openModalState: state.todo.openModal
})

const mapDispatchToProps = (dispatch) => ({
  getItem: (id) => dispatch(getItem(id)),
  getList: (type) => dispatch(getList(type)),
  updateItem: (id, type) => dispatch(updateItem(id, type)),
  openModal: ()=> dispatch(openModal()),
  closeModal: ()=> dispatch(closeModal()),
  onSubmit: (item) =>  dispatch(addItem(item)),
  onChange: (item) => dispatch(changeItem(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
