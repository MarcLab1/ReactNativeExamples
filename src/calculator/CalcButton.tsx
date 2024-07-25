import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export type calcButtonProps = {
  text: string;
  onPress: Function;
};

const CalcButton = ({text, onPress}: calcButtonProps) => {
  return (
    <View style={styles.calcButtonOutline}>
      <Text style={styles.calcButtonText} onPress={() => onPress()}>
        {text}
      </Text>
    </View>
  );
};

export default CalcButton;

const styles = StyleSheet.create({
  calcButtonOutline: {
    borderWidth: 1,
    borderColor: 'grey',
    paddingHorizontal: 8,
  },
  calcButtonText: {
    fontSize: 30,
    color: 'black',
  },
});
