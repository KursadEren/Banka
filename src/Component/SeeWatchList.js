import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
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
  const {updatesetErrorText,optiondoviz,chechdoviz,updatesetChechdoviz,updatesetIslemtipi,updatesetsecilendovizAdi,   updatesetSecilenDoviz,secilenDoviz, updatesetalisSatisEuro,updatesetalisSatisSterlin,updatesetalisSatisddolar,updatesetalisSatisfrang,} = context;

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

  const request = ({ currency }) => {
    console.log('currency',currency)
    const dovizadi = currency;
    const { manifest } = Constants;
    const apiAddress = `http://${manifest.debuggerHost.split(':').shift()}:5000`;
    axios
      .get(`${apiAddress}/users/dovizgetir/${dovizadi}`)
      .then((response) => {
        if (response.status === 200) {
          if (response.data) {
            
            updatesetChechdoviz(response.data[0].doviztipiid);
            
          } else {
            console.error('Boş yanıt alındı.');
          }
        } else {
          console.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  

  const handleAlis = (currency) => {

    const bulunanVeri = optiondoviz.find(veri => veri.dovizadi === currency);

    if (bulunanVeri) {
      console.log("Doviz Tipi ID:", bulunanVeri.doviztipiid);
      updatesetErrorText("")
    } else {
      updatesetErrorText("Belirtilen döviz hesabı bulunamadı.");
      return
    }
    updatesetIslemtipi('Alım')

    if (currency === 'Amerikan Doları') {
      
      updatesetsecilendovizAdi(currency);
      updatesetSecilenDoviz(exchangeRates.usd_try);
      updatesetalisSatisEuro(exchangeRates.euro_try);
      updatesetalisSatisSterlin(exchangeRates.gbp_try);
      updatesetalisSatisfrang(exchangeRates.chf_try);
      request({currency});
      navigation.navigate('islem')
      
    } else if (currency === 'İsviçre Frangı') {
      
      updatesetsecilendovizAdi(currency);
      updatesetalisSatisddolar(exchangeRates.usd_try);
      updatesetalisSatisEuro(exchangeRates.euro_try);
      updatesetalisSatisSterlin(exchangeRates.gbp_try);
      updatesetSecilenDoviz(exchangeRates.chf_try);
      request({currency});
      navigation.navigate('islem')
      
    } else if (currency === 'İngiliz Sterlini') {
      
      updatesetsecilendovizAdi(currency);
      updatesetalisSatisddolar(exchangeRates.usd_try);
      updatesetalisSatisEuro(exchangeRates.euro_try);
      updatesetSecilenDoviz(exchangeRates.gbp_try);
      updatesetalisSatisfrang(exchangeRates.chf_try);
      request({currency});
      navigation.navigate('islem')
    }
    else if (currency === 'Euro') {
      updatesetsecilendovizAdi(currency);
      updatesetalisSatisddolar(exchangeRates.usd_try);
      updatesetSecilenDoviz(exchangeRates.euro_try);
      updatesetalisSatisSterlin(exchangeRates.gbp_try);
      updatesetalisSatisfrang(exchangeRates.chf_try);
      request({currency});
      navigation.navigate('islem')
    }
  };

  const handleSatis = (currency) => {
    const bulunanVeri = optiondoviz.find(veri => veri.dovizadi === currency);
      
    if (bulunanVeri) {
      console.log("Doviz Tipi ID:", bulunanVeri.doviztipiid);
      updatesetErrorText("")
    } else {
      updatesetErrorText("Belirtilen döviz hesabı bulunamadı.");
      return
    }
  
    updatesetIslemtipi('Satış')
    if (currency === 'Amerikan Doları') {
      console.log(currency)
      updatesetsecilendovizAdi(currency);
      updatesetSecilenDoviz(exchangeRates.usd_try);
      updatesetalisSatisEuro(exchangeRates.euro_try);
      updatesetalisSatisSterlin(exchangeRates.gbp_try);
      updatesetalisSatisfrang(exchangeRates.chf_try);
      request({currency});
     
      navigation.navigate('islem')
      
    } else if (currency === 'İngiliz Sterlini') {
      
      updatesetsecilendovizAdi(currency);
      updatesetalisSatisddolar(exchangeRates.usd_try);
      updatesetalisSatisEuro(exchangeRates.euro_try);
      updatesetSecilenDoviz(exchangeRates.gbp_try);
      updatesetalisSatisfrang(exchangeRates.chf_try);
      request({currency});
      navigation.navigate('islem')
      
    } else if (currency === 'İsviçre Frangı') {
      
      updatesetsecilendovizAdi(currency);
      updatesetalisSatisddolar(exchangeRates.usd_try);
      updatesetalisSatisEuro(exchangeRates.euro_try);
      updatesetalisSatisSterlin(exchangeRates.gbp_try);
      updatesetSecilenDoviz(exchangeRates.chf_try);
      request({currency});
      
      navigation.navigate('islem')
    }
    else if (currency === 'Euro') {
      
      updatesetsecilendovizAdi(currency);
      updatesetalisSatisddolar(exchangeRates.usd_try);
      updatesetSecilenDoviz(exchangeRates.euro_try);
      updatesetalisSatisSterlin(exchangeRates.gbp_try);
      updatesetalisSatisfrang(exchangeRates.chf_try);
      request({currency});
      
      navigation.navigate('islem')
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerCell}>Döviz</Text>
        <Text style={styles.headerCell}>Alış</Text>
        <Text style={styles.headerCell}>Satış</Text>
      </View>
      {selectedCurrencies.includes('usd') && (
        <View style={styles.row}>
          <Text style={styles.currencyCell}>USD/TRY</Text>
          <TouchableOpacity style={styles.cell} onPress={() => handleAlis('Amerikan Doları')}>
            <Text style={styles.valueCell}>{exchangeRates.usd_try}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cell} onPress={() => handleSatis('Amerikan Doları')}>
            <Text style={styles.valueCell}>{(exchangeRates.usd_try - 0.5).toFixed(2)}</Text>
          </TouchableOpacity>
        </View>
      )}
      {selectedCurrencies.includes('eur') && (
        <View style={styles.row}>
          <Text style={styles.currencyCell}>EUR/TRY</Text>
          <TouchableOpacity  onPress={() => handleAlis('Euro')}style={styles.cell}>
            <Text style={styles.valueCell}>{exchangeRates.euro_try}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSatis('Euro')} style={styles.cell}>
            <Text style={styles.valueCell}>{(exchangeRates.euro_try - 0.5).toFixed(2)}</Text>
          </TouchableOpacity>
        </View>
      )}
      {selectedCurrencies.includes('gbp') && (
        <View style={styles.row}>
          <Text style={styles.currencyCell}>GBP/TRY</Text>
          <TouchableOpacity onPress={() => handleAlis('İngiliz Sterlini')} style={styles.cell}>
            <Text style={styles.valueCell}>{exchangeRates.gbp_try}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSatis('İngiliz Sterlini')} style={styles.cell}>
            <Text style={styles.valueCell}>{(exchangeRates.gbp_try - 0.5).toFixed(2)}</Text>
          </TouchableOpacity>
        </View>
      )}
      {selectedCurrencies.includes('chf') && (
        <View style={styles.row}>
          <Text style={styles.currencyCell}>CHF/TRY</Text>
          <TouchableOpacity style={styles.cell} onPress={() => handleAlis('İsviçre Frangı')}>
            <Text style={styles.valueCell}>{exchangeRates.chf_try}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cell} onPress={() => handleSatis('İsviçre Frangı')}>
            <Text style={styles.valueCell}>{(exchangeRates.chf_try - 0.5).toFixed(2)}</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
    marginHorizontal: 16,
    backgroundColor: 'rgb(6, 70, 130)',
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
    marginVertical: width * 0.03,
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
