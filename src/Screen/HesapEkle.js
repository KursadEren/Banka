import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, BackHandler, Text, Button, TextInput, Dimensions } from 'react-native';

import { MyContext } from '../Context/Context';
import ComboBox from '../Component/Combobox';
import TextInputC from '../Component/TextInput';
import Buttonx from '../Component/Button';

const HesapEkle = ({ navigation }) => {
  
 
  const context = useContext(MyContext);
  const {selectedOptiondoviz,  selectedOptionhesap, selectedOptionsube, sayfa, updateSayfa,updateSelectedIBAN } = context;
 
  function generateRandomNumber() {
    const min = Math.pow(10, 15); // Minimum değer: 10^15
    const max = Math.pow(10, 16) - 1; // Maksimum değer: 10^16 - 1
  
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  

  useEffect(() => {
    const backAction = () => {
      updateSayfa("HomeScreen");
      navigation.navigate('HomeScreen');
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);
  const kartnumarasi  = generateRandomNumber();

  const ulkekodu = "TR";
  const bankakodu = "1232"
  const IBAN = ulkekodu + bankakodu + kartnumarasi;
  
  console.log(IBAN);


  const [step, setStep] = useState(1);
  
  const handleNextStep = () => {
    if(selectedOptiondoviz !=null && selectedOptionhesap !=null && selectedOptionsube !=null)
    setStep(step + 1);
    else
    console.log("hata")
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
            <Text style={styles.stepText}>TC numaranız:</Text>
            <TextInputC label="TC No"  style={styles.input} />
            <Text style={styles.stepText}>Parolanız:</Text>
            <TextInputC   label="password" style={styles.input}/>
            <View style={styles.buttonContainer}>
              <Button  title="Geri" onPress={handlePrevStep} />
              <Buttonx label="Hesap Ekle" navigation={navigation}/>
            </View>
          </View>
        );
      case 3:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepText}>Kayıt Tamamlandı!</Text>
            <View style={styles.buttonContainer}>
              <Button title="Geri" onPress={handlePrevStep} />
              
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
    marginTop:"10%",
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default HesapEkle;
