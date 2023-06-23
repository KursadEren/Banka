import { View, Text, StyleSheet, Alert, Dimensions, Button } from 'react-native';
import React, { useContext, useEffect, useState,  } from 'react';
import AppBar from '../Component/AppBar';
import { MyContext } from '../Context/Context';
import TextInputC from '../Component/TextInput';
import Buttonx from '../Component/Button';
import Constants from 'expo-constants';
import axios from 'axios';
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';


const { width, height } = Dimensions.get('window');

const SignIn = ({ navigation }) => {
  const [error, setError] = useState('');
  const { t,i18n } = useTranslation();
  errorPassword
  const [errorPassword, setErrorPassword] = useState('');
  const context = useContext(MyContext);
  const {
    renk1,
    tcno,
    updateSayfa,
    password,
    updateUserinfo,
    userinfo,
    updateTcno,
    updatePassword,
    updatsetLanguage,
    updatsetsetuserid,
    theme,
    sayfa,
      updateTheme,
  } = context;

  useEffect(() => {
   
    updateSayfa('Sign In'); 
  }, []);

 
  const OnChangeButton = async (text) => {
    if (text === 'Sign In') {
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
      if (password !== '') {
        setErrorPassword('');

      } else {
        setErrorPassword(`${t('Error6')}`);
        return;
      }

      if (!/^\d+$/.test(password)) {
        setErrorPassword(`${t('Error9')}`);
        return; // Exit the function if password validation fails
      }else{
        setErrorPassword("");
      }
          const { manifest } = Constants;
          const apiAddress = `http://${manifest.debuggerHost.split(':').shift()}:5000`;
          axios
            .post(`${apiAddress}/users/login`, { tcno, password })
            .then((response) => {
              if (response.status === 200) {
                
                axios
                .get(`${apiAddress}/users/hesap/${tcno}`)
                .then((response) => {
                  if (response.status === 200) {
                    updateUserinfo(response.data);
                    
                    
                  } else {
                    console.error(response.data.message);
                  }
                })
                .catch((error) => {
                  console.error(error);
                });
       
    
                    navigation.navigate('DraverNavigator', { screen: 'HomeScreen' });
                  } else {
                    
                    console.error(response.data.message);
                  }
                })
                .catch((error) => {
                    
                  
                  Alert.alert(`${t('Error')}`,  `${t('Error10')}`
                  );  // kayıt kısmınada eklemen gerek 
                });
           
        } else if (text === 'Sign Up') {
          navigation.navigate('Sign Up');
        } else {
          Alert.alert('hata');
        }
      };
      const handeldeneme = async () =>{
        console.log(theme)
        await  theme === 'light' ?updateTheme('dark') : updateTheme('light')
        console.log(theme)
      }
 
  return (
    <View style={{ flex: 1, backgroundColor: theme === 'dark'? `#1e1e1e`: `rgb(218, 231, 237)` }}>
      <View style={style.con}>
        <View style={style.appBarr}>
          <AppBar title={t('SignIn')} />
          <Text style={{ textAlign: 'center', marginTop: height * 0.05, fontSize: 20, color: theme === 'dark'? `white`: `#1e1e1e`  }}>{t('welcome')}</Text>
        </View>
        <View style={style.Body}>
          <View style={style.TextInput}>
            <TextInputC onChangeText={updateTcno} error={error} label="TC No" />
          </View>
          <View style={style.TextInput}>
            <TextInputC onChangeText={updatePassword} errorPassword={errorPassword} label={t('Password')} />
          </View>
          <View style={style.ButtonContainer}>
            <Buttonx  label="Sign In" OnChangeButton={OnChangeButton} navigation={navigation} />
            <Buttonx label="Sign Up" OnChangeButton={OnChangeButton} navigation={navigation} />
          </View>
         
        </View>
        <View style={style.ButtonContainer}></View>
      </View>
      
    </View>
  );
};

const style = StyleSheet.create({
  con: { flex: 1 },
  appBarr: {},
  Body: { marginVertical: height * 0.05, marginHorizontal: width * 0.1 },
  ButtonContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: height * 0.01 },
  TextInput: { marginVertical: height * 0.03 },
  or: { flexDirection: 'row', marginTop: height * 0.05 },
});

export default SignIn;
