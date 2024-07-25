import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CalcButton, {calcButtonProps} from './CalcButton';

const CalcRow = (props: calcButtonProps[]) => {
  return (
    <View style={styles.buttonRow}>
      <FlatList
        data={props}
        renderItem={({item}) => (
          <CalcButton text={item.text} onPress={item.onPress} />
        )}
        keyExtractor={(item, index) => 'key' + item.text}></FlatList>
    </View>
  );
};

export default CalcRow;

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
  },
});
