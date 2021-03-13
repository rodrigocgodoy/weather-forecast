import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, FlatList, View, Text } from 'react-native';
import * as Location from 'expo-location';

import api, { key } from '../../services/api';
import Menu from '../../components/Menu';
import Header from '../../components/Header';
import Conditions from '../../components/Conditions';
import Forecast from '../../components/Forecast';

const myList = [
  {
    "date": "11/03",
    "weekday": "Qui",
    "max": 25,
    "min": 16,
    "description": "Tempestades",
    "condition": "storm"
  },
  {
    "date": "12/03",
    "weekday": "Sex",
    "max": 26,
    "min": 17,
    "description": "Tempestades isoladas",
    "condition": "storm"
  },
  {
    "date": "13/03",
    "weekday": "Sáb",
    "max": 25,
    "min": 18,
    "description": "Tempestades",
    "condition": "storm"
  },
  {
    "date": "14/03",
    "weekday": "Dom",
    "max": 26,
    "min": 17,
    "description": "Tempestades",
    "condition": "storm"
  },
  {
    "date": "15/03",
    "weekday": "Seg",
    "max": 26,
    "min": 18,
    "description": "Tempestades",
    "condition": "storm"
  },
  {
    "date": "16/03",
    "weekday": "Ter",
    "max": 26,
    "min": 17,
    "description": "Tempestades",
    "condition": "storm"
  },
  {
    "date": "17/03",
    "weekday": "Qua",
    "max": 26,
    "min": 18,
    "description": "Tempestades",
    "condition": "storm"
  },
  {
    "date": "18/03",
    "weekday": "Qui",
    "max": 25,
    "min": 18,
    "description": "Tempestades",
    "condition": "storm"
  },
  {
    "date": "19/03",
    "weekday": "Sex",
    "max": 23,
    "min": 18,
    "description": "Tempestades isoladas",
    "condition": "storm"
  },
  {
    "date": "20/03",
    "weekday": "Sáb",
    "max": 25,
    "min": 17,
    "description": "Tempestades isoladas",
    "condition": "storm"
  }
];

const Home = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState([]);
  const [icon, setIcon] = useState({ name: 'cloud', color: '#FFF' });
  const [background, setBackground] = useState(['#1ed6ff', '#97c1ff']);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestPermissionsAsync();

      if (status !== 'granted') {
        setErrorMessage('Permission of access on location');
        setLoading(false);
        return;
      }

      const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});

      const { data, data: { results: { currently, condition_slug }} } = await api.get(`/weather?key=${key}&lat=${latitude}&lon=${longitude}`);

      setWeather(data);

      if (currently === 'noite' || currently === 'night') {
        setBackground(['#0c3741', '#0f2f61']);
      }

      switch (condition_slug) {
        case 'clear_day':
          setIcon({ name: 'partly-sunny', color: '#ffb300'});
          break;
        case 'rain':
          setIcon({ name: 'rainy', color: '#FFF'});
          break;
        case 'storm':
          setIcon({ name: 'rainy', color: '#FFF'});
          break;
      }

      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 17, fontStyle: 'italic' }}>Carregando dados ...</Text>
      </View>
    )
  };

  return (
    <SafeAreaView style={styles.container}>
      <Menu />
      <Header background={background} weather={weather} icon={icon} />
      <Conditions weather={weather} />
      <FlatList
        horizontal={true}
        contentContainerStyle={{ paddingBottom: '5%' }}
        style={styles.list}
        data={weather.results.forecast}
        keyExtractor={item => item.date}
        renderItem={({ item }) => <Forecast data={item} />}
      />
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8f0ff',
    paddingTop: '5%',
  },
  list: {
    marginTop: 10,
    marginLeft: 10,
  }
})

export default Home;