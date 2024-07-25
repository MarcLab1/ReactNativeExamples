import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import AppwriteContext from './AppwriteContext';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {styles} from '../constants/Styles';
import {RootStackParamList2} from './AppwritePage';
import {FancyButtonDark, FancyButtonLight} from './FancyButton';

type ForgotProps = NativeStackScreenProps<
  RootStackParamList2,
  'ForgotPassword'
>;

const ForgotPasswordScreen = ({navigation, route}: ForgotProps) => {
  const nav = useNavigation<NativeStackNavigationProp<any>>();

  const {appwrite} = useContext(AppwriteContext);
  const [email, setEmail] = useState('');
  const itemId = route.params?.itemId;
  const emailFromPrevScreen = route.params?.email ?? '';
  const anotherParam = route.params?.anotherParam;
  const [error, setError] = useState('');

  useEffect(() => {
    setEmail(emailFromPrevScreen);
  }, []);

  function handleForgotPassword() {
    if (email.trim() == '') {
      setError('email is empty');
    }
    if (error != '') {
      appwrite.forgotPassword(email);
    }
  }

  return (
    <View>
      <Text>ForgotPasswordScreen</Text>
      <Text>{itemId}</Text>
      <Text>{anotherParam}</Text>
      <TextInput
        style={styles.textInput}
        value={email}
        placeholder="email"
        onChangeText={t => setEmail(t)}></TextInput>
      <Text>{error}</Text>
      <FancyButtonLight title="submit" onPress={() => handleForgotPassword()} />
      <FancyButtonDark
        title="go back?"
        onPress={() => {
          nav.goBack();
        }}
      />
    </View>
  );
};

export default ForgotPasswordScreen;
