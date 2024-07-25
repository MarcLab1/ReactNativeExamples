import {
  Button,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import AppwriteContext from './AppwriteContext';
import {useRoute} from '@react-navigation/native';
import {styles} from '../constants/Styles';
import {FancyButtonDark, FancyButtonLight} from './FancyButton';

type NotLoggedinContentProps = {
  navigateToForgotPassword: Function;
  loginFunction: Function;
  isLoggedIn: boolean;
  user: string;
  navigateToCreateAccount: Function;
};

const NotLoggedinContent = ({
  navigateToForgotPassword,
  loginFunction,
  user,
  navigateToCreateAccount,
}: NotLoggedinContentProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [clicked, setClicked] = useState<boolean>(false);
  const [error, setError] = useState('');

  function handleLogin() {
    let noError = true;

    if (isEmpty(email)) {
      setError('email is empty');
      noError = false;
    } else if (isEmpty(password)) {
      setError('password is empty');
      noError = false;
    }
    if (noError) {
      loginFunction(email, password);
    }
  }

  function isEmpty(str: string) {
    return !str || str.length === 0;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={1}>
      <Text>{user}</Text>
      <Text
        onPress={() => {
          setClicked(!clicked);
        }}>
        {clicked.toString()}
      </Text>
      <Text>{error}</Text>
      <TextInput
        autoCapitalize="none"
        style={styles.textInput}
        value={email}
        onChangeText={t => setEmail(t)}
        placeholder="email"></TextInput>
      <TextInput
        autoCapitalize="none"
        style={styles.textInput}
        secureTextEntry
        value={password}
        onChangeText={t => setPassword(t)}
        placeholder="password"></TextInput>
      <FancyButtonDark
        title="login"
        onPress={() => {
          console.log(email + ' ' + password + ' ' + error);
          handleLogin();
        }}
      />
      <FancyButtonLight
        title="i forgot my password??!?!!?"
        onPress={() => {
          navigateToForgotPassword(email);
        }}
      />
      <FancyButtonDark
        title="create account"
        onPress={() => navigateToCreateAccount()}
      />
    </KeyboardAvoidingView>
  );
};

export default NotLoggedinContent;

const styles2 = StyleSheet.create({
  bigLogoImage: {
    marginTop: 100,
    height: 50,
    width: 50,
    alignSelf: 'center',
  },
});
