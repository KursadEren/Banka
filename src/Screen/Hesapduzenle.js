import { View, Text, BackHandler, StyleSheet, Dimensions, Alert, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import ComboBox from '../Component/Combobox';
import Buttonx from '../Component/Button';
import Constants from 'expo-constants'
import axios from 'axios';
import { MyContext } from '../Context/Context';
import TextInputC from '../Component/TextInput';
import { useTranslation } from 'react-i18next';

export default function Hesapduzenle({ navigation }) {
  const { t } = useTranslation();
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState();
  const context = useContext(MyContext);
  const { updateSayfa, theme, dovizFull, optiondoviz, options2, options3 } = context;

  const [dovizKontrol, setDovizKontrol] = useState(0);
  const [dovizSecim, setDovizSecim] = useState(0);
  const [sube      , setSube] = useState(0);
  const [hesapTur  ,   setHesapTur] = useState(0);
  const [tcno, setTcno] = useState('');

  const clearErrorMessage = () => {
    setErrorMessage(null);
  };

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(clearErrorMessage, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const hesapSilmeRequest = () => {
    const textLength = tcno.length;
      if (tcno !== '') {
        setError('');

        
      } else {
        setError(`${t('Error6')}`);
        return;
      }
      
      if (!/^\d+$/.test(tcno)) {
        setError(`${t('Error7')}`);
        return; // Exit the function if password validation fails
      }

      if (textLength === 11) {
        setError('');

      } else {
        setError(`${t('Error8')}`);
        return;
      }
      
    if(dovizKontrol === 0){
       setErrorMessage(`${t('Error11')}`); return
      }
      
   

    const { manifest } = Constants;
    const apiAddress = `http://${manifest.debuggerHost.split(':').shift()}:5000`;

    axios
      .post(`${apiAddress}/users/silme`, { tcno, dovizKontrol })
      .then((response) => {
        navigation.goBack()
      })
      .catch((error) => {
        setErrorMessage(`${t('Error14')}`)
      });
  };

  const sendHesapDuzenleRequest = () => {
    const textLength = tcno.length;
      if (tcno !== '') {
        setError('');

        
      } else {
        setError(`${t('Error6')}`);
        return;
      }
      
      if (!/^\d+$/.test(tcno)) {
        setError(`${t('Error7')}`);
        return; // Exit the function if password validation fails
      }

      if (textLength === 11) {
        setError('');

      } else {
        setError(`${t('Error8')}`);
        return;
      }
      
    if(dovizKontrol === 0){
       setErrorMessage(`${t('Error11')}`);
        return
      }
      if(dovizSecim=== 0 && sube === 0 && hesapTur === 0 ){
        setErrorMessage(`${t('Error12')}`);
      }

    const { manifest } = Constants;
    const apiAddress = `http://${manifest.debuggerHost.split(':').shift()}:5000`;
    console.log(tcno, dovizKontrol, dovizSecim, hesapTur, sube);
    axios
      .post(`${apiAddress}/users/hesapduzenle`, {
        tcno,
        dovizKontrol,
        dovizSecim,
        hesapTur,
        sube,
      })
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        setErrorMessage(`${t('Error2')}`)
      });
  };

  const handleNextStep = () => {
    if (dovizKontrol !== 0) {
      setStep(step + 1);
    } else {
      setErrorMessage(`${t('Error13')}`);
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  useEffect(() => {
    const backAction = () => {
      updateSayfa("HomeScreen");
      navigation.goBack()
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <ScrollView
            contentContainerStyle={[styles.container, { backgroundColor: theme === 'dark' ? "#1e1e1e" : 'rgb(218, 231, 237)' }]}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.stepContainer}>
              <View>
                <ComboBox data={optiondoviz} onChangeHesap={setDovizKontrol} label="doviztipicheck" />

                <ComboBox data={dovizFull} onChangeHesap={setDovizSecim} label="dovizFull" />

                <ComboBox data={options2} onChangeHesap={setHesapTur} label="HesapTUR" />

                <ComboBox data={options3} onChangeHesap={setSube} label="sube" />
              </View>

              <View style={styles.buttonContainer}>
                <Buttonx label={`${t('Next')}`} OnChangeButton={handleNextStep} onPress={handleNextStep} />

              </View>
              <View style={{height:50,marginTop:'3%'}}>
              {errorMessage && (
                <View style={styles.errorBubble}>
                  <Text style={styles.errorMessage}>{errorMessage}</Text>
                </View>
              )}
              </View>
              
            </View>
          </ScrollView>
        );
      case 2:
        return (
          <ScrollView
            contentContainerStyle={[styles.container, { backgroundColor: theme === 'dark' ? "#1e1e1e" : 'rgb(218, 231, 237)' }]}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.stepContainer}>

              <TextInputC label="TC No" onChangeText={setTcno} error={error} style={styles.input} />

              <View style={styles.buttonContainer}>

                <Buttonx label={`${t('ButtonName5')}`} OnChangeButton={hesapSilmeRequest} navigation={navigation} />
                <Buttonx label={`${t('EditAccount')}`} OnChangeButton={sendHesapDuzenleRequest} navigation={navigation} />

              </View>
              <View style={styles.buttonContainer}>
                <Buttonx label={`${t('ButtonName4')}`} OnChangeButton={handlePrevStep} onPress={handlePrevStep} />
              </View>
              <View style={{height:50,marginTop:'3%'}}>
              {errorMessage && (
                <View style={styles.errorBubble}>
                  <Text style={styles.errorMessage}>{errorMessage}</Text>
                </View>
              )}
              </View>
            </View>
          </ScrollView>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {renderStep()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  stepContainer: {
    flex: 1,
    width: '80%',
    justifyContent: 'center',
    alignSelf: 'center',
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
    marginTop: "10%",
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  errorBubble: {
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 10,
    alignSelf: 'center',
    marginBottom: 10,
  },
  errorMessage: {
    color: 'white',
    fontWeight: 'bold',
  },
});
