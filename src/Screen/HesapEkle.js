import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, BackHandler, Text, Button, TextInput, Dimensions } from 'react-native';
import { MyContext } from '../Context/Context';
import ComboBox from '../Component/Combobox';
import TextInputC from '../Component/TextInput';
import Buttonx from '../Component/Button';
import Constants from 'expo-constants';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const HesapEkle = ({ navigation }) => {
  const { t } = useTranslation();

  function generateRandomNumber() {
    const min = Math.pow(10, 15); // Minimum değer: 10^15
    const max = Math.pow(10, 16) - 1; // Maksimum değer: 10^16 - 1

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const context = useContext(MyContext);
  const {
    theme,
    updateTcno,
    updatePassword,
    sayfa,
    usersid,
    updateSayfa,
    updateSelectedIBAN,
    updatesetOptions,
    updatesetOptions2,
    updatesetOptions3,
  } = context;

 
  const [selectedOptionhesap, setSelectedOptionhesap] = useState(0);
  const [selectedOptionsube, setSelectedOptionsube] = useState(0);
  const [selectedOptiondoviz, setSelectedOptiondoviz] = useState(0);
  const [selectedIBAN, setSelectedIBAN] = useState('');
  const [tcno, setTcno] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    const backAction = () => {
      updateSayfa('HomeScreen');
      navigation.navigate('HomeScreen');
      return true;
    };

    const kartnumarasi = generateRandomNumber();
    const ulkekodu = 'TR';
    const bankakodu = '1232';
    const IBAN = ulkekodu + bankakodu + kartnumarasi;
    setSelectedIBAN(IBAN);

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);

  const [step, setStep] = useState(1);

  const OnChangeButton = async (text) => {
    if (text === `${t('AddAccount')}`) {
      try {
        
        console.log(usersid, selectedOptionhesap, selectedOptionsube, selectedOptiondoviz, selectedIBAN, tcno, password);

        if (!usersid || !selectedOptionhesap || !selectedOptionsube || !selectedOptiondoviz || !selectedIBAN || !tcno || !password) {
          console.error('Hata: Bir veya daha fazla değişken null veya boş.');
          // Hata durumunda yapılması gereken işlemleri buraya ekleyebilirsiniz.
        }

        const { manifest } = Constants;
        const apiAddress = `http://${manifest.debuggerHost.split(':').shift()}:5000`;

        // kontrol
        axios
          .post(`${apiAddress}/users/login`, { tcno, password })
          .then((response) => {
            if (response.status === 200) {
              const hesapbakiye = '10000';

              axios
                .post(`${apiAddress}/users/dovizhesap`, {
                  usersid,
                  selectedOptionhesap,
                  hesapbakiye,
                  selectedOptionsube,
                  selectedOptiondoviz,
                  selectedIBAN,
                })
                .then((response) => {
                  if (response.status === 201) {
                    updateSayfa('Hesapekle');
                    updateSayfa('HomeScreen');

                    navigation.navigate('DraverNavigator', { screen: 'HomeScreen' });
                  }
                })
                .catch((error) => {
                  console.error(error);
                });
            }
          })
          .catch((error) => {
            console.log('hey');
            // HTTP isteği hata verdi, hata mesajını gösterin
            console.error(error);
          });
      } catch (error) {
        console.error('API veri alınırken bir hata oluştu:', error);
        // Hata durumunda yapılması gereken işlemleri buraya ekleyebilirsiniz.
      }
    } else if (text === `${t('ButtonName4')}`) {
      handlePrevStep();
    } else if (text === `${t('Next')}`) {
      
        handleNextStep();
      
    }
  };

  const handleNextStep = () => {
    if (selectedOptiondoviz !== null && selectedOptionhesap !== null && selectedOptionsube !== null) {
      setStep(step + 1);
    } else {
      console.log('Hata: Geçerli değerleri seçiniz.');
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  

  const onChangeComboBox = (itemValue, label) => {
    console.log(selectedOptiondoviz, selectedOptionhesap, selectedOptionsube);

    if (label === 'doviztipi') {
      setSelectedOptiondoviz(itemValue);
    } else if (label === 'HesapTUR') {
      setSelectedOptionhesap(itemValue);
    } else if (label === 'sube') {
      setSelectedOptionsube(itemValue);
    }
  };

  const onChangeText = (text, label) => {
    if (label === 'TC No') {
      setTcno(text);
    } else if (label === 'password') {
      setPassword(text);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View style={[styles.container, { backgroundColor: theme === 'dark' ? '#1e1e1e' : 'rgb(218, 231, 237)' }]}>
            <View style={styles.stepContainer}>
              <ComboBox onChangeComboBox={onChangeComboBox} label="doviztipi" />
              <ComboBox onChangeComboBox={onChangeComboBox} label="HesapTUR" />
              <ComboBox onChangeComboBox={onChangeComboBox} label="sube" />
              <View style={styles.buttonContainer}>
                <Buttonx label={`${t('Next')}`} OnChangeButton={OnChangeButton} onPress={handleNextStep} />
              </View>
            </View>
          </View>
        );
      case 2:
        return (
          <View style={[styles.container, { backgroundColor: theme === 'dark' ? '#1e1e1e' : 'rgb(218, 231, 237)' }]}>
            <View style={styles.stepContainer}>
              <TextInputC onChangeText={onChangeText} label="TC No" style={styles.input} />
              <TextInputC onChangeText={onChangeText} label="password" style={styles.input} />
              <View style={styles.buttonContainer}>
                <Buttonx label={`${t('ButtonName4')}`} OnChangeButton={OnChangeButton} onPress={handlePrevStep} />
                <Buttonx label={`${t('AddAccount')}`} OnChangeButton={OnChangeButton} navigation={navigation} />
              </View>
              <View style={styles.buttonContainer}></View>
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
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
    marginTop: '10%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default HesapEkle;
