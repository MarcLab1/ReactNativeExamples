import React, {useState} from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import Todo from './Todo';
import {fancyBlue} from '../constants/Styles';

export function getDateString(date: string): Date {
  return new Date(date);
}

export const updateImage = require('../images/images/check.png');
export const deleteImage = require('../images/images/delete.png');

export const TodoItem: React.FC<{
  todo: Todo;
  updateItem: Function;
  deleteItem: Function;
}> = ({todo, updateItem, deleteItem}) => {
  const dateString = getDateString(todo.date);
  const check = todo.completed ? true : false;
  //const textStyle = todo.completed ? styles.textContainerDone : null;
  const [checkbox, setTextbox] = useState(check);
  const backgroundColor = todo.completed ? '#D3D3D3' : 'white';

  return (
    <View style={[styles.todoContainer, {backgroundColor: backgroundColor}]}>
      <View style={[styles.todoInnerContainer]}>
        <Text>{todo.id} </Text>
        <Text style={[styles.textValue]}>{todo.value}</Text>
        <Text> {check} </Text>
        <Text style={[styles.textDate]}>{dateString.toDateString()}</Text>
      </View>

      <View style={styles.todoInnerContainer}>
        <TouchableHighlight
          onPress={() =>
            updateItem(todo.id, todo.value, todo.date, todo.completed)
          }>
          <Image style={styles.image} source={updateImage}></Image>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => deleteItem(todo.id)}>
          <Image style={styles.image} source={deleteImage}></Image>
        </TouchableHighlight>
      </View>
    </View>
  );
};
export const styles = StyleSheet.create({
  todoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    // borderBottomWidth: 2,
    borderTopWidth: 1,
    borderColor: 'grey',
  },
  todoInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textContainerDone: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  textValue: {
    flex: 0.55,
    fontSize: 16,
    fontWeight: '400',
  },
  textDate: {
    flex: 0.25,
    fontSize: 12,
    fontWeight: '400',
  },
  image: {
    height: 30,
    width: 30,
    marginHorizontal: 5,
    tintColor: fancyBlue,
  },
});
