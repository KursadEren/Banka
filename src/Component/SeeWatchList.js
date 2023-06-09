import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MyContext } from '../Context/Context';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

const SeeWatchList = ({ navigation }) => {
  const [exchangeRates, setExchangeRates] = useState({});
  const [selectedCurrencies, setSelectedCurrencies] = useState([]);
  const context = useContext(MyContext);
  const { updateSayfa, sayfa,updatesetAlisSatisdoviz,alisSatisdoviz } = context;

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

  useEffect(() => {
    fetchExchangeRates();
    getSelectedCurrencies();
    const interval = setInterval(() => {
      fetchExchangeRates();
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleAlis = (currency) => {
    if (currency === 'usd') {
      console.log('alış yapıldı: USD');
      updatesetAlisSatisdoviz(exchangeRates.usd_try);
      navigation.navigate('islem')
      
    } else if (currency === 'chf') {
      console.log('alış yapıldı: CHF');
      updatesetAlisSatisdoviz(exchangeRates.chf_try);
      navigation.navigate('islem')
      
    } else if (currency === 'gbp') {
      console.log('alış yapıldı: gbp');
      updatesetAlisSatisdoviz(exchangeRates.gbp_try);
      navigation.navigate('islem')
    }
    else if (currency === 'eur') {
      console.log('alış yapıldı: eur');
      updatesetAlisSatisdoviz(exchangeRates.euro_try);
      navigation.navigate('islem')
    }
  };

  const handleSatis = (currency) => {
    if (currency === 'usd') {
      console.log('Satış yapıldı: USD');
      updatesetAlisSatisdoviz(exchangeRates.usd_try);
      navigation.navigate('islem')
      
    } else if (currency === 'chf') {
      console.log('Satış yapıldı: CHF');
      updatesetAlisSatisdoviz(exchangeRates.chf_try);
      navigation.navigate('islem')
      
    } else if (currency === 'gbp') {
      console.log('Satış yapıldı: gbp');
      updatesetAlisSatisdoviz(exchangeRates.gbp_try);
      navigation.navigate('islem')
    }
    else if (currency === 'eur') {
      console.log('Satış yapıldı: eur');
      updatesetAlisSatisdoviz(exchangeRates.euro_try);
      navigation.navigate('islem')
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerCell}>Döviz</Text>
        <Text style={styles.headerCell}>Alış</Text>
        <Text style={styles.headerCell}>Satış</Text>
      </View>
      {selectedCurrencies.includes('usd') && (
        <View style={styles.row}>
          <Text style={styles.currencyCell}>USD/TRY</Text>
          <TouchableOpacity style={styles.cell} onPress={() => handleAlis('usd')}>
            <Text style={styles.valueCell}>{exchangeRates.usd_try}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cell} onPress={() => handleSatis('usd')}>
            <Text style={styles.valueCell}>{(exchangeRates.usd_try - 0.5).toFixed(2)}</Text>
          </TouchableOpacity>
        </View>
      )}
      {selectedCurrencies.includes('eur') && (
        <View style={styles.row}>
          <Text style={styles.currencyCell}>EUR/TRY</Text>
          <TouchableOpacity  onPress={() => handleAlis('eur')}style={styles.cell}>
            <Text style={styles.valueCell}>{exchangeRates.euro_try}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSatis('eur')} style={styles.cell}>
            <Text style={styles.valueCell}>{(exchangeRates.euro_try - 0.5).toFixed(2)}</Text>
          </TouchableOpacity>
        </View>
      )}
      {selectedCurrencies.includes('gbp') && (
        <View style={styles.row}>
          <Text style={styles.currencyCell}>GBP/TRY</Text>
          <TouchableOpacity onPress={() => handleAlis('gbp')} style={styles.cell}>
            <Text style={styles.valueCell}>{exchangeRates.gbp_try}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSatis('gbp')} style={styles.cell}>
            <Text style={styles.valueCell}>{(exchangeRates.gbp_try - 0.5).toFixed(2)}</Text>
          </TouchableOpacity>
        </View>
      )}
      {selectedCurrencies.includes('chf') && (
        <View style={styles.row}>
          <Text style={styles.currencyCell}>CHF/TRY</Text>
          <TouchableOpacity style={styles.cell} onPress={() => handleAlis('chf')}>
            <Text style={styles.valueCell}>{exchangeRates.chf_try}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cell} onPress={() => handleSatis('chf')}>
            <Text style={styles.valueCell}>{(exchangeRates.chf_try - 0.5).toFixed(2)}</Text>
          </TouchableOpacity>
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
    backgroundColor: '#674fa3',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginHorizontal: width * 0.02,
    marginVertical: width * 0.02,
    fontSize: width * 0.04,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  currencyCell: {
    flex: 1,
    color: 'white',
    textAlign: 'left',
    marginLeft: width * 0.06,
    marginVertical: width * 0.02,
    fontSize: width * 0.04,
  },
  cell: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: 'white',
    marginHorizontal: width * 0.02,
    marginVertical: width * 0.02,
    paddingHorizontal: width * 0.06,
    paddingVertical: width * 0.01,
  },
  valueCell: {
    textAlign: 'center',
    color: 'white',
    fontSize: width * 0.04,
  },
});

export default SeeWatchList;
