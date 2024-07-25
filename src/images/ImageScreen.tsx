import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ImageScreen = () => {
  const logo = require('./images/logo.png');
  const check = require('./images/check.png');

  return (
    <View>
      <Text>ImageScreen</Text>
      <Image source={logo} style={styles.logoStyle} />
      <Image source={check} style={styles.checkStyle} />
    </View>
  );
};

export default ImageScreen;

const styles = StyleSheet.create({
  logoStyle: {
    height: 100,
    width: 100,
  },

  checkStyle: {
    alignSelf: 'center',
    height: 25,
    width: 25,
  },
});
