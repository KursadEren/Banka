import React, { useState,useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import TextInputC from '../Component/TextInput';
import Buttonx from '../Component/Button';
import { MyContext } from '../Context/Context';

const SignUp = ( {navigation} ) => {
  const context = useContext(MyContext);
    const {dogumtarih,tcno, updateSayfa,updatesetDogumtarih,  password, userinfo,selectedOptiondoviz,selectedOptionsube,selectedOptionhesap,selectedIBAN,updateTcno, email, updateEmail,updatePassword,telno,updatesetTelno,   fullname,updateFullname, } = context;
  
   
 
  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepText}>Adınız:</Text>
            <TextInputC onChangeText={updateTcno} label="TC No"/>
            <Text style={styles.stepText}>TC NO:</Text>
            <TextInputC onChangeText={updatePassword}  label="Password"/>
            <Text style={styles.stepText}>TC NO:</Text>
            <TextInputC  onChangeText={updateFullname} label="fullname"/>
            <Button title="Devam Et" onPress={handleNextStep} />
          </View>
        );
      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepText}>E-posta Adresiniz:</Text>
            <TextInputC onChangeText={updateEmail}  label="email"/>
            <Text style={styles.stepText}>Telefon Numaranız:</Text>
            <TextInputC onChangeText={updatesetTelno}  label="telno"/>
            <Text style={styles.stepText}>Telefon Numaranız:</Text>
            <TextInputC onChangeText={updatesetDogumtarih}  label="dogumtarih"/>
            <View style={styles.buttonContainer}>
            
              <Button title="Geri" onPress={handlePrevStep} />
              <Buttonx label2="Sign Up" label="" navigation={navigation} />
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
