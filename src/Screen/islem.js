import React, { useContext, useEffect, useState } from 'react';
import { View, Text, BackHandler, ScrollView, StyleSheet } from 'react-native';
import { MyContext } from '../Context/Context';

import ComboBox from '../Component/Combobox';
import TextInputC from '../Component/TextInput';
import Buttonx from '../Component/Button';
import axios from 'axios';
import Constants from 'expo-constants';

import BilgiKarti from '../Component/Bilgi';

const Islem = ({ navigation }) => {
  
  const context = useContext(MyContext);
  const {
    updateSayfa,
    sayfa,
    updatesetoptiondoviz,
    chechdoviz
    
  } = context;
  const [dolarmiktar, setdolarmiktar] = useState('');
  const [sure, setSure] = useState(60);
  
  useEffect(() => {
    const sayaç = setInterval(() => {
      setSure(prevSure => prevSure - 1);
    }, 1000);

    if (sure <= 0) {
      clearInterval(sayaç);
      navigation.navigate('HomeScreen');
    }

    return () => {
      clearInterval(sayaç);
    };
  }, [navigation, sure]);

  useEffect(() => {
    const backAction = () => {
      updateSayfa("HomeScreen");
      navigation.navigate('HomeScreen');
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    updateSayfa("islem");
  }, []);

  useEffect(() => {
    const { manifest } = Constants;
    const apiAddress = `http://${manifest.debuggerHost.split(':').shift()}:5000`;

    axios
      .get(`${apiAddress}/users/dovizsatis`)
      .then((response) => {
        updatesetoptiondoviz(response.data);
      })
      .catch((error) => {
        console.error('API veri alınırken bir hata oluştu:', error);
      });
  }, []);

  const OnChangeButton = () => {
    // Butona tıklanınca yapılması gereken işlemler
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.sureContainer}>
        <Text style={styles.sureText}>{sure}</Text>
        <Text>Saniye sonra Ana Sayfaya yönlendirileceksiniz </Text>
        
        
      </View>
      <View style={styles.formContainer}>
      <BilgiKarti   />
        <View style={styles.comboboxContainer}>
          <ComboBox label="doviztipialis" />
        </View>
        <View style={styles.textInputContainer}>
          <TextInputC onChangeText={setdolarmiktar} label="Miktar" />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        
        <Buttonx label="Çevir" OnChangeButton={OnChangeButton} navigation={navigation} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginTop: "35%",
    width: "100%",
    alignItems: 'center',
  },
  sureContainer: {
    marginBottom: "5%",
  },
  sureText: {
    fontSize: 24,
    fontWeight: 'bold',
    justifyContent:"center",
    textAlign:"center"
  },
  formContainer: {
    width: "100%",
    alignItems: 'center',
    marginVertical: "5%",
  },
  comboboxContainer: {
    width: "80%",
    marginHorizontal: "10%",
    marginVertical: "5%",
  },
  textInputContainer: {
    width: "80%",
    marginHorizontal: "10%",
    marginTop:"3%"
  },
  buttonContainer: {
    marginTop: '20%',
  },
});

export default Islem;
