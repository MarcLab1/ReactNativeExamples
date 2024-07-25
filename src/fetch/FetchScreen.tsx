import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import LoadingContent from '../loadingScreen/LoadingContent';

const FetchScreen = () => {
  const [cat, setCat] = useState('');
  const [loading, setLoading] = useState(false);

  type Movie = {
    id: string;
    title: string;
    releaseYear: string;
  };

  const [data, setData] = useState<Movie[]>([]);

  const getMovies = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://reactnative.dev/movies.json');
      const json = await response.json();
      setData(json.movies);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  if (loading) {
    return <LoadingContent />;
  }
  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={({id}) => id}
        renderItem={({item}) => (
          <Text>
            {item.title}, {item.releaseYear}
          </Text>
        )}
      />
    </View>
  );
};

export default FetchScreen;

const styles = StyleSheet.create({
  imageStyle: {
    height: 100,
    width: 100,
  },
});
