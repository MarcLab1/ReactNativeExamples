import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import PersonItem, {person} from './PersonItem';

const p1: person = {
  school: 'York',
  age: 1,
  name: {first: 'Mak', last: 'Ten'},
  grade: 77,
};

const TypeScreen = () => {
  return (
    <View>
      <Text>TypeScreen</Text>

      <PersonItem
        school={p1.school}
        age={p1.age}
        name={p1.name}
        grade={p1.grade}
      />
      {getThing('Billy')}
    </View>
  );
};

function getThing(name: string): JSX.Element {
  return (
    <View>
      <Text style={styles.thingText}>{name}</Text>
    </View>
  );
}
export default TypeScreen;

const styles = StyleSheet.create({
  thingText: {
    fontSize: 44,
    fontFamily: 'roboto',
    fontWeight: 'bold',
  },
});
