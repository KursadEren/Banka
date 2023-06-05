import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const SignUp = () => {
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
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
            <Text style={styles.stepText}>Soyadınız:</Text>
            <TextInput
              style={styles.input}
              value={surname}
              onChangeText={setSurname}
            />
            <Button title="Devam Et" onPress={handleNextStep} />
          </View>
        );
      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepText}>E-posta Adresiniz:</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
            <Text style={styles.stepText}>Telefon Numaranız:</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
            />
            <View style={styles.buttonContainer}>
              <Button title="Geri" onPress={handlePrevStep} />
              <Button title="Devam Et" onPress={handleNextStep} />
            </View>
          </View>
        );
      case 3:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepText}>Kayıt Tamamlandı!</Text>
            <View style={styles.buttonContainer}>
              <Button title="Geri" onPress={handlePrevStep} />
              <Button title="Kayıt Ol" onPress={handleRegistration} />
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
