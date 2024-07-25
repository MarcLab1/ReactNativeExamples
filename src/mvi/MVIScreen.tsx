import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import {deleteImage} from '../todoDatabase/DetailScreen';
import {updateImage} from '../todoDatabase/TodoItem';
import MVIHooks from './MVIHooks';

const MVIScreen = () => {
  const {screenState, changeText, incrementCount, changeImage, allFunctions} =
    MVIHooks();
  // const state = MVIHooks();
  const loading = screenState.loading;

  return !loading ? (
    <Text>loading</Text>
  ) : (
    <View>
      <TouchableHighlight onPress={() => allFunctions('changeImage')}>
        <View>
          <Text> {screenState.isFunny.toString()}</Text>
          {screenState.isFunny ? (
            <Image source={deleteImage} style={styles.deleteImage}></Image>
          ) : (
            <Image source={updateImage} style={styles.deleteImage}></Image>
          )}
        </View>
      </TouchableHighlight>
      <TextInput
        value={screenState.text}
        onChangeText={text => {
          changeText(text);
        }}></TextInput>
      <Text>{screenState.clickCount}</Text>
      <Button title="click" onPress={incrementCount}></Button>
    </View>
  );
};

export default MVIScreen;

const styles = StyleSheet.create({
  deleteImage: {
    height: 22,
    width: 22,
  },
});
