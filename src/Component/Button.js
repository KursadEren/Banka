import { View, Text, StyleSheet } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { Button } from 'react-native-paper';
import { MyContext } from '../Context/Context';
import Constants from 'expo-constants';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';


const Buttonx = ({label2, label, navigation,OnChangeButton }) => {
  const context = useContext(MyContext);
  const {dogumtarih,tcno, updateSayfa,  password, userinfo,selectedOptiondoviz,selectedOptionsube,selectedOptionhesap,selectedIBAN,updateTcno, email, updateEmail,updatePassword,telno,updatesetTelno,   fullname,updateFullname, } = context;
  

 
    
    



    
   
  
  const  HandleButton = (text) =>{
      OnChangeButton(text);
  } 

  return (
    <View style={styles.container}>
      {label === 'Sign In' ? (
        <Button icon="send" mode="contained" onPress={() => HandleButton(label)} style={styles.button}>
          {"Giriş"}
        </Button>
      ) : label === 'Sign Up' ?(
       <Button icon="send" mode="contained" onPress={() => HandleButton(label)} style={styles.button}>
        {"Kayıt"}
        </Button>
    ) : label === '+' ? (
        <TouchableOpacity onPress={() => HandleButton(label)}>
        <View style={{borderWidth:1,padding:10,borderRadius:1000,paddingRight:15,paddingLeft:15,backgroundColor:"#4CAF50"}}>
         <Text style={{fontSize:15}}>{label}</Text>
          </View>
          </TouchableOpacity>
      ):label === 'Sign Up2' ?(
        <Button icon="send" mode="contained" onPress={() => HandleButton(label)} style={styles.button}>
        {"Kayıt"}
        </Button>
      ): label === 'Hesap Ekle'? (
        <Button icon="send" mode="contained" onPress={() => HandleButton(label)} style={styles.button}>
        {"Hesap Ekle"}
      </Button>
      ): label === 'Devam Et'?(
        <Button icon="send" mode="contained" onPress={() => HandleButton(label)} style={styles.button}>
        {"Devam Et"}
      </Button>
      ):(
        <Button icon="send" mode="contained" onPress={() => HandleButton(label)} style={styles.button}>
        {"Geri"}
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
