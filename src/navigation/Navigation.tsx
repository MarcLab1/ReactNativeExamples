import * as React from 'react';
import {View, Text, Button} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import MyAppbar from '../appbar/MyAppbar';

type RootStackParamList = {
  Home: {userId: string} | undefined;
  Detail: {userId: string} | undefined;
};
export const Stack = createNativeStackNavigator<RootStackParamList>();
type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
type DetailProps = NativeStackScreenProps<RootStackParamList, 'Detail'>;

type MyDetailProps = {
  userId: string;
};

function HomeScreen({route, navigation}: HomeProps) {
  const nav = useNavigation<NativeStackNavigationProp<any>>();
  const userId: string = route.params?.userId ?? ' nothing ';

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Text>{userId}</Text>
      <Button
        onPress={() => {
          nav.navigate('Detail', {userId: 'hello'});
        }}
        title="click to go"></Button>
    </View>
  );
}

function DetailScreen({route, navigation}: DetailProps) {
  const nav = useNavigation<NativeStackNavigationProp<any>>();
  const userId: string = route.params?.userId ?? ' nothing ';

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <MyAppbar />
      <Text>detail Screen</Text>
      <Text>userId = {userId}</Text>
      <Text
        onPress={() => {
          nav.pop();
        }}>
        click to go back
      </Text>
    </View>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
