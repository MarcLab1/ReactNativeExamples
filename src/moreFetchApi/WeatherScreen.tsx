import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LoadingContent from '../loadingScreen/LoadingContent';
import {styles} from '../constants/Styles';
import Snackbar from 'react-native-snackbar';
import {API_KEY_WEATHER} from '@env';

const WeatherScreen = () => {
  const check = require('../images/images/check.png');

  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState<IWeather>();
  const [city, setCity] = useState('');

  const api_key = API_KEY_WEATHER;

  const options = {
    method: 'GET',
    headers: {
      'x-api-key': api_key,
    },
  };

  interface IMain {
    temp: number;
  }

  interface IWeather {
    name: string;
    main: IMain;
  }

  function getTemp(temp: number): string {
    return (temp - 273.15).toFixed(1) + ' C';
  }

  async function getWeather(q: string) {
    setLoading(true);
    fetch('http://api.openweathermap.org/data/2.5/weather?q=' + q, options)
      .then(response => {
        if (response.ok) return response;
        else if (response.status === 404) {
          return Promise.reject('404 error');
        } else {
          return Promise.reject(response.status);
        }
      })
      .then(response => response.json())
      .then(data => setWeather(data))
      .catch(error => {
        Snackbar.show({
          text: error,
          duration: Snackbar.LENGTH_SHORT,
        });
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    getWeather('toronto');
  }, []);

  return loading ? (
    <LoadingContent />
  ) : (
    <View style={{flexDirection: 'column', marginEnd: 5}}>
      <View style={styles2.textInputRow}>
        <TextInput
          value={city}
          onChangeText={t => setCity(t)}
          placeholder="Enter city name"
          style={[styles2.flex8, styles.textInput]}></TextInput>

        <TouchableHighlight
          onPress={() => {
            getWeather(city);
          }}>
          <Image
            source={check}
            style={{height: 30, width: 30, alignSelf: 'center'}}></Image>
        </TouchableHighlight>
      </View>
      <Text>{weather?.name}</Text>
      <Text>{getTemp(weather?.main.temp ?? 0)}</Text>
    </View>
  );
};

export default WeatherScreen;

const styles2 = StyleSheet.create({
  flex8: {
    flex: 8,
  },
  flex1: {
    flex: 1,
  },
  textInputRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
