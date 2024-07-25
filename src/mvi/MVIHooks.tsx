import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

export default function MVIHooks() {
  const [screenState, setScreenState] = useState({
    clickCount: 0,
    text: '',
    isFunny: false,
    loading: true,
  });

  function incrementCount() {
    const newButtonCount = screenState.clickCount + 1;
    setScreenState({
      ...screenState,
      clickCount: newButtonCount,
    });
  }
  function changeText(newText: string) {
    setScreenState({
      ...screenState,
      text: newText,
    });
  }

  function changeImage() {
    const isFunny = screenState.isFunny;
    setScreenState({
      ...screenState,
      isFunny: !isFunny,
    });
  }

  function allFunctions(fun: string, params: string = '') {
    switch (fun) {
      case 'incrementCount':
        incrementCount();
        break;
      case 'changeText':
        changeText(params);
        break;
      case 'changeImage':
        changeImage();
        break;
      default:
        console.log(fun);
        break;
    }
  }

  return {
    screenState: screenState,
    changeText: changeText,
    incrementCount: incrementCount,
    changeImage: changeImage,
    allFunctions: allFunctions,
  };
}
