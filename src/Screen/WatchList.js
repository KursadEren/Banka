import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MyContext } from '../Context/Context';

const currencies = [
  { id: 'usd', name: 'Amerikan Doları' },
  { id: 'eur', name: 'Euro' },
  { id: 'gbp', name: 'İngiliz Sterlini' },
  { id: 'chf', name: 'İsviçre Frangı' },
];

const WatchList = ({ navigation }) => {
  const context = useContext(MyContext);
  const { sayfa, updateSayfa } = context;
  const [selectedCurrencies, setSelectedCurrencies] = useState([]);

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('HomeScreen');
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    // AsyncStorage'den seçili öğeleri al
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

  useEffect(() => {
    // Seçili öğeleri AsyncStorage'e kaydet
    const saveSelectedCurrencies = async () => {
      try {
        await AsyncStorage.setItem('selectedCurrencies', JSON.stringify(selectedCurrencies));
      } catch (error) {
        console.log(error);
      }
    };

    saveSelectedCurrencies();
  }, [selectedCurrencies]);

  const toggleSelection = (currencyId) => {
    const isSelected = selectedCurrencies.includes(currencyId);
    let updatedSelectedCurrencies;

    if (isSelected) {
      updatedSelectedCurrencies = selectedCurrencies.filter((id) => id !== currencyId);
    } else {
      updatedSelectedCurrencies = [...selectedCurrencies, currencyId];
    }

    setSelectedCurrencies(updatedSelectedCurrencies);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Döviz İsimleri</Text>
        <Text style={styles.headerText}>İşaretli</Text>
      </View>
      {currencies.map((currency) => (
        <View key={currency.id} style={styles.row}>
          <Text style={styles.currencyText}>{currency.name}</Text>
          <TouchableOpacity
            onPress={() => toggleSelection(currency.id)}
            style={[
              styles.button,
              selectedCurrencies.includes(currency.id) ? styles.selectedButton : styles.unselectedButton,
            ]}
          >
            <Text style={styles.buttonText}>
              {selectedCurrencies.includes(currency.id) ? 'İşaretlendi' : 'İşaretlenmedi'}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
      <Text>{sayfa}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  currencyText: {
    fontSize: 16,
    flex: 1,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#2196F3',
  },
  selectedButton: {
    backgroundColor: '#4CAF50',
  },
  unselectedButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
    textTransform: 'uppercase',
  },
});

export default WatchList;
