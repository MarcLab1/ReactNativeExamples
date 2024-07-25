import {Pressable, StyleSheet, Text} from 'react-native';
import {fancyBlue} from '../constants/Styles';

type fancyButtonProps = {
  title: string;
  onPress: Function;
};

export function FancyButtonLight(props: fancyButtonProps) {
  const {onPress, title = 'Save'} = props;

  return (
    <Pressable
      style={[styles.button, styles.buttonLight]}
      onPress={() => onPress()}>
      <Text style={[styles.text, styles.textDark]}>{title}</Text>
    </Pressable>
  );
}

export function FancyButtonDark(props: fancyButtonProps) {
  const {onPress, title = 'Cancel'} = props;

  return (
    <Pressable
      style={[styles.button, styles.buttonDark]}
      onPress={() => onPress()}>
      <Text style={[styles.text, styles.textLight]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 3,
    paddingVertical: 10,
    marginHorizontal: 10,
    borderRadius: 4,
    elevation: 3,
  },
  buttonLight: {
    backgroundColor: 'white',
  },
  buttonDark: {
    backgroundColor: fancyBlue,
  },
  text: {
    fontSize: 16,
  },
  textLight: {
    color: 'white',
  },
  textDark: {
    color: fancyBlue,
  },
});
