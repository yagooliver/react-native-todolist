import SQLite from "react-native-sqlite-storage";
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "TodoList.db";
const database_version = "1.0";
const database_displayname = "SQLite React Offline Database for todo list";
const database_size = 200000;

export const initDB = () => {
  let db;
  return new Promise((resolve) => {
    console.log("Plugin integrity check ...");
    SQLite.echoTest()
      .then(() => {
        console.log("Integrity check passed ...");
        console.log("Opening database ...");
        SQLite.openDatabase(
          database_name,
          database_version,
          database_displayname,
          database_size
        )
        .then(DB => {
          db = DB;
          console.log("Database OPEN");
          db.executeSql('SELECT 1 FROM todo_table LIMIT 1').then(() => {
          console.log("Database is ready ... executing query ...");
        })
        .catch((error) =>{
          console.log("Received error: ", error);
          console.log("Database not yet ready ... populating data");
          db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS todo_table(id INTEGER PRIMARY KEY AUTOINCREMENT, description VARCHAR(255), status INTEGER, type INTEGER, dateItem date)')})
            .then(() => {
              console.log("Table was successfully created");
            }).catch(error => {
              console.log(error);
             });
            });
          resolve(db);
        })
        .catch(error => {
          console.log(error);
        });
      })
    .catch(error => {
        console.log("echoTest failed - plugin not functional");
    });
  });
};

export const closeDatabase = (db) => {
  if (db) {
    console.log("Closing DB");
    db.close()
    .then(status => {
        console.log("Database CLOSED");
    })
    .catch(error => {
        console.log(error);
    });
  }else {
    console.log("Database was not OPENED");
  }
};