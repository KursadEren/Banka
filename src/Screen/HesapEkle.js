import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, BackHandler, Text, Button, TextInput, Dimensions } from 'react-native';

import { MyContext } from '../Context/Context';
import ComboBox from '../Component/Combobox';

const HesapEkle = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [options, setOptions] = useState([]);
  const context = useContext(MyContext);
  const { sayfa, updateSayfa } = context;

  useEffect(() => {
    const backAction = () => {
      updateSayfa("HomeScreen");
      navigation.navigate('HomeScreen');
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  const [step, setStep] = useState(1);
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
            <Text style={styles.stepText}>Doviz Tipini Seçin:</Text>
            <ComboBox label="doviztipi"/>
            <Text style={styles.stepText}>Hesap Türünü Seçin:</Text>
            <ComboBox label="HesapTUR"/>
            <Text style={styles.stepText}>Şube Seçin:</Text>
            <ComboBox label="sube"/>
            <View style={styles.buttonContainer}>
              <Button title="Devam Et" onPress={handleNextStep} />
            </View>
          </View>
        );
      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepText}>E-posta Adresiniz:</Text>
            <TextInput style={styles.input} />
            <Text style={styles.stepText}>Telefon Numaranız:</Text>
            <TextInput style={styles.input} />
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
    flex: 1,
    width: Dimensions.get('window').width * 0.8,
    justifyContent: 'center',
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
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default HesapEkle;
