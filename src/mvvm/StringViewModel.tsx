import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

export function StringViewModel() {
  const [name, setName] = useState<string | null>(null);
  const [cat, setCat] = useState<string | null>(null);

  const doSomething = async () => {
    setName('Hilly Billy Jimmy');
  };

  const getSomething = async () => {
    try {
      await sleep(1000);
      await setCat('https://cdn2.thecatapi.com/images/663.jpg');
    } catch (error) {}
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  return {name, setName, doSomething, getSomething, cat};
}
