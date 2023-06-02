import { View, Text, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import { Button } from 'react-native-paper';
import { MyContext } from '../Context/Context';
import Constants from 'expo-constants';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';


const Buttonx = ({ label, navigation }) => {
  const context = useContext(MyContext);
  const { sayfa, updateSayfa, email, updateEmail, password, updatePassword } = context;

  const handleLogin = () => {
    console.log(email);
    console.log(password);
    if (label === 'Sign In') {
      // Expo Constants paketinden IP adresinizi alın.
      const { manifest } = Constants;
      const apiAddress = `http://${manifest.debuggerHost.split(':').shift()}:5000`;
      axios
        .post(`${apiAddress}/users/login`, { email, password })
        .then((response) => {
          if (response.status === 200) {
            navigation.navigate('DraverNavigator', { screen: 'HomeScreen' });
            console.log(response.data.message);
          } else {
            // İstek başarısız oldu, hata mesajını gösterin
            console.error(response.data.message);
          }
        })
        .catch((error) => {
          // HTTP isteği hata verdi, hata mesajını gösterin
          console.error(error);
        });
    } else if (label === 'Sign Up') {
      navigation.navigate('Sign Up');
    } else if (label === '+') {
      navigation.navigate('HesapEkle');
    }
  };

  return (
    <View style={styles.container}>
      {label === 'Sign In' || label === 'Sign Up' ? (
        <Button icon="send" mode="contained" onPress={() => handleLogin()} style={styles.button}>
          {label}
        </Button>
      ) : (
        <TouchableOpacity onPress={() => handleLogin()}>
        <View style={{borderWidth:1,padding:10,borderRadius:1000,paddingRight:15,paddingLeft:15,backgroundColor:"#4CAF50"}}>
         <Text style={{fontSize:15}}>{label}</Text>
          </View>
          </TouchableOpacity>
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
