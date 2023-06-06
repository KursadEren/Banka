import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import TextInputC from '../Component/TextInput';
import Buttonx from '../Component/Button';

const SignUp = ( {navigation} ) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
 
  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleRegistration = () => {
    // Kayıt işlemlerini gerçekleştirirsiniz
    console.log('Kayıt tamamlandı:', {
      name,
      surname,
      email,
      phone
    });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepText}>Adınız:</Text>
            <TextInputC label="TC No"/>
            <Text style={styles.stepText}>TC NO:</Text>
            <TextInputC label="Password"/>
            <Text style={styles.stepText}>TC NO:</Text>
            <TextInputC label="fullname"/>
            <Button title="Devam Et" onPress={handleNextStep} />
          </View>
        );
      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepText}>E-posta Adresiniz:</Text>
            <TextInputC label="email"/>
            <Text style={styles.stepText}>Telefon Numaranız:</Text>
            <TextInputC label="telno"/>
            <Text style={styles.stepText}>Telefon Numaranız:</Text>
            <TextInputC label="dogumtarih"/>
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
