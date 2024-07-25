import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';
import { Student } from './Student'
import { Course } from './Course';

const tableNameStudent = 'student';
const tableNameCourse = 'course'; 

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({ name: 'fake.db', location: 'default' });
};

export const createTables = async (db: SQLiteDatabase) => {

  const query1 = `CREATE TABLE IF NOT EXISTS ${tableNameStudent}(
        id INTEGER NOT NULL PRIMARY KEY,
        name TEXT NOT NULL,
        courseId REFERENCES Course(id)
    );`;

    const query2 = `CREATE TABLE IF NOT EXISTS ${tableNameCourse}(
        id INTEGER NOT NULL PRIMARY KEY,
        subject TEXT NOT NULL,
        
    );`;

  await db.executeSql(query1);
  await db.executeSql(query2);
};

export const getStudents = async (db: SQLiteDatabase): Promise<Student[]> => {
  try {
    const students: Student[] = [];
    const results = await db.executeSql(`SELECT rowid as id,name,courseId FROM ${tableNameStudent} ORDER BY id ASC`);
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        students.push(result.rows.item(index))
      }
    });
    return students;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get students');
  }
};


export const getCourses = async (db: SQLiteDatabase): Promise<Course[]> => {
    try {
      const courses: Course[] = [];
      const results = await db.executeSql(`SELECT rowid as id,subject FROM ${tableNameCourse} ORDER BY id ASC`);
      results.forEach(result => {
        for (let index = 0; index < result.rows.length; index++) {
          courses.push(result.rows.item(index))
        }
      });
      return courses;
    } catch (error) {
      console.error(error);
      throw Error('Failed to get courses');
    }
  };

export const insertCourses = async (db: SQLiteDatabase, courses: Course[]) => {
    const insertQuery =
    `INSERT OR REPLACE INTO ${tableNameCourse}(id, subject) values` +
    courses.map(i => `(${i.id}, '${i.subject}', `).join(',');
    return db.executeSql(insertQuery);
  };

  export const insertStudents = async (db: SQLiteDatabase, students: Student[]) => {
    const insertQuery =
    `INSERT OR REPLACE INTO ${tableNameStudent}(id, subject, courseId) values` +
    students.map(i => `(${i.id}, '${i.name}', '${i.courseId}'`).join(',');
    return db.executeSql(insertQuery);
  };
