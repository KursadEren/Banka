import React, { useContext } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MyContext } from '../Context/Context';
import { useTranslation } from 'react-i18next';

const BilgiKarti = () => {
  const context = useContext(MyContext);
  const {theme, chechdoviz, islemtipi, secilendovizAdi, secilenDoviz } = context;
  const{t} = useTranslation()
  const screenWidth = Dimensions.get('window').width;
  const containerWidth = screenWidth * 0.9;
  const containerHeight = containerWidth * 0.55;

  return (
    <View style={[styles.container, { width: containerWidth, height: containerHeight,borderColor: theme === 'dark'? '#323232': "rgb(6, 70, 130)" }]}>
      <Text style={[styles.baslik,{color: theme ==='dark' ? 'white': 'black'}]}>{t('CurrencyTransaction')} </Text>
      <Text style={[styles.baslik,{color: theme ==='dark' ? 'white': 'black'}]}>{islemtipi}</Text>
      <View style={styles.veriContainer}>
        <Text style={[styles.dovizFiyat,{color: theme ==='dark' ? 'white': 'black'}]}>{secilendovizAdi}</Text>
        <Text style={[styles.dovizFiyat,{color: theme ==='dark' ? 'white': 'black'}]}>{secilenDoviz}</Text>
      </View>
      <View style={styles.bilgilendirme}>
        <AntDesign name="infocirlce" size={24} color="red" />
        <Text style={[styles.dovizFiyat,{color: theme ==='dark' ? 'white': 'black'}]}>{t('Information1')} </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    alignSelf: 'center',
    
  },
  baslik: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  veriContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dovizFiyat: {
    marginHorizontal: '5%',
    textAlign: 'center',
    fontSize: 15,
  },
  bilgilendirme: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default BilgiKarti;
