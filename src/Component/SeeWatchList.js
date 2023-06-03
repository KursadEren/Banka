import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SeeWatchList = () => {
  const [exchangeRates, setExchangeRates] = useState({});
  const [selectedCurrencies, setSelectedCurrencies] = useState([]);

  useEffect(() => {
    fetchExchangeRates();
    getSelectedCurrencies();
    const interval = setInterval(() => {
      fetchExchangeRates();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

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

  const fetchExchangeRates = () => {
    const { manifest } = Constants;
    const apiAddress = `http://${manifest.debuggerHost.split(':').shift()}:5000`;
    axios
      .get(`${apiAddress}/users/doviz`)
      .then((response) => {
        if (response.status === 200) {
          setExchangeRates(response.data);
          getSelectedCurrencies(); // Kurlar güncellendiğinde seçili kurları kontrol et
        } else {
          console.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      {selectedCurrencies.includes('usd') && (
        <View style={styles.row}>
          <Text style={styles.cell}>USD/TRY</Text>
          <Text style={styles.cell}>{exchangeRates.usd_try}</Text>
          <Text style={styles.cell}>{(1 / exchangeRates.usd_try).toFixed(2)}</Text>
        </View>
      )}
      {selectedCurrencies.includes('eur') && (
        <View style={styles.row}>
          <Text style={styles.cell}>EURO/TRY</Text>
          <Text style={styles.cell}>{exchangeRates.euro_try}</Text>
          <Text style={styles.cell}>{(1 / exchangeRates.euro_try).toFixed(2)}</Text>
        </View>
      )}
      {selectedCurrencies.includes('gbp') && (
        <View style={styles.row}>
          <Text style={styles.cell}>GBP/TRY</Text>
          <Text style={styles.cell}>{exchangeRates.gbp_try}</Text>
          <Text style={styles.cell}>{(1 / exchangeRates.gbp_try).toFixed(2)}</Text>
        </View>
      )}
      {selectedCurrencies.includes('chf') && (
        <View style={styles.row}>
          <Text style={styles.cell}>CHF/TRY</Text>
          <Text style={styles.cell}>{exchangeRates.chf_try}</Text>
          <Text style={styles.cell}>{(1 / exchangeRates.chf_try).toFixed(2)}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
    marginHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  headerCell: {
    fontWeight: 'bold',
    flex: 1,
  },
  cell: {
    flex: 1,
  },
});

export default SeeWatchList;
