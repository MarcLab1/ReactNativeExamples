import React, {useRef, useEffect} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import type {PropsWithChildren} from 'react';
import type {ViewStyle} from 'react-native';

type FadeInViewProps = PropsWithChildren<{style: ViewStyle}>;

const FadeInView: React.FC<FadeInViewProps> = props => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 4000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}>
      {props.children}
    </Animated.View>
  );
};

// You can then use your `FadeInView` in place of a `View` in your components:
export default () => {
  return (
    <View style={styles.viewStyle1}>
      <View>
        <Text>alksdjflkj</Text>
        <FadeInView style={styles.fadeViewStyle1}>
          <Text style={styles.textStyle1}>Fading in</Text>
        </FadeInView>
      </View>

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <FadeInView style={styles.fadeViewStyle1}>
          <Text>Fading in again?</Text>
        </FadeInView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fadeViewStyle1: {
    width: 250,
    height: 100,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewStyle1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle1: {
    fontSize: 33,
    alignSelf: 'center',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
