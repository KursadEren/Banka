import React, { useContext, useEffect, useState } from 'react';
import { View, Text, BackHandler, ScrollView, StyleSheet,Alert,Dimensions } from 'react-native';
import { MyContext } from '../Context/Context';
import ComboBox from '../Component/Combobox';
import TextInputC from '../Component/TextInput';
import Buttonx from '../Component/Button';
import axios from 'axios';
import Constants from 'expo-constants';
import BilgiKarti from '../Component/Bilgi';
import { useTranslation } from 'react-i18next';
const { width } = Dimensions.get('window');
const Islem = ({ navigation }) => {
  const {t} = useTranslation()
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const context = useContext(MyContext);
  const {
    updateSayfa,
    theme,
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
     
     selectedOptiondoviz,
    
    selectedOptionhesap,
   
    selectedOptionsube,

  } = context;
  const [dolarmiktar, setdolarmiktar] = useState('');
  const [sure, setSure] = useState(60);
  const [userbilgi, setUserbilgi] = useState([]);
  const [doviztipi,setDovizTipi] = useState(0);
  const [doviztipi2,setDovizTipi2] = useState(0);
  
  const updatesetDovizTipi =  (itemvalue) =>{
    setDovizTipi(itemvalue);
  }
 
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
 // geri tuşuna basıldığında alğılanacak yer 
  useEffect(() => {
    const backAction = () => {
      updatesetHesaplananParaDegeri('0');
      updateSayfa("HomeScreen");
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  // hangi sayfada olduğunun gösteren güncellee işlemi
  useEffect(() => {
    updateSayfa("islem");
  }, []);

    // Combobox ın içini dolduran axios isteği
  useEffect(() => {
    const { manifest } = Constants;
    const apiAddress = `http://${manifest.debuggerHost.split(':').shift()}:5000`;
    
    
    axios
      .get(`${apiAddress}/users/dovizsatis/${tcno}`)
      .then((response) => {
        updatesetoptiondoviz(response.data);
       
      })
      .catch((error) => {
        console.error('API veri alınırken bir hata oluştu:', error);
      });
  }, []);

  //text boxa ve combbox taki değer değişirse bura tetiklenir 
  useEffect(() => {
    
    if(islemtipi === `${t('Sell')}`){

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
      // girilen para değerini seçilenden çıkar çıkan sonucu gerekli yere ekle
       
    }
    else if(islemtipi === `${t('Buy')}`){

      
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
        const hesaplananParaDegeri = dolarmiktar * secilenDoviz;
          updatesetHesaplananParaDegeri(hesaplananParaDegeri);
      } //hesaplanan para çıkartılacak kısım girilen para değerini seçilene aktar
    
    }
    
  }, [dolarmiktar,chechdoviz2]);

    // sayfadaki bütün butonların bulunduğu fonksiyon

  const OnChangeButton = async (label) => {
    
    if(label ===`${t('ButtonName2')}`){
      
      if(cevirilecekdovizadi===secilendovizAdi){
        setShowConfirmation(false);
        setErrorMessage(`${t('Error4')}`);
        return;
      }
      if(dolarmiktar === '')
      {
        setShowConfirmation(false);
        setErrorMessage(`${t('Error5')}`);
        return;
      }
        if(islemtipi === `${t('Sell')}`)
        {
          const doviztipiid=chechdoviz;
          //satış kısmındaki ana sayfdan seçilen hesap varmı yada hesap bakiyesi yeterli mi diye kontol edilir

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
                // kullanıcın bütün bilgilerini getirir
                axios
                  .get(`${apiAddress}/users/ozetbilgi/${tcno}`)
                  .then((response) => {
                    setUserbilgi(response.data.rows[0]);
                    setShowConfirmation(true);
                  })
                  .catch((error) => {
                    console.error('API veri alınırken bir hata oluştu:', error);
                  });
                  
              } else {
               
                console.error(response.data.message);
              }
            })
            .catch((error) => {
              setShowConfirmation(false);
              setErrorMessage(`${t('Error1')}`);
              return;
            });
        }
        else  if(islemtipi ===`${t('Buy')}` )
        {
          
          const doviztipiid=chechdoviz2;
          // DOVİZ KONTROL ALIM KISMINDAKİ SEÇİLEN HESABIN BAKİYESİ VEYA HESAP VARMI DİYE KONTOL EDER

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
                   
                    setShowConfirmation(true);
                  })
                  .catch((error) => {
                    console.error('API veri alınırken bir hata oluştu:', error);
                  });
              } else {
                
                console.error(response.data.message);
              }
            })
            .catch((error) => {
              setShowConfirmation(false);
              setErrorMessage(`${t('Error1')}`);
              return;
            });
        }
    
   
    }else if(label===`${t('ButtonName3')}`)
    {

          // kontrol için
        if(islemtipi === `${t('Buy')}`)
        {
          
          const userid=userinfo[0].userid
          const tarih = new Date();
          const { manifest } = Constants;
         const apiAddress = `http://${manifest.debuggerHost.split(':').shift()}:5000`;

              // para eklenecek hesap için 
                          
                       axios
                       .post(`${apiAddress}/users/hesapekle`, {dolarmiktar,userid,chechdoviz})
                       .then((response) => {
                         
                         if (response.status === 200) {
                           
                          
                         } else {
                           // İstek başarısız oldu, hata mesajını gösterin
                          
                           console.error(response.data.message);
                         }
                       })
                       .catch((error) => {
                        
                        setShowConfirmation(false);
                        setErrorMessage(`${t('Error3')}`);
                         console.error(error);
                       });
                      
                
                       // para çekilecek hesap için  
                     
                    axios
                     .post(`${apiAddress}/users/hesapcikart`, {hesaplananpara,userid,chechdoviz2})
                     .then((response) => {
                       
                       if (response.status === 200) {
                         
                        
                       } else {
                         // İstek başarısız oldu, hata mesajını gösterin
                        
                         console.error(response.data.message);
                       }
                     })
                     .catch((error) => {
                      setShowConfirmation(false);
                      setErrorMessage(`${t('Error1')}`);
                       
                       console.error(error);
                     });


                     // işlem sayfasına ekleme
                     setDovizTipi(chechdoviz) 
                     setDovizTipi2(chechdoviz2)
              axios
                .post(`${apiAddress}/users/dovizozet`, {dolarmiktar:parseFloat(dolarmiktar),hesaplananpara,tarih,userid,chechdoviz,chechdoviz2,secilenDoviz,islemtipi})
                .then((response) => {
                  
                  if (response.status === 201) {
                   
                            navigation.navigate('DraverNavigator', { screen: 'HomeScreen' });
                        
                  } else {
                    // İstek başarısız oldu, hata mesajını gösterin
                   
                    console.error(response.data.message);
                  }
                })
                .catch((error) => {
                  setShowConfirmation(false);
                  setErrorMessage(`${t('Error2')}`);
                 
                  console.error(error);
                });
            

        }





        else if(islemtipi=== `${t('Sell')}` )
        {
          
          const userid=userinfo[0].userid
          const tarih = new Date();
          updatesetDovizTipi(chechdoviz);
          console.log(doviztipi)
          

         const { manifest } = Constants;
          const apiAddress = `http://${manifest.debuggerHost.split(':').shift()}:5000`;

            // para eklenecek hesap 
               console.log(hesaplananpara,userid,chechdoviz2)
          axios
           .post(`${apiAddress}/users/hesapekleSatis`, {hesaplananpara,userid,chechdoviz2})
           .then((response) => {
             
             if (response.status === 200) {
               
              
             } else {
               // İstek başarısız oldu, hata mesajını gösterin
                     setShowConfirmation(false);
                      setErrorMessage(`${t('Error3')}`);
              
             }
           })
           .catch((error) => {
             // HTTP isteği hata verdi, hata mesajını gösterin
            
             console.error(error);
           });
 
         

            // seçilen hesaptan para eksilt
             // chechdoviz   usd tl 1  dolarmiktar  satış 
            axios
            .post(`${apiAddress}/users/hesapcikartSatis`, {dolarmiktar: parseFloat(dolarmiktar),userid,chechdoviz})
            .then((response) => {
              
              if (response.status === 200) {
                
               
              } else {
                // İstek başarısız oldu, hata mesajını gösterin
                
                      setShowConfirmation(false);
                      setErrorMessage(`${t('Error1')}`);
              }
            })
            .catch((error) => {
              // HTTP isteği hata verdi, hata mesajını gösterin
              
              console.error(error);
            });
       
              // işlem sayfasına ekleme
              
             
              
              
              axios
                .post(`${apiAddress}/users/dovizozet`, {dolarmiktar: parseFloat(dolarmiktar),hesaplananpara,tarih,userid,chechdoviz,chechdoviz2,secilenDoviz,islemtipi})
                .then((response) => {
                  
                  if (response.status === 201) {
                   
                            navigation.navigate('DraverNavigator', { screen: 'HomeScreen' });
                          
                  } else {
                    // İstek başarısız oldu, hata mesajını gösterin
                   
                    console.error(response.data.message);
                  }
                })
                .catch((error) => {
                  // HTTP isteği hata verdi, hata mesajını gösterin
                  setShowConfirmation(false);
                  setErrorMessage(`${t('Error2')}`);
                });
        }

    }
  };
  

  return (
    <View style={[styles.container,{backgroundColor: theme === 'dark'? `#1e1e1e`: `rgb(218, 231, 237)`}]}>
      <ScrollView contentContainerStyle={[styles.scrollContainer]}>
        <View style={styles.sureContainer}>
          <Text style={[styles.sureText,{color: theme === 'dark' ? 'white': 'black'}]}>{sure}</Text>
          <Text style={[{color: theme === 'dark' ? 'white': 'black'}]}>{t('Timeinformation')}</Text>
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
            <TextInputC onChangeText={setdolarmiktar} label={`${t('ButtonName1')}`} />
          </View>
        </View>
        <Text style={[{color: theme ==='dark' ? 'white': 'black'}]}>{t('Information3')}</Text>
        <Text style={[{color: theme ==='dark' ? 'white': 'black'}]}>{hesaplananpara}</Text>
        <View style={styles.buttonContainer}>
          <Buttonx label={`${t('ButtonName2')}`} OnChangeButton={OnChangeButton} navigation={navigation} />
        </View>
        {showConfirmation && (
          <View style={styles.overlay}>
            <View style={styles.confirmationContainer}>
              <Text style={[styles.confirmationText,{color: theme ==='dark' ? 'black': 'black'}]}>{t('Information2')}</Text>
              <View style={styles.confirmationButtonContainer}>
                <Buttonx label={`${t('ButtonName3')}`} OnChangeButton={OnChangeButton} />
              </View>
            </View>
          </View>
        )}
        <View style={styles.bottomSpace} /> 
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(218, 231, 237)',
  },
  scrollContainer: {
    flexGrow: 1,
    width: width,
    marginTop:"10%",
    alignItems: 'center',
    paddingVertical: '3%',
    paddingBottom: '10%',
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
    marginVertical: '3%',
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
    marginTop: '5%',
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
  errorContainer: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 1,
  },
  errorText: {
    color: 'white',
    fontWeight: 'bold',
  },
  bottomSpace: {
    height: '10%', // Yeni eklenen stil
  },
});



export default Islem;
