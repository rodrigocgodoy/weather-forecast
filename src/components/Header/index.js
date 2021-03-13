import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const Header = ({ background, weather: { results: { date, city_name, temp }}, icon, isShowIcon = true, children }) => {
  return (
    <LinearGradient
      style={{
        ...styles.header,
        height: isShowIcon ? '55%' : '45%',
        paddingTop: isShowIcon ? 0 : 45,
        paddingBottom: isShowIcon ? 0 : 45
      }}
      colors={background}
    >
      <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <Text style={styles.date}>{date}</Text>
        <Text style={{ ...styles.city, marginBottom: isShowIcon ? 0 : 25 }}>{city_name}</Text>
        {isShowIcon && <Ionicons name={icon.name} color={icon.color} size={150} />}
        <Text style={styles.temp}>{temp}°</Text>
      </View>
      {children && (
        <View style={{ marginTop: 45, marginRight: 10, marginLeft: 10 }}>
          {children}
        </View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '95%',
    height: '55%',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 8,
  },
  date: {
    color: '#FFF',
    fontSize: 17,
  },
  city: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  temp: {
    color: '#FFF',
    fontSize: 80,
    fontWeight: 'bold',
  },
})

export default Header;