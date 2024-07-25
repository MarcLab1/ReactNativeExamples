import React, {useContext, useEffect, useState} from 'react';
import AppwriteContext from './AppwriteContext';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import LoggedinContent from './LoggedinContent';
import NotLoggedinContent from './NotLoggedinContent';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList2} from './AppwritePage';
import LoadingContent from '../loadingScreen/LoadingContent';

export type ControllerProps = NativeStackScreenProps<
  RootStackParamList2,
  'LoginController'
>;

const Controller = ({navigation, route}: ControllerProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {appwrite} = useContext(AppwriteContext);

  const [user, setUser] = useState('');
  const [isLogged, setIsLogged] = useState(false);

  const nav = useNavigation<NativeStackNavigationProp<any>>();

  const navigateToForgotPassword = (email: string) => {
    nav.navigate('ForgotPassword', {
      itemId: 333,
      anotherParam: 'dfds',
      email: email,
    });
  };

  async function handleLogout() {
    await appwrite.logout().then(() => {
      setUser('');
      // setIsLoggedIn(false);
      setIsLogged(false);
    });
  }

  const handleLogin = (userName: string, password: string) => {
    console.log('trying to login !!!');
    setIsLoading(true);
    const user = {
      email: userName,
      password: password,
    };
    appwrite
      .loginAccount(user)
      .then(response => {
        setIsLoading(false);
        if (response) {
          //setIsLoggedIn(true);
          setIsLogged(true);
          setUser(user.email);
        }
      })
      .catch(e => {
        console.log(e);
        setIsLoading(false);
        //setEmail('Incorrect email or password')
      });
  };

  useEffect(() => {
    appwrite
      .getCurrentUser()
      .then(response => {
        setIsLoading(false);
        if (response) {
          setUser(response.email);
          //setIsLoggedIn(true);
          setIsLogged(true);
        }
      })
      .catch(_ => {
        setIsLoading(false);
        //setIsLoggedIn(false);
        setIsLogged(false);

        console.log('no shit');
      });
  }, [appwrite]);

  if (isLoading) {
    return <LoadingContent />;
  }

  return isLogged == true ? (
    <LoggedinContent
      isLoggedIn={isLogged}
      user={user}
      logoutFunction={() => {
        handleLogout();
      }}
    />
  ) : (
    <NotLoggedinContent
      user={user}
      isLoggedIn={isLogged}
      navigateToForgotPassword={(email: string) => {
        navigateToForgotPassword(email);
      }}
      loginFunction={(userName: string, password: string) => {
        handleLogin(userName, password);
      }}
      navigateToCreateAccount={() => nav.navigate('CreateAccount')}
    />
  );
};

export default Controller;
