import { View, Text, StyleSheet } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { Button } from 'react-native-paper';
import { MyContext } from '../Context/Context';
import Constants from 'expo-constants';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';


const Buttonx = ({ label, navigation }) => {
  const context = useContext(MyContext);
  const {tcno, updateSayfa,  password, userinfo,selectedOptiondoviz,selectedOptionsube,selectedOptionhesap,selectedIBAN } = context;

 
    
    


  const handleLogin = () => {

    
   
    if (label === 'Sign In' ) {
      // giriş kontrol
      const { manifest } = Constants;
      const apiAddress = `http://${manifest.debuggerHost.split(':').shift()}:5000`;
      axios
        .post(`${apiAddress}/users/login`, { tcno, password })
        .then((response) => {
          
          if (response.status === 200) {
            

            navigation.navigate('DraverNavigator', { screen: 'HomeScreen' });
            
          } else {
            // İstek başarısız oldu, hata mesajını gösterin
           
            console.error(response.data.message);
          }
        })
        .catch((error) => {
          // HTTP isteği hata verdi, hata mesajını gösterin
          console.error(error);
        });
    }else if (label === "Hesap Ekle")
    {
      const { manifest } = Constants;
      const apiAddress = `http://${manifest.debuggerHost.split(':').shift()}:5000`;
      // kontrol
      axios
        .post(`${apiAddress}/users/login`, { tcno, password })
        .then((response) => {
          
          if (response.status === 200) {
            const hesapbakiye = "0";
            console.log(hesapbakiye);
            const usersid = userinfo[0].userid;
            
            
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
            
          } else {
            // İstek başarısız oldu, hata mesajını gösterin
           console.log("hey")
            console.error(response.data.message);
          }
        })
        .catch((error) => {
          // HTTP isteği hata verdi, hata mesajını gösterin
          console.error(error);
        });
        
            
           
            
            
        
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
    else if (label === 'Sign Up') {
      navigation.navigate('Sign Up');
    } else if (label === '+') {
      updateSayfa("HesapEkle");
      navigation.navigate('HesapEkle');
    }
  };
  

  return (
    <View style={styles.container}>
      {label === 'Sign In' ? (
        <Button icon="send" mode="contained" onPress={() => handleLogin()} style={styles.button}>
          {"Giriş"}
        </Button>
      ) : label === 'Sign Up' ?(
       <Button icon="send" mode="contained" onPress={() => handleLogin()} style={styles.button}>
        {"Kayıt"}
        </Button>
    ) : label === '+' ? (
        <TouchableOpacity onPress={() => handleLogin()}>
        <View style={{borderWidth:1,padding:10,borderRadius:1000,paddingRight:15,paddingLeft:15,backgroundColor:"#4CAF50"}}>
         <Text style={{fontSize:15}}>{label}</Text>
          </View>
          </TouchableOpacity>
      ):(
        <Button icon="send" mode="contained" onPress={() => handleLogin()} style={styles.button}>
        {"Hesap Ekle"}
      </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginBottom: 10,
  },
  customLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
  },
});

export default Buttonx;
