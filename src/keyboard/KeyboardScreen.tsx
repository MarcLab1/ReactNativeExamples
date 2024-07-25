import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';

const KeyboardScreen = () => {
  const [text, setText] = useState('');
  return (
    <View>
      <Text>alo??</Text>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={1}>
        <TextInput
          style={styles.textInput}
          value={text}
          onChangeText={t => {
            setText(t);
          }}></TextInput>
      </KeyboardAvoidingView>
    </View>
  );
};

export default KeyboardScreen;

const styles = StyleSheet.create({
  textInput: {borderWidth: 1, borderColor: 'grey', marginHorizontal: 10},
});
