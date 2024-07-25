import React from 'react';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginController from './LoginController';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import CreateAccountScreen from './CreateAccountScreen';

export type ControllerProps = NativeStackScreenProps<
  RootStackParamList2,
  'LoginController'
>;

export type RootStackParamList2 = {
  LoginController: ControllerProps | undefined; // undefined because you aren't passing any params to the home screen
  CreateAccount: {createAccount: Function} | undefined;
  ForgotPassword:
    | {itemId: number; anotherParam: string; email: string}
    | undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList2>();

export default function AppwritePage() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginController">
        <Stack.Screen
          name="LoginController"
          component={LoginController}
          options={{headerShown: false, presentation: 'modal'}}
        />

        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{headerShown: false, presentation: 'modal'}}
        />
        <Stack.Screen
          name="CreateAccount"
          component={CreateAccountScreen}
          options={{headerShown: false, presentation: 'modal'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
