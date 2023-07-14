import React, { useState,useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import TextInputC from '../Component/TextInput';
import Buttonx from '../Component/Button';
import { MyContext } from '../Context/Context';
import Constants from 'expo-constants'
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const SignUp = ( {navigation} ) => {
  const context = useContext(MyContext);
    const {dogumtarih,tcno, updateSayfa,updatesetDogumtarih,  password, userinfo,selectedOptiondoviz,selectedOptionsube,selectedOptionhesap,selectedIBAN,updateTcno, email, updateEmail,updatePassword,telno,updatesetTelno,   fullname,updateFullname, } = context;
    const [error, setError] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
   const [step,setStep] = useState(1);
  const {t} = useTranslation()
  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

 const onChangeEkle = ()=>{
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    setErrorEmail('Geçerli bir e-posta adresi giriniz');
    return;
  }

  const { manifest } = Constants;
const apiAddress = `http://${manifest.debuggerHost.split(':').shift()}:5000`;
axios
  .post(`${apiAddress}/users/users/${tcno}`, { fullname,telno,dogumtarih, tcno, password,email })
  .then((response) => {
    
    if (response.status === 201) {
      
      
      navigation.goBack()
      
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
  const ChangeDevam = () =>{
    const textLength = tcno.length;
    if (tcno !== '') {
      setError('');

      
    } else {
      setError(`${t('Error6')}`);
      return;
    }
    
    if (!/^\d+$/.test(tcno)) {
      setError('Sadece sayı giriniz');
      return; // Exit the function if password validation fails
    }

    if (textLength === 11) {
      setError('');

    } else {
      setError('11 haneli olmalıdır');
      return;
    }
    if (password !== '') {
      setErrorPassword('');

    } else {
      setErrorPassword('Boş bırakamazsınız');
      return;
    }

    if (!/^\d+$/.test(password)) {
      setErrorPassword('Sadece sayı giriniz');
      return; // Exit the function if password validation fails
    }else{
      setErrorPassword("");
    }
  handleNextStep();
  }
   

  
   

  




  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View style={styles.stepContainer}>
            
            <TextInputC onChangeText={updateTcno} error={error} label="TC No"/>
            
            <TextInputC onChangeText={updatePassword} errorPassword={errorPassword}  label={t('Password')}/>
            
            <TextInputC  onChangeText={updateFullname} label={`${t('fullname')}`} />
            <Buttonx whatbut=" " label={`${t('Next')}`} OnChangeButton={ChangeDevam}  />
          </View>
        );
      case 2:
        return (
          <View style={styles.stepContainer}>
           
            <TextInputC onChangeText={updateEmail} errorEmail={errorEmail}  label="email"/>
            
            <TextInputC onChangeText={updatesetTelno}   label={`${t('TelephoneNumber')}`} />
            
            <TextInputC onChangeText={updatesetDogumtarih}  label="dogumtarih"/>
            <View style={styles.buttonContainer}>
            
              <Buttonx whatbut=" " icon="arrow-left" label={`${t('ButtonName4')}`} OnChangeButton={handlePrevStep} />
              <Buttonx  whatbut=" "  icon="account-plus"  label={t('SignUp')} OnChangeButton={onChangeEkle}  navigation={navigation} />
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepContainer: {
    width: '80%',
    justifyContent: 'center',
  },
  stepText: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default SignUp;
