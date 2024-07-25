import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export type person = {
  school: string;
  age: number;
  name: {
    first: string;
    last: string;
  };
  grade?: number; //optional parameter
};

const PersonItem = (person: person) => {
  //const {school, age, name} = person;
  const age = person.age;
  const school = person.school;
  const name = person.name;
  const grade = person.grade;

  return (
    <View>
      <Text>{school}</Text>
      <Text>{age}</Text>
      <Text>{name.first}</Text>
      <Text>{name.last}</Text>
      <Text>{grade}</Text>
    </View>
  );
};

export default PersonItem;

const styles = StyleSheet.create({});
