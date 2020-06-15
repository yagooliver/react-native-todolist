import * as actionTypes from './actionTypes';
import {initDB, closeDatabase} from '../../../lib/db/createDatabase';

export const createDatabase = () => dispatch => {
  initDB();
  dispatch({
    type: actionTypes.GENERATE_DATABASE
  })
}

export const openModal = () => dispatch => {
  dispatch({
    type: actionTypes.OPEN_MODAL
  })
}

export const closeModal = () => dispatch => {
  dispatch({
    type: actionTypes.CLOSE_MODAL
  })
}

export const changeItem = (item) => dispatch => {
  dispatch({
    type: actionTypes.EDIT_TODO_ITEM,
    payload: item
  })
}

export const getList = (tp) => dispatch => {
  return new Promise((resolve) => {
    const todoList = [];
    initDB().then((db) => {
      db.transaction((tx) => {
        //TODO: implementar checagem
        tx.executeSql(`select t.id, t.description, t.type, t.status, t.dateItem from todo_table t where t.type = ? ${(tp === 3 || tp === 2 ? '' : 'and date(t.dateItem) = date(\'now\')')}`,[tp]).then(([tx,results])=>{
          console.log(results);
          var len = results.rows.length;
          for (let i = 0; i < len; i++) {
            let row = results.rows.item(i);
            console.log(`Todo List ID: ${row.id}, Todo Description: ${row.description}`)
            const { id, description, status, type, dateItem } = row;
            todoList.push({
              id,
              description,
              status,
              type,
              dateItem
            });
          }
          dispatch({
            type: actionTypes.GET_TODO_LIST,
            payload: todoList
          })
          console.log(todoList);
          resolve(todoList);
        });
      }).then((result) => {
        closeDatabase(db);
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
    });
  });
}

export const getItem = (id) => dispatch => {
  return new Promise((resolve) => {
    initDB().then((db) => {
      db.transaction((tx) => {
        tx.executeSql('select t.id, t.description, t.type, t.status, dateItem from todo_table t where id = ?',[id]).then(([tx,results])=>{
          console.log(results);
          if(results.rows.length > 0) {
            let row = results.rows.item(0);
            resolve(row);
          }
        });
      }).then((result) => {
        closeDatabase(db);
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
    });
  });
}

export const addItem = (item) => dispatch => {
  return new Promise((resolve) => {
    initDB().then((db) => {
      db.transaction((tx) => {
        tx.executeSql('INSERT INTO todo_table (description, status, type, dateItem) VALUES (?, ?, ?, date(\'now\'))', [item.description, 0, item.type]).then(([tx, results]) => {
          dispatch({
            type: actionTypes.ADD_TODO_ITEM,
            payload: results.insertId
          })
          dispatch(getList(item.type))
          resolve(results);
        });
      }).then((result) => {
        closeDatabase(db);
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
    });
  });  
}

export const updateItem = (id, type) => dispatch => {
  return new Promise((resolve) => {
    initDB().then((db) => {
      db.transaction((tx) => {
        tx.executeSql('UPDATE todo_table SET status = 1 WHERE id = ?', [id]).then(([tx, results]) => {
          dispatch({
            type: actionTypes.EDIT_TODO_ITEM,
            payload: id
          })
          dispatch(getList(type))
          resolve(results);
        });
      }).then((result) => {
        closeDatabase(db);
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
    });
  });  
}

export const deleteItem = (id) => dispatch =>  {
  return new Promise((resolve) => {
    initDB().then((db) => {
      db.transaction((tx) => {
        tx.executeSql('DELETE FROM todo_table WHERE id = ?', [id]).then(([tx, results]) => {
          console.log(results);
          resolve(results);
        });
      }).then((result) => {
        closeDatabase(db);
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
    });
  });  
}