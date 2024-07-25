import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import LoadingContent from '../loadingScreen/LoadingContent';

const AsyncScreen = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState(0);
  const [data, setData] = useState<Array<string>[] | null>(null);

  async function getSomethingElse() {}

  async function getSomething(): Promise<string> {
    await getSomethingElse();
    setNumber(number + 1);
    setData([]);
    if (number % 2 == 0) {
      const name = 'Billy';
      return 'Billy';
    } else {
      return 'Timmy';
    }
  }

  async function getNamed() {
    const name = await getSomething();
    setName(name);
  }

  useEffect(() => {
    getSomething();
  }, []);

  return data == null ? (
    <LoadingContent />
  ) : (
    <View>
      <Text
        onPress={() => {
          getNamed();
        }}>
        Hello,
        {name}
      </Text>
    </View>
  );
};

export default AsyncScreen;

const styles = StyleSheet.create({});
