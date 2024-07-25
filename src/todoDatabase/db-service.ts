import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';
import Todo from './Todo';

const tableName = 'todoData';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({ name: 'todo0.db', location: 'default' });
};

export const createTable = async (db: SQLiteDatabase) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
        id INTEGER NOT NULL PRIMARY KEY,
        value TEXT NOT NULL,
        date TEXT NOT NULL,
        completed INTEGER 
    );`;

  await db.executeSql(query);
};

export const getTodoItems = async (db: SQLiteDatabase): Promise<Todo[]> => {
  try {
    const todoItems: Todo[] = [];
    const results = await db.executeSql(`SELECT rowid as id,value,date,completed FROM ${tableName} ORDER BY id ASC`);
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        todoItems.push(result.rows.item(index))
      }
    });
    return todoItems;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get todos');
  }
};

export const getTodoItemsNotCompleted = async (db: SQLiteDatabase) : Promise<Todo[]> =>{
  try {
    const todoItems: Todo[] = [];
    const results = await db.executeSql(`SELECT rowid as id,value,date,completed FROM ${tableName} WHERE completed=0 ORDER BY id ASC`);
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        todoItems.push(result.rows.item(index))
      }
    });
    return todoItems;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get todos');
  }
};

//also handles updates
export const saveTodoItems = async (db: SQLiteDatabase, todoItems: Todo[]) => {
  const insertQuery =
  `INSERT OR REPLACE INTO ${tableName}(id, value, completed) values` +
  todoItems.map(i => `(${i.id}, '${i.value}', '${i.date}' ${i.completed})`).join(',');
  return db.executeSql(insertQuery);
};

//also handles updates
export const saveTodoItem = async (db: SQLiteDatabase, todoItem: Todo) => {
    const insertQuery =
    `INSERT OR REPLACE INTO ${tableName} (id, value, date, completed) VALUES (${todoItem.id}, '${todoItem.value}', '${todoItem.date}', ${todoItem.completed} );`
    return db.executeSql(insertQuery);
  };
  
export const updateTodoItem = async (db: SQLiteDatabase, todoItem: Todo) => {
  const insertQuery =
  `REPLACE INTO ${tableName} (id, value, date, completed) VALUES (${todoItem.id}, '${todoItem.value}', '${todoItem.date}', ${todoItem.completed} );`
  return db.executeSql(insertQuery);
};

export const deleteTodoItem = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `DELETE from ${tableName} where id = ${id}`;
  await db.executeSql(deleteQuery);

};

export const deleteTable = async (db: SQLiteDatabase) => {
  const query = `drop table ${tableName}`;

};