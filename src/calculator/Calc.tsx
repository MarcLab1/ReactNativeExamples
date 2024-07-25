import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CalcButton, {calcButtonProps} from './CalcButton';
import {TextInput} from 'react-native-paper';

const Calc = () => {
  const [text, setText] = useState('');
  const [numberLeft, setNumberLeft] = useState<number | null>(null);
  const [expression, setExpression] = useState<string | null>(null);

  function clearPress() {
    setText('');
    setExpression('');
    setNumberLeft(0);
  }
  function numberPress(number: string) {
    if (text == '0') setText(number);
    else setText(text + number);
  }

  function expressionPress(expression: string) {
    if (text == null || text == '') setNumberLeft(0);
    else setNumberLeft(parseFloat(text ?? 0));
    setExpression(expression);
    setText('');
  }

  function equalsPress() {
    const numberRight = parseInt(text);
    switch (expression) {
      case '+':
        setText((numberLeft ?? 0) + numberRight + '');
        break;
      case '-':
        setText((numberLeft ?? 0) - numberRight + '');
        break;
      case '*':
        setText((numberLeft ?? 0) * numberRight + '');
        break;
      case '/':
        setText((numberLeft ?? 0) / numberRight + '');
        break;
      default:
        setText(numberRight + '');
    }
    setExpression(null);
    setNumberLeft(null);
  }

  return (
    <View>
      <View style={styles.textView}>
        <TextInput
          value={text}
          placeholder="0"
          editable={false}
          style={styles.textInput8}></TextInput>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.textInput1}>{numberLeft ?? ''}</Text>
          <Text style={styles.textInput1}>{expression ?? ''}</Text>
        </View>
      </View>

      <View style={styles.buttonRow}>
        <CalcButton
          text="c"
          onPress={() => {
            clearPress();
          }}
        />
      </View>
      <View style={styles.buttonRow}>
        <CalcButton
          text="+"
          onPress={() => {
            expressionPress('+');
          }}
        />
        <CalcButton
          text="-"
          onPress={() => {
            expressionPress('-');
          }}
        />
        <CalcButton
          text="*"
          onPress={() => {
            expressionPress('*');
          }}
        />
        <CalcButton
          text="/"
          onPress={() => {
            expressionPress('/');
          }}
        />
        <CalcButton
          text="="
          onPress={() => {
            equalsPress();
          }}
        />
      </View>

      <View style={styles.buttonRow}>
        <CalcButton
          text="1"
          onPress={() => {
            numberPress('1');
          }}
        />
        <CalcButton
          text="2"
          onPress={() => {
            numberPress('2');
          }}
        />
        <CalcButton
          text="3"
          onPress={() => {
            numberPress('3');
          }}
        />
      </View>

      <View style={styles.buttonRow}>
        <CalcButton
          text="4"
          onPress={() => {
            numberPress('4');
          }}
        />
        <CalcButton
          text="5"
          onPress={() => {
            numberPress('5');
          }}
        />
        <CalcButton
          text="6"
          onPress={() => {
            numberPress('6');
          }}
        />
      </View>

      <View style={styles.buttonRow}>
        <CalcButton
          text="7"
          onPress={() => {
            numberPress('7');
          }}
        />
        <CalcButton
          text="8"
          onPress={() => {
            numberPress('8');
          }}
        />
        <CalcButton
          text="9"
          onPress={() => {
            numberPress('9');
          }}
        />
      </View>
      <View style={styles.buttonRow}>
        <CalcButton
          text="0"
          onPress={() => {
            numberPress('0');
          }}
        />
      </View>
    </View>
  );
};

export default Calc;

const styles = StyleSheet.create({
  textView: {
    flexDirection: 'row',
  },
  textInput8: {
    height: 30,
    flex: 8,
    marginEnd: 100,
  },
  textInput1: {
    borderWidth: 1,
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
  },
});
