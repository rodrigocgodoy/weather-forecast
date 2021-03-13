import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, TextInput, Keyboard } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import api, { key } from '../../services/api';
import Conditions from '../../components/Conditions';
import Header from '../../components/Header';

const Search = () => {
  const navigation = useNavigation();

  const [input, setInput] = useState('');
  const [city, setCity] = useState(null);
  const [error, setError] = useState(null);
  const [background, setBackground] = useState(['#1ed6ff', '#97c1ff']);

  const handleSearch = async () => {
    const { data: { by, currently }, data } = await api.get(`/weather?key=${key}&city_name=${input}`);

    if (by === 'default') {
      setError('Hmm, cidade não encontrada');
      setInput('');
      setCity(null);
      Keyboard.dismiss();
      return;
    }
    
    setCity(data);
    if (currently === 'noite' || currently === 'night') {
      setBackground(['#0c3741', '#0f2f61']);
    }
    setInput('');
    setError(null);
    Keyboard.dismiss();
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
        <Feather name="chevron-left" size={32} color="#000" />
        <Text style={{ fontSize: 22 }}>Voltar</Text>
      </TouchableOpacity>

      <View style={styles.searchBox}>
        <TextInput value={input} onChangeText={(value) => setInput(value)} placeholder="Ex: Cajamar, SP" style={styles.input} />
        <TouchableOpacity style={styles.icon} onPress={() => handleSearch()}>
          <Feather name="search" size={22} color="#FFF" />
        </TouchableOpacity>
      </View>

      {error && <Text style={{ marginTop: 25, fontSize: 18 }}>{error}</Text>}
      {city && (
        <View style={{ marginTop: 25, flex: 1 }}>
          <Header isShowIcon={false} background={background} weather={city} >
            <Conditions weather={city} />
          </Header>
        </View>
      )}
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '10%',
    backgroundColor: '#e8f0ff',
  },
  backButton: {
    flexDirection: 'row',
    marginLeft: 15,
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchBox: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#ddd',
    width: '90%',
    height: 50,
    borderRadius: 8,
  },
  input: {
    width: '85%',
    height: 50,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    padding: 7,
  },
  icon: {
    width: '15%',
    backgroundColor: '#1ed6ff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
  }
});

export default Search;