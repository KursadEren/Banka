import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MyContext } from '../Context/Context';
import { useTranslation } from 'react-i18next';

const currencies = [
  { id: 'usd', name: 'Amerikan Doları' },
  { id: 'eur', name: 'Euro' },
  { id: 'gbp', name: 'İngiliz Sterlini' },
  { id: 'chf', name: 'İsviçre Frangı' },
];

const WatchList = ({ navigation }) => {
  
   const context = useContext(MyContext);
  const { sayfa, updateSayfa,theme } = context;
  const [selectedCurrencies, setSelectedCurrencies] = useState([]);
 const {t} = useTranslation()
  useEffect(() => {
    const backAction = () => {
      navigation.navigate('HomeScreen');
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
        updateSayfa('Watchlist')
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
    <View style={[styles.container,{backgroundColor: theme === 'dark'? '#1e1e1e':'rgb(218, 231, 237)  ' }]}>
      <View style={[styles.header,{backgroundColor:theme ==='dark'? '#1e1e1e':'rgb(218, 231, 237)'}]}>
        <Text style={[styles.headerText,{color:theme === 'dark' ? '#ccc': 'black' }]}>{t('CurrencyName')} </Text>
      </View>
      <View style={styles.content}>
        {currencies.map((currency) => (
          <TouchableOpacity
            key={currency.id}
            onPress={() => toggleSelection(currency.id)}
            style={[
              styles.row,
              selectedCurrencies.includes(currency.id) ? styles.selectedRow : styles.unselectedRow,
            ]}
          >
            <Text style={styles.currencyText}>{currency.name}</Text>
            <View
              style={[
                styles.button,
                selectedCurrencies.includes(currency.id) ? styles.selectedButton : styles.unselectedButton,
              ]}
            >
              <Text style={styles.buttonText}>
                {selectedCurrencies.includes(currency.id) ? `${t('Checked')}` : `${t('Unchecked')}`}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.footer}>
        <Text style={[styles.footerText,{color: theme ==='dark'? '#ccc':'black' }]}>{t('Watchlist')} </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(218, 231, 237)',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  selectedRow: {
    backgroundColor: '#E3FCEF',
  },
  unselectedRow: {
    backgroundColor: '#F5F5F5',
  },
  currencyText: {
    fontSize: 16,
    flex: 1,
    color: '#000',
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
  footer: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  footerText: {
    fontSize: 16,
  },
});

export default WatchList;
