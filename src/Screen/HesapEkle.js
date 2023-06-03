import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HesapEkle = () => {
  const [selectedCurrencies, setSelectedCurrencies] = useState([]);

  useEffect(() => {
    const getSelectedCurrencies = async () => {
      try {
        const savedSelectedCurrencies = await AsyncStorage.getItem('selectedCurrencies');
        if (savedSelectedCurrencies !== null) {
          setSelectedCurrencies(JSON.parse(savedSelectedCurrencies));
        }
      } catch (error) {
        console.log(error);
      }
    };

    getSelectedCurrencies();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seçili Öğeler:</Text>
      {selectedCurrencies.map((currency) => (
        <Text key={currency}>{currency}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default HesapEkle;
