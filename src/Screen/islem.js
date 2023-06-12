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
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
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
    cevirilecekdovizadi,
    setIslemtipi,
    islemtipi,
    hesaplananpara,
    userinfo,
    secilendovizAdi,
    alisSatisEuro,
     alisSatisSterlin,
     alisSatisddolar,
     alisSatisfrang,

  } = context;
  const [dolarmiktar, setdolarmiktar] = useState('');
  const [sure, setSure] = useState(60);
  const [userbilgi, setUserbilgi] = useState([]);
 
  useEffect(() => {
    const sayaç = setInterval(() => {
      setSure(prevSure => prevSure - 1);
    }, 1000);

    if (sure <= 0) {
      clearInterval(sayaç);
      updatesetHesaplananParaDegeri('0');
      updateSayfa('HomeScreen')
      navigation.navigate('HomeScreen');
    }

    return () => {
      clearInterval(sayaç);
    };
  }, [navigation, sure]);

  useEffect(() => {
    const backAction = () => {
      updatesetHesaplananParaDegeri('0');
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

  useEffect(() => {
    console.log(secilendovizAdi)
    if(islemtipi === 'Satış'){
      
     
      
      if(cevirilecekdovizadi === 'Amerikan Doları' && secilendovizAdi != 'Amerikan Doları')
      { const hesaplananParaDegeri = dolarmiktar * secilenDoviz;
        updatesetHesaplananParaDegeri(hesaplananParaDegeri / (alisSatisddolar-0.5))
      }else if(cevirilecekdovizadi === 'İsviçre Frangı' && secilendovizAdi != 'İsviçre Frangı')
      { const hesaplananParaDegeri = dolarmiktar * secilenDoviz;
        updatesetHesaplananParaDegeri(  hesaplananParaDegeri /(alisSatisfrang-0.5))
      }
      else if(cevirilecekdovizadi === 'İngiliz Sterlini' && secilendovizAdi != 'İngiliz Sterlini')
      { const hesaplananParaDegeri = dolarmiktar * secilenDoviz;
        updatesetHesaplananParaDegeri (hesaplananParaDegeri /(alisSatisSterlin-0.5))
      }else if(cevirilecekdovizadi === 'Euro' && secilendovizAdi != 'Euro')
      { const hesaplananParaDegeri = dolarmiktar * secilenDoviz;
        const deger = hesaplananParaDegeri / (alisSatisEuro-0.5)
        
        updatesetHesaplananParaDegeri(deger);
        
      }else if(cevirilecekdovizadi === 'Türk Lirası'){
        const hesaplananParaDegeri = dolarmiktar * secilenDoviz;
        updatesetHesaplananParaDegeri(hesaplananParaDegeri);
      } 
       
    }else if(islemtipi === 'Alım'){

      
      if(cevirilecekdovizadi === 'Amerikan Doları' && secilendovizAdi != 'Amerikan Doları')
      {const hesaplananParaDegeri = dolarmiktar / secilenDoviz;
        updatesetHesaplananParaDegeri(hesaplananParaDegeri * (alisSatisddolar))
      }else if(cevirilecekdovizadi === 'İsviçre Frangı' && secilendovizAdi != 'İsviçre Frangı')
      {const hesaplananParaDegeri = dolarmiktar / secilenDoviz;
        updatesetHesaplananParaDegeri(  hesaplananParaDegeri * (alisSatisfrang))
      }
      else if(cevirilecekdovizadi === 'İngiliz Sterlini' && secilendovizAdi != 'İngiliz Sterlini')
      {const hesaplananParaDegeri = dolarmiktar / secilenDoviz;
        updatesetHesaplananParaDegeri (hesaplananParaDegeri *(alisSatisSterlin))
      }else if(cevirilecekdovizadi === 'Euro' && secilendovizAdi != 'Euro')
      {const hesaplananParaDegeri = dolarmiktar / secilenDoviz;
        updatesetHesaplananParaDegeri(hesaplananParaDegeri * (alisSatisEuro));
      }else if(cevirilecekdovizadi === 'Türk Lirası'){
        const hesaplananParaDegeri = dolarmiktar / secilenDoviz;
          updatesetHesaplananParaDegeri(hesaplananParaDegeri);
      } 
    
    }
    
  }, [dolarmiktar,chechdoviz2]);

  const OnChangeButtonSatim = (label) => {
    
    if(label ==='Çevir'){

    
    const doviztipiid = chechdoviz;
    

    const { manifest } = Constants;
    const apiAddress = `http://${manifest.debuggerHost.split(':').shift()}:5000`;

    axios
      .post(`${apiAddress}/users/dovizkontrol`, {
        tcno,
        doviztipiid,
        dolarmiktar,
      })
      .then((response) => {
        if (response.status === 200) {
          axios
            .get(`${apiAddress}/users/ozetbilgi/${tcno}`)
            .then((response) => {
              setUserbilgi(response.data.rows[0]);
              console.log(response.data.rows[0]);
              setShowConfirmation(true);
            })
            .catch((error) => {
              console.error('API veri alınırken bir hata oluştu:', error);
            });
        } else {
          console.log('hey');
          console.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    }else if(label==='Onayla')
    {
      console.log(secilendovizAdi)
      console.log(cevirilecekdovizadi)

      // sayılar var sayi değeri şeklinde düzelt yazı olarak değil
      if(cevirilecekdovizadi === 'Amerikan Doları' && secilendovizAdi != 'Amerikan Doları')
      {
        
      }else if(cevirilecekdovizadi === 'İsviçre Frangı' && secilendovizAdi != 'İsviçre Frangı')
      {
        
      }
      else if(cevirilecekdovizadi === 'İngiliz Sterlini' && secilendovizAdi != 'İngiliz Sterlini')
      {
        
      }else if(cevirilecekdovizadi === 'Euro' && secilendovizAdi != 'Euro')
      {
        
      }else if(cevirilecekdovizadi === 'Türk Lirası'){
        
      } 
      else{
        setShowConfirmation(false);
        setErrorMessage('Aynı Tipe dönüştüremezsiniz.');
       
      }
      const doviztipiid = chechdoviz;
      const userid=userinfo[0].userid
      const tarih = new Date();
      const { manifest } = Constants;
      const apiAddress = `http://${manifest.debuggerHost.split(':').shift()}:5000`;
      axios
        .post(`${apiAddress}/users/dovizozet`, {dolarmiktar,hesaplananpara,tarih,userid,doviztipiid,chechdoviz2,secilenDoviz})
        .then((response) => {
          
          if (response.status === 201) {
            
           
          } else {
            // İstek başarısız oldu, hata mesajını gösterin
           
            console.error(response.data.message);
          }
        })
        .catch((error) => {
          // HTTP isteği hata verdi, hata mesajını gösterin
         
          console.error(error);
        });

    }
  };
  const onChangeButtonAlim = () => {

  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.sureContainer}>
        <Text style={styles.sureText}>{sure}</Text>
        <Text>Saniye sonra Ana Sayfaya yönlendirileceksiniz</Text>
      </View>
      <View style={styles.formContainer}>
        <BilgiKarti />
        <View style={styles.comboboxContainer}>
          <ComboBox label="doviztipialis" />
          {errorMessage && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      )}
        </View>
        <View style={styles.textInputContainer}>
          <TextInputC onChangeText={setdolarmiktar} label="Miktar" />
        </View>
      </View>
      <Text> Hesaplanan Değer: </Text>
      <Text>{hesaplananpara}</Text>
      <View style={styles.buttonContainer}>
        <Buttonx label="Çevir" OnChangeButton={islemtipi === 'Satış' ? OnChangeButtonSatim: onChangeButtonAlim } navigation={navigation} />
      </View>
      {showConfirmation && (
        <View style={styles.overlay}>
          <View style={styles.confirmationContainer}>
            <Text style={styles.confirmationText}>İşlemi onaylıyor musunuz?</Text>
             <View style={styles.confirmationButtonContainer}>
              <Buttonx label="Onayla" OnChangeButton={islemtipi === 'Satış' ? OnChangeButtonSatim: onChangeButtonAlim} />
             </View>
          </View>
        </View>
      )}
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignSelf: 'center',
  },
  errorText: {
    color: 'white',
    fontWeight: 'bold',
  },
  container: {
    flexGrow: 1,
    marginTop: '35%',
    width: '100%',
    alignItems: 'center',
  },
  sureContainer: {
    marginBottom: '5%',
  },
  sureText: {
    fontSize: 24,
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: '5%',
  },
  comboboxContainer: {
    width: '80%',
    marginHorizontal: '10%',
    marginVertical: '5%',
  },
  textInputContainer: {
    width: '80%',
    marginHorizontal: '10%',
    marginTop: '3%',
  },
  buttonContainer: {
    marginTop: '15%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmationContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    alignItems: 'center',
  },
  confirmationText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  confirmationButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
});

export default Islem;
