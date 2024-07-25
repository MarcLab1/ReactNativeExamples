import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {AppwriteContext} from './AppwriteContext';

type LoggedinContentProps = {
  user: string;
  logoutFunction: Function;
  isLoggedIn: boolean;
};

const LoggedinContent = ({
  user,
  logoutFunction,
  isLoggedIn,
}: LoggedinContentProps) => {
  const txt = isLoggedIn ? 'Logged in ' : 'not logged in';

  return (
    <View>
      <Text>LoggedinScreen</Text>
      <Text>{txt}</Text>
      <Text>{user}</Text>
      <Button title="log out" onPress={() => logoutFunction()} />
    </View>
  );
};

export default LoggedinContent;

const styles = StyleSheet.create({});
