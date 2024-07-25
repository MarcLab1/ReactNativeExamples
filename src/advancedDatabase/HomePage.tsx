import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Student} from './Student';
import {Course} from './Course';
import {
  createTables,
  getCourses,
  getDBConnection,
  getStudents,
  insertCourses,
  insertStudents,
} from './db-service';
import {SQLiteDatabase} from 'react-native-sqlite-storage';
import Snackbar from 'react-native-snackbar';

const HomePage = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);

  const initDatabase = useCallback(async () => {
    try {
      //const db = await getDBConnection();
      //await createTables(db);

      const courses: Course[] = [
        new Course(1, 'Math'),
        new Course(2, 'History'),
        new Course(3, 'Science'),
      ];
      //insertCourses(db, courses);
      const students: Student[] = [
        new Student(100, 'Marc', 1),
        new Student(101, 'Jin', 2),
        new Student(102, 'Austin', 3),
      ];
      //insertStudents(db, students);

      //const result1 = await getStudents(db);
      //setStudents(result1);

      //const result2 = await getCourses(db);
      //setCourses(result2);
    } catch (error) {
      Snackbar.show({
        text: 'Error loading',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  }, []);

  useEffect(() => {
    //initDatabase();
  }, []);

  return (
    <View>
      <Text>Courses</Text>
      <FlatList
        style={{borderBottomWidth: 1, borderColor: 'grey'}}
        data={courses}
        renderItem={({item}) => (
          <Text>
            {item.id} {item.subject}
          </Text>
        )}
        keyExtractor={(item, index) => 'key' + item.id}></FlatList>
      <View style={{borderWidth: 10}}></View>
      <Text>Students</Text>
      <FlatList
        style={{borderBottomWidth: 1, borderColor: 'grey'}}
        data={students}
        renderItem={({item}) => (
          <Text>
            {item.id} {item.name} {item.courseId}
          </Text>
        )}
        keyExtractor={(item, index) => 'key' + item.id}></FlatList>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({});
