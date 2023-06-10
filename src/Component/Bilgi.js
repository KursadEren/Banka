import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { MyContext } from '../Context/Context';
const BilgiKarti = () => {
  const context = useContext(MyContext);
  const {chechdoviz, updatesetoptiondoviz,
    alisSatisdoviz} = context;
  return (
    <View style={styles.container}>
      <Text style={styles.baslik}>İşlem Yapılacak Kur</Text>
      <View style={styles.veriContainer}>
       <Text style={styles.dovizFiyat}>{chechdoviz} </Text>
       <Text style={styles.dovizFiyat}>{alisSatisdoviz}</Text>
       
       </View>
       <View style={styles.bilgilendirme}>
       <AntDesign name="infocirlce" size={24} color="red" />
       <Text style={styles.dovizFiyat}>işlemler için dönüştürülecek para birimini ve miktarı giriniz  </Text>
       </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    flex:1,
    width:300,
    height:150,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  baslik: {
    textAlign:"center",
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  veriContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:"center",
  },
  
  dovizFiyat: {
    marginHorizontal:"5%",
    textAlign:"center",
    fontSize: 15,
    
  },
  bilgilendirme:{
      marginTop:20,
      flexDirection:"row",
      justifyContent:"space-between"
  }
});

export default BilgiKarti;
