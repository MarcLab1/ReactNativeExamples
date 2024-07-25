import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const LoadingContent = () => {
  return (
    <View style={styles.loadingView}>
      <ActivityIndicator />
    </View>
  );
};

export default LoadingContent;

export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const styles = StyleSheet.create({
  loadingView: {
    flex: 1,
    justifyContent: 'center',
  },
});
