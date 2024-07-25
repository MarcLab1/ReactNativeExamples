import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Appbar} from 'react-native-paper';

const MyAppbar = () => {
  return (
    <SafeAreaProvider>
      <View>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => {}} />
          <Appbar.Content
            onPress={() => {}}
            title={
              <TouchableOpacity
                onPress={() => {}}
                style={{flexDirection: 'row', backgroundColor: 'red'}}>
                <Text style={{color: 'black', fontSize: 21}}>delete</Text>
              </TouchableOpacity>
            }
            style={{backgroundColor: 'pink', flex: 0}}
          />
        </Appbar.Header>
      </View>
      <View>
        <Text>alo?</Text>
      </View>
    </SafeAreaProvider>
  );
};

export default MyAppbar;
