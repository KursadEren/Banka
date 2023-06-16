import React, { useContext } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MyContext } from '../Context/Context';

const BilgiKarti = () => {
  const context = useContext(MyContext);
  const { chechdoviz, islemtipi, secilendovizAdi, secilenDoviz } = context;

  const screenWidth = Dimensions.get('window').width;
  const containerWidth = screenWidth * 0.9;
  const containerHeight = containerWidth * 0.55;

  return (
    <View style={[styles.container, { width: containerWidth, height: containerHeight }]}>
      <Text style={styles.baslik}>İşlem Yapılacak Kur</Text>
      <Text style={styles.baslik}>{islemtipi}</Text>
      <View style={styles.veriContainer}>
        <Text style={styles.dovizFiyat}>{secilendovizAdi}</Text>
        <Text style={styles.dovizFiyat}>{secilenDoviz}</Text>
      </View>
      <View style={styles.bilgilendirme}>
        <AntDesign name="infocirlce" size={24} color="red" />
        <Text style={styles.dovizFiyat}>İşlemler için dönüştürülecek para birimini ve miktarı giriniz</Text>
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
    borderColor:"rgb(6, 70, 130)"
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
