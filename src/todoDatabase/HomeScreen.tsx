import React, {UIEventHandler, useCallback, useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  getDBConnection,
  getTodoItems,
  createTable,
  deleteTodoItem,
  saveTodoItem,
  updateTodoItem,
  getTodoItemsNotCompleted,
} from './db-service';
import {SQLiteDatabase} from 'react-native-sqlite-storage';
import Snackbar from 'react-native-snackbar';
import Todo from './Todo';
import {TodoItem} from './TodoItem';
import {ActivityIndicator, Appbar, Icon} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  NavigationContainer,
  useFocusEffect,
  useIsFocused,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {fancyBlue, styles} from '../constants/Styles';
import {CollapsedItem} from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import {delay} from '../loadingScreen/LoadingContent';

type RootStackParamList = {
  Home: undefined; // undefined because you aren't passing any params to the home screen
  Detail: {todoProps2: todoProps2} | undefined;
  MVIScreen: undefined;
  ContainerComponent: undefined;
};

export const Stack = createNativeStackNavigator<RootStackParamList>();

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

type HomeProps = {
  navigation: HomeScreenNavigationProp;
};

export type DetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Detail'
>;

type todoProps = {
  id: number;
  value: string;
  date: string;
  completed: number;
};

type todoProps2 = {
  todo: Todo;
  //updateItem: Function;
  //deleteItem: Function;
};

export const deleteItem = async (database: SQLiteDatabase, id: number) => {
  try {
    await deleteTodoItem(database, id);
  } catch (error) {
    Snackbar.show({
      text: 'Error deleting todo',
      duration: Snackbar.LENGTH_SHORT,
    });
  }
};

export const updateItem = async (
  database: SQLiteDatabase,
  id: number,
  value: string,
  date: string,
  completed: number,
) => {
  try {
    const updatedTodo = new Todo(id, value, date, completed);
    await updateTodoItem(database, updatedTodo);
  } catch (error) {
    Snackbar.show({
      text: 'Error updating todo' + error,
      duration: Snackbar.LENGTH_SHORT,
    });
  }
};

function HomeScreen({navigation}: HomeProps) {
  const isFocused = useIsFocused();

  const [deletedTodo, setDeletedTodo] = useState<Todo>();
  const [text, setText] = useState('');
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [database, setDatabase] = useState<SQLiteDatabase | null>(null);

  async function handleDeleteItem(id: number) {
    await deleteItem(database!, id);
    updateTodosFromDatabase(database!);
  }

  async function handleUpdateItem(
    id: number,
    value: string,
    date: string,
    completed: number,
  ) {
    await updateItem(database!, id, value, date, completed);
    updateTodosFromDatabase(database!);
  }

  const updateTodosFromDatabase = async (db: SQLiteDatabase) => {
    setTodos(await getTodoItems(db));
  };

  const initDatabase = useCallback(async () => {
    setLoading(true);

    try {
      //await delay(1000);
      const db = await getDBConnection();
      setDatabase(db);
      await createTable(db);
      loadTodosFromDatabase(db);
    } catch (error) {
      Snackbar.show({
        text: 'Error loading todos',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      initDatabase();
    }
  }, [initDatabase, isFocused]);

  async function loadTodosFromDatabase(db: SQLiteDatabase) {
    const updatedTodos = await getTodoItems(db);
    setTodos(updatedTodos);
    setLoading(false);
  }

  const addTodo = async (todo: Todo) => {
    try {
      await saveTodoItem(database!, todo);
      setText('');
      updateTodosFromDatabase(database!);
    } catch (error) {
      Snackbar.show({
        text: 'Error adding todo' + error,
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  };

  return (
    /*loading ? (
    <View style={styles.loadingView}>
      <ActivityIndicator />
    </View>
  ) : */ <SafeAreaProvider>
      <View>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            value={text}
            onChangeText={text => {
              setText(text);
            }}
          />
          <Button
            onPress={() => {
              const todo = new Todo(
                todos.length == 0
                  ? 0
                  : todos.reduce((acc, cur) => {
                      if (cur.id > acc.id) return cur;
                      return acc;
                    }).id + 1,
                text,
                new Date().toDateString(),
              );
              addTodo(todo);
            }}
            title="Add Todo"
            accessibilityLabel="add todo item"
            color={fancyBlue}
          />
        </View>
        <FlatList
          style={{borderBottomWidth: 1, borderColor: 'grey'}}
          data={todos}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                const todo = new Todo(
                  item.id,
                  item.value,
                  item.date,
                  item.completed,
                );

                navigation.navigate('Detail', {
                  todoProps2: {todo},
                });
              }}>
              <TodoItem
                key={item.id}
                todo={item}
                updateItem={(
                  id: number,
                  value: string,
                  date: string,
                  completed: number,
                ) => {
                  handleUpdateItem(id, value, date, completed == 0 ? 1 : 0);
                }}
                deleteItem={(id: number) => {
                  handleDeleteItem(id);
                }}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => 'key' + item.id}></FlatList>
      </View>
    </SafeAreaProvider>
  );
}

export default HomeScreen;
