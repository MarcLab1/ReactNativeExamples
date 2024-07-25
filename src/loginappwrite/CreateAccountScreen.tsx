import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList2} from './AppwritePage';
import {FancyButtonDark, FancyButtonLight} from './FancyButton';

type CreateAccountProps = NativeStackScreenProps<
  RootStackParamList2,
  'CreateAccount'
>;

const CreateAccountScreen = ({navigation, route}: CreateAccountProps) => {
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const createAccount = route.params?.createAccount!;

  function handleCreateAccount() {
    if (email.trim() == '') {
      setError('email is empty');
    } else if (password1 == '' || password2 == '') {
      setError('password is empty');
    } else if (password1 != password2) {
      setError('passwords do not match');
    }
    if (error != '') {
      createAccount(email, password1);
    }
  }

  return (
    <View>
      <Text>Create Account</Text>
      <TextInput
        value={email}
        placeholder="Email"
        onChangeText={t => setEmail(t)}></TextInput>
      <TextInput
        value={password1}
        placeholder="Password"
        onChangeText={t => setPassword1(t)}></TextInput>
      <TextInput
        value={password2}
        placeholder="Repeat Password"
        onChangeText={t => setPassword2(t)}></TextInput>
      <Text>{error}</Text>
      <FancyButtonLight
        title="submit"
        onPress={() => {
          handleCreateAccount();
        }}
      />
      <FancyButtonDark title="go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default CreateAccountScreen;

const styles = StyleSheet.create({});
