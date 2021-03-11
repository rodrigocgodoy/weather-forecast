import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { conditionIcon } from '../../utils/condition';

const Header = ({ data: { date, min, max, condition } }) => {
  const icon = conditionIcon(condition);

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{date}</Text>
      <Ionicons name={icon.name} color={icon.color} size={25} />
      <View style={styles.temp}>
        <Text>{min}°</Text>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{max}°</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    marginLeft: 12,
    borderRadius: 8,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 14,
    paddingRight: 14,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  date: {
    fontSize: 14,
  },
  temp: {
    alignItems: 'center',
  }
})

export default Header;