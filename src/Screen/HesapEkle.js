import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, BackHandler, Text, Button, TextInput, Dimensions } from 'react-native';

import { MyContext } from '../Context/Context';
import ComboBox from '../Component/Combobox';
import TextInputC from '../Component/TextInput';
import Buttonx from '../Component/Button';
import Constants from 'expo-constants'
import axios from 'axios';
import { useTranslation } from 'react-i18next';
const HesapEkle = ({ navigation }) => {
    const {t} = useTranslation()
  function generateRandomNumber() {
    const min = Math.pow(10, 15); // Minimum değer: 10^15
    const max = Math.pow(10, 16) - 1; // Maksimum değer: 10^16 - 1
  
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
 
  const context = useContext(MyContext);
  const {theme,selectedIBAN,usersid,tcno,password,updateTcno,updatePassword,selectedOptiondoviz,  selectedOptionhesap, selectedOptionsube, sayfa, updateSayfa,updateSelectedIBAN,updatesetOptions,updatesetOptions2,updatesetOptions3 } = context;
 
  
  

  useEffect(() => {
      console.log(usersid)
    const backAction = () => {
      updateSayfa("HomeScreen");
      navigation.navigate('HomeScreen');
      return true;
    };
    const kartnumarasi = generateRandomNumber();
    const ulkekodu = "TR";
    const bankakodu = "1232";
    const IBAN = ulkekodu + bankakodu + kartnumarasi;
    updateSelectedIBAN(IBAN);
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);
  
  


  const [step, setStep] = useState(1);
  
  //                                                              bu kısımda check boxları kontrol et

  const OnChangeButton = async (text) =>{
      if(text === `${t('AddAccount')}`)
      {
        const { manifest } = Constants;
        const apiAddress = `http://${manifest.debuggerHost.split(':').shift()}:5000`;
        // kontrol
        axios
          .post(`${apiAddress}/users/login`, { tcno, password })
          .then((response) => {
            
            if (response.status === 200) {
              const hesapbakiye = "10000";
              
              
              
              console.log(usersid,
                selectedOptionhesap,
                hesapbakiye,
                selectedOptionsube,
                selectedOptiondoviz,
                selectedIBAN,)
              // ekleme yapma
       axios
          .post(`${apiAddress}/users/dovizhesap`, {
            usersid,
            selectedOptionhesap,
            hesapbakiye,
            selectedOptionsube,
            selectedOptiondoviz,
            selectedIBAN,
          })   .then((response) => {
            
            if (response.status === 201) {
              
              updateSayfa("HomeScreen");
  
              navigation.navigate('DraverNavigator', { screen: 'HomeScreen' });
              
            } 
          })
          .catch((error) => {
            
            console.error(error);
          });
          
  
            } 
          })
          .catch((error) => {
            console.log('hey')
            // HTTP isteği hata verdi, hata mesajını gösterin
            console.error(error);
          });
      }else if(text ===`${t('ButtonName4')}`){
        handlePrevStep();
      }
      else if(text ===`${t('Next')}`){
        handleNextStep();
      }
  }

  const handleNextStep = () => {
    if (
      selectedOptiondoviz !== null &&
      selectedOptionhesap !== null &&
      selectedOptionsube !== null
    ) {
      setStep(step + 1);
    } else {
      console.log("Hata: Geçerli değerleri seçiniz.");
    }
  };
  const handlePrevStep = () => {
    setStep(step - 1);
  };

  

  useEffect(() => {
    const fetchData = async () =>{
      const { manifest } = Constants;
      const apiAddress = `http://${manifest.debuggerHost.split(':').shift()}:5000`;
  
      axios
        .get(`${apiAddress}/users/doviztipi/${tcno}`)
        .then((response) => {
          // API'den alınan verileri options state'ine ata
          updatesetOptions(response.data);
          console.log(response.data)
        })
        .catch((error) => {
          console.error('API veri alınırken bir hata oluştu:', error);
        });
  
        axios
        .get(`${apiAddress}/users/hesaptur`)
        .then((response) => {
          // API'den alınan verileri options state'ine ata
          updatesetOptions2(response.data);
         
        })
        .catch((error) => {
          console.error('API veri alınırken bir hata oluştu:', error);
        });
  
        axios
        .get(`${apiAddress}/users/sube`)
        .then((response) => {
          // API'den alınan verileri options state'ine ata
          updatesetOptions3(response.data);
         
        })
        .catch((error) => {
          console.error('API veri alınırken bir hata oluştu:', error);
        });
    }
    fetchData();
  }, []);
  


  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View style={[styles.container,{backgroundColor:theme === 'dark'? "#1e1e1e" :'rgb(218, 231, 237)'}]}>
          <View style={[styles.stepContainer]}>
            
            <ComboBox   label="doviztipi"/>
            
            <ComboBox label="HesapTUR"/>
            
            <ComboBox label="sube"/>
            <View style={styles.buttonContainer}>
              <Buttonx label={`${t('Next')}`}  OnChangeButton={OnChangeButton} onPress={handleNextStep} />
            </View>
          </View>
          </View>
        );
      case 2:
        return (
          <View style={[styles.container,{backgroundColor:theme === 'dark'? "#1e1e1e" :'rgb(218, 231, 237)'}]}>
          <View style={styles.stepContainer}>
            
            <TextInputC onChangeText={updateTcno} label="TC No"  style={styles.input} />
            
            <TextInputC onChangeText={updatePassword}  label="password" style={styles.input}/>
            <View style={styles.buttonContainer}>

               <Buttonx  label={`${t('ButtonName4')}`} OnChangeButton={OnChangeButton}  onPress={handlePrevStep} />
               <Buttonx label={`${t('AddAccount')}`} OnChangeButton={OnChangeButton} navigation={navigation}/>
            </View>
            <View  style={styles.buttonContainer}>
            
            </View>
          </View>
          </View>
        );
     
      default:
        return null;
    }
  };

  return <View style={styles.container}>{renderStep()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    justifyContent: 'center',
    alignItems:"center"
  },
  stepContainer: {
    flex: 1,
    width: Dimensions.get('window').width * 0.8,
    justifyContent: 'center',
    
  },
  stepText: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop:"10%",
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default HesapEkle;
