import {View, Text, Image, Button, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import LoadingContent from '../loadingScreen/LoadingContent';
import {API_KEY_CAT} from '@env';

const CatScreen = () => {
  const [catUrl, setCatUrl] = useState('');
  const [catUrls, setCatUrls] = useState<ICatData[]>([]);
  const [loading, setLoading] = useState(true);
  const api_key = API_KEY_CAT;

  interface ICatData {
    url: string;
    width: number;
    height: number;
    id: string;
  }

  const options = {
    method: 'GET',
    headers: {
      'x-api-key': api_key,
    },
  };

  async function getCatImage() {
    setLoading(true);
    fetch('https://api.thecatapi.com/v1/images/search', options)
      .then(response => response.json())
      .then(data => setCatUrl(data[0].url))
      .then(() => {
        setLoading(false);
      })
      .catch(error => console.error(error));
  }

  async function getCatImages() {
    setLoading(true);
    fetch('https://api.thecatapi.com/v1/images/search?limit=3', options)
      .then(response => response.json())
      .then(data => {
        setCatUrls(data);
        console.log('>>> ' + data);
      })
      .then(() => {
        setLoading(false);
      })
      .catch(error => console.error(error));
  }

  useEffect(() => {
    getCatImages();
  }, []);

  return loading ? (
    <LoadingContent />
  ) : (
    <View>
      <FlatList
        data={catUrls}
        renderItem={({item}) => (
          <View>
            <Text>{item.id}</Text>
            <Image
              src={item.url}
              style={{height: item.height, width: item.width}}></Image>
          </View>
        )}></FlatList>
    </View>
  );
};

export default CatScreen;
