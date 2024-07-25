import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import React, {useState} from 'react';
import {List} from 'react-native-paper';

const DataStructuresScreen = () => {
  enum Color {
    RED,
    GREEN,
    BLUE,
  }

  const array1: Array<string | null> = [];
  array1.push('Hello');
  array1.push('Good bye');
  const array2: Array<number> = [1, 2, 2, 3, 4];

  const array3: Array<any | null> = Array(['1', 2, 9, 'three', Color.RED]);

  const [array, setArray] = useState([1, 2, 3, 43, 54, 1, 2, 3, 1, 4, 2, 2]);
  const [dog, setDog] = useState('mojo');

  {
    array3.forEach((e, index) => {
      return <Text>{e}</Text>;
    });
  }

  function removeElementFromArray(input: Array<number>, num: number): number[] {
    return input.filter(item => item !== num);
  }

  return (
    <View>
      <Text>DataStructuresScreen</Text>
      <View style={{flexDirection: 'column'}}>
        {array.map((e, index) => (
          <TouchableHighlight
            onPress={() => {
              const result = removeElementFromArray(array, index);
              setArray(result);
            }}>
            <Text key={index + e}>
              {index} : {e}
            </Text>
          </TouchableHighlight>
        ))}
      </View>
    </View>
  );
};

export default DataStructuresScreen;

const styles = StyleSheet.create({});
