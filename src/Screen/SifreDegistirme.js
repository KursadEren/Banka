import { View, Text, BackHandler } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../Context/Context'
import TextInputC from '../Component/TextInput';
import Buttonx from '../Component/Button';
import Constants from 'expo-constants'
import axios from 'axios';
export default function SifreDegistirme({navigation}) {
    const [Password      , setPassword      ] = useState();
    const [ChangePassword, setChangePassword] = useState();
    const [tcno , setTcno] = useState();
    const [error ,setError] = useState('')
    const [errorPassword,setErrorPassword] = useState('')
    const context = useContext(MyContext);
    const { sayfa,theme,updateSayfa, } = context; 
    useEffect(()=>{
       updateSayfa('SifreDegistirme')
    },[])

    useEffect(()=>{
        const backAction = () => {
            updateSayfa("HomeScreen");
            navigation.goBack()
            return true;
          };
          const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
      
          return () => backHandler.remove();
        
    },[])
    const ButtonDegistir = () =>{
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
      if (Password !== '' && ChangePassword !== '') {
        setErrorPassword('');

      } else {
        setErrorPassword(`${t('Error6')}`);
        return;
      }

      if (!/^\d+$/.test(Password)) {
        setErrorPassword(`${t('Error9')}`);
        return; // Exit the function if password validation fails
      }else{
        setErrorPassword("");
      }


        //SifreDegistir
        const { manifest } = Constants;
        const apiAddress = `http://${manifest.debuggerHost.split(':').shift()}:5000`;
        axios
                .put(`${apiAddress}/users/SifreDegistir`,{tcno,Password})
                .then((response) => {
                  if (response.status === 200) {
                    updateSayfa('HomeScreen')
                    navigation.goBack()
                    
                    
                  } else {
                    console.error(response.data.message);
                  }
                })
                .catch((error) => {
                  console.error(error);
                });
    }


  return (
    <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor: theme === 'dark' ? '#1e1e1e': 'rgb(218, 231, 237)' }}>
      <TextInputC onChangeText={setTcno} error={error} label="TC No" />
      <TextInputC label="Password"        onChangeText={setPassword      } errorPassword={errorPassword} />
      <TextInputC label="Repeat Password" onChangeText={setChangePassword} errorPassword={errorPassword} />
      <Buttonx navigation={navigation}   OnChangeButton={ButtonDegistir} label="Değiştir"/> 
    </View>
  )
}