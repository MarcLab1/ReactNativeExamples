import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ApiService, MyComponent} from './ApiService';

const UserScreen = () => {
  // Creating an instance of the ApiService
  const apiService = new ApiService();

  // Creating an instance of the MyComponent with the ApiService injected
  const myComponent = new MyComponent(apiService);

  const [name, setName] = useState('');

  useEffect(() => {
    // Using the MyComponent to fetch data
    //myComponent.fetchData();
  }, []);

  return (
    <View>
      <Text>UserScreen</Text>
      <Text>{name}</Text>
      <Text onPress={() => {}}></Text>
    </View>
  );
};

export default UserScreen;

const styles = StyleSheet.create({});
