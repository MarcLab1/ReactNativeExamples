import {Button, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {StringViewModel} from './StringViewModel';

const StringScreen = () => {
  //const vm = StringViewModel();
  const {name, setName, doSomething, getSomething, cat} = StringViewModel();
  const dogImageUrl =
    'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?q=80&w=2683&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  /*
  useEffect(() => {
    getSomething();
  }, []);
  */

  //image source is an image, src is a string
  return (
    <View>
      <Text>StringScreen</Text>
      <Text>{name ?? 'nope'}</Text>
      <Button
        title="click me"
        onPress={() => {
          setName('Billy');
        }}></Button>
      <Button
        title="also click me"
        onPress={() => {
          doSomething();
        }}></Button>
      <Button
        title="get image"
        onPress={() => {
          getSomething();
        }}></Button>
      <Image style={{width: 100, height: 100}} src={cat ?? dogImageUrl}></Image>
    </View>
  );
};

export default StringScreen;

const styles = StyleSheet.create({});
