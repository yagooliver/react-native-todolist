import TypeList from './TypeList';
import {
  createDatabase,
  getList
} from '../shared/actions/actions';
import { connect } from 'react-redux';
  
const mapStateToProps = (state) => ({
  types: state.todo.types
});
  
const mapDispatchToProps = (dispatch) => ({
  createDatabase: () => dispatch(createDatabase()),
  getList: (type) => dispatch(getList(type))
})
  
export default connect(mapStateToProps,mapDispatchToProps)(TypeList);