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
    chechdoviz,
    chechdoviz2,
    secilenDoviz,
    tcno,
    updatesetHesaplananParaDegeri,
    hesaplananpara,
     
    
  } = context;
  const [dolarmiktar, setdolarmiktar] = useState('');
  const [sure, setSure] = useState(60);
  const [userbilgi,setUserbilgi] = useState([]);
  
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

  //

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

  

  useEffect(() => {
    
    const hesaplananParaDegeri = dolarmiktar * secilenDoviz;
  
    
    updatesetHesaplananParaDegeri(hesaplananParaDegeri);
  }, [dolarmiktar]);

  const OnChangeButton = (label) => {
   
    const tc = '27337851310'
    const doviztipiid = chechdoviz;
    const hesapbakiye= hesaplananpara;
    //hesap varmı yok mu kontorolü ve bakiye varmı yok mu kontrolü
    
    const { manifest } = Constants;
      const apiAddress = `http://${manifest.debuggerHost.split(':').shift()}:5000`;

      axios.post(`${apiAddress}/users/dovizkontrol`, {   
           tcno,
           doviztipiid,
           dolarmiktar
         }) .then((response) => {
          
          if (response.status === 200) {
           
            // islem sayfasına gereken bilgileri sağlamak için axios get isteği
           /* axios
            .get(`${apiAddress}/users/ozetbilgi`, {tcno})
            .then((response) => {
              setUserbilgi(response.data)
              
            })
            .catch((error) => {
              console.error('API veri alınırken bir hata oluştu:', error);
            });
            */
                //satilanparatutari,alinacakparatutari,tarih,usersid,alinanparatipi,satilanparatipi,satildigikur

           
          } else {
            // İstek başarısız oldu, hata mesajını gösterin
            console.log('he')
            console.error(response.data.message);
          }
        })
        .catch((error) => {
          // HTTP isteği hata verdi, hata mesajını gösterin
          console.error(error);
        });

  
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
      <Text> Hesaplanan Değer:  </Text>
        <Text>{hesaplananpara}</Text>
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
    marginTop: '15%',
  },
});

export default Islem;
