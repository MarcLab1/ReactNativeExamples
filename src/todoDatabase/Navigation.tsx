import {DefaultTheme, NavigationContainer} from '@react-navigation/native';

import HomeScreen, {Stack} from './HomeScreen';
import DetailScreen, {deleteImage} from './DetailScreen';
import {Appbar} from 'react-native-paper';
import {fancyBlue} from '../constants/Styles';

export default function Navigation() {
  const MyDefaultTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
    },
  };

  return (
    <NavigationContainer theme={MyDefaultTheme}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: true,
            presentation: 'modal',
            title: 'Remind Me',
            headerTitleStyle: {
              fontFamily: 'Roboto',
              fontWeight: 'normal',
              fontSize: 14,
            },
            headerContent: {},
            headerStyle: {
              backgroundColor: fancyBlue,
            },
            statusBarColor: fancyBlue,
            navigationBarColor: fancyBlue,
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="Detail"
          options={{headerShown: false}}
          component={DetailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
