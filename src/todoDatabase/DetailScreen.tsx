import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Todo from './Todo';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Appbar, Icon} from 'react-native-paper';
import {deleteTodoItem, getDBConnection, updateTodoItem} from './db-service';
import Snackbar from 'react-native-snackbar';
import {DetailScreenProps, deleteItem, updateItem} from './HomeScreen';
import {SQLiteDatabase} from 'react-native-sqlite-storage';
import DetailAppbar from './DetailAppbar';
import {getDateString} from './TodoItem';

export const deleteImage = require('../images/images/delete.png');

function DetailScreen({route, navigation}: DetailScreenProps) {
  const todo = route.params?.todoProps2.todo;
  const [loading, setLoading] = useState<boolean>(true);
  const [database, setDatabase] = useState<SQLiteDatabase | null>(null);

  const initDatabase = useCallback(async () => {
    setLoading(true);
    try {
      const db = await getDBConnection();
      setDatabase(db);
    } catch (error) {
      Snackbar.show({
        text: 'Error loading todo',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  }, []);

  useEffect(() => {
    initDatabase();
  }, [initDatabase]);

  const [text, setText] = useState('');

  useEffect(() => {
    setText(todo!.value);
  }, []);

  async function handleDeleteItem(id: number) {
    await deleteItem(database!, id);
    navigation.goBack();
  }

  async function handleUpdateItem(
    id: number,
    value: string,
    date: string,
    completed: number,
  ) {
    await updateItem(database!, id, value, date, completed);
    navigation.goBack();
  }

  const deleteAlert = () =>
    Alert.alert('Delete', 'Are you sure you want to delete this todo?', [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          handleDeleteItem(todo!.id);
        },
      },
    ]);

  const {top} = useSafeAreaInsets(); //can use this instead of SafeAreaView

  const dateString = getDateString(todo!.date);

  return (
    <View style={{paddingTop: top}}>
      <DetailAppbar
        title={todo?.id + ''}
        onBackAction={() => {
          handleUpdateItem(todo!.id, text, todo!.date, todo!.completed);
        }}
        deleteAction={() => {
          deleteAlert();
        }}
      />
      <View style={styles.buttonStyleView}>
        <Text style={styles.buttonText}>Date</Text>
        <Text style={styles.buttonText}>{dateString.toDateString()}</Text>
      </View>
      <View>
        <TextInput
          textAlignVertical="top"
          multiline={true}
          style={styles.textInput}
          value={text}
          onChangeText={text => {
            setText(text);
          }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  appTitleView: {
    marginTop: 20,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  appTitleText: {
    fontSize: 24,
    fontWeight: '800',
  },
  textInput: {
    margin: 10,
    backgroundColor: '#F8F8F8',
    height: '89%',
  },
  buttonDark: {
    backgroundColor: '#000',
    color: '#fff',
  },
  buttonLight: {
    backgroundColor: '#fff',
    color: '#000',
  },
  textDark: {
    color: '#000',
  },
  textLight: {
    color: '#fff',
  },
  buttonText: {
    color: '#000',
  },

  buttonStyleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
});
export default DetailScreen;
