import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {fancyBlue} from '../constants/Styles';
import {Appbar, Icon, Searchbar} from 'react-native-paper';

type detailParams = {
  title: string;
  onBackAction: Function;
  deleteAction: Function;
};

const DetailAppbar = (detailParams: detailParams) => {
  const {title, onBackAction, deleteAction} = detailParams;

  return (
    <View>
      <Appbar.Header style={styles.background}>
        <Appbar.BackAction
          iconColor="white"
          onPress={() => {
            onBackAction();
          }}
        />
        <Appbar.Content
          onPress={() => {}}
          title={<Text style={styles.titleText}>{title}</Text>}
        />
        <Appbar.Action
          icon="delete"
          color="white"
          onPress={() => {
            deleteAction();
          }}
        />
      </Appbar.Header>
    </View>
  );
};

export default DetailAppbar;

const styles = StyleSheet.create({
  titleText: {
    fontFamily: 'Roboto',
    fontWeight: 'normal',
    fontSize: 14,
    color: 'white',
  },
  background: {
    backgroundColor: fancyBlue,
    color: 'white',
  },
});
