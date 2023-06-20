import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, BackHandler, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Constants from 'expo-constants';
import axios from 'axios';
import { MyContext } from '../Context/Context';
import { useTranslation } from 'react-i18next';

const ComboBox = ({ label, navigation, onChangeBox,onChangeHesap }) => {
  const { t } = useTranslation();

  const[secilenKontol,setSecilenKontol] = useState()
  const[secilenDoviz ,setSecilenDoviz ] = useState()
  const[secilenSube   ,setSecilenSube  ] = useState()
  const[secilenHesap ,setSecilenHesap ] = useState()
  const[secilenDovizFull ,setSecilenDovizFull ] = useState()

  const context = useContext(MyContext);
  const {
    
    theme,
    updateSelectedOptiondoviz,
    updateSelectedOptionhesap,
    updateSelectedOptionsube,
    options,
    options2,
    options3,
    updatesetChechdoviz,
    updatesetChechdoviz2,
    chechdoviz2,
    optiondoviz,
    dovizFull,
    updatesetcevirilecekdovizadi,
  } = context;

 

  const SecilenSubeChange = (itemValue) => {
    
    onChangeHesap(itemValue)
  };

  const SecilenKontrolChange = (itemValue) => {
    onChangeHesap(itemValue)
  };

  const SecilenHesapChange = (itemValue) => {
    onChangeHesap(itemValue)
  };

  const SecilenDovizChange = (itemValue) => {
    onChangeHesap(itemValue)
  };

  const handleOptionChangealis = async (itemValue, selectedIndex) => {
    updatesetChechdoviz2(itemValue);
    updatesetcevirilecekdovizadi(optiondoviz[selectedIndex].dovizadi);
  };
  const setSecilenDovizFullChange = (itemValue) =>{
    onChangeHesap(itemValue)
  }

  let content;

  if (label === 'doviztipi') {
    content = (
      <View style={styles.container}>
        <Text style={[styles.label, { color: theme === 'dark' ? 'white' : 'black' }]}>
          {t('CurrencyType')}
        </Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={secilenDoviz}
            onValueChange={(itemValue) => {
              if (itemValue !== null) {
                setSecilenDoviz(itemValue);
                SecilenDovizChange(itemValue); // Seçilen değeri fonksiyona gönder
              }
            }}
            style={styles.picker}
          >
            {options.map((option) => (
              <Picker.Item
                key={option.doviztipiid}
                label={option.dovizadi}
                value={option.doviztipiid}
              />
            ))}
          </Picker>
        </View>
      </View>
    );
  }else if(label==='dovizFull'){
    content = (
      <View style={styles.container}>
        <Text style={[styles.label, { color: theme === 'dark' ? 'white' : 'black' }]}>
          {t('CurrencyType')}
        </Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={secilenDovizFull}
            onValueChange={(itemValue) => {
              if (itemValue !== null) {
                setSecilenDovizFull(itemValue);
                setSecilenDovizFullChange(itemValue); // Seçilen değeri fonksiyona gönder
              }
            }}
            style={styles.picker}
          >
            {dovizFull.map((option) => (
              <Picker.Item
                key={option.doviztipiid}
                label={option.dovizadi}
                value={option.doviztipiid}
              />
            ))}
          </Picker>
        </View>
      </View>
    );
    
  } else if (label === 'HesapTUR') {
    content = (
      <View style={styles.container}>
        <Text style={[styles.label, { color: theme === 'dark' ? 'white' : 'black' }]}>
          {t('AccountType')}
        </Text>
        <View style={styles.pickerContainer}>
          <Picker
           selectedValue={secilenHesap}
           onValueChange={(itemValue) => {
             if (itemValue !== null) {
               setSecilenHesap(itemValue);
               SecilenHesapChange(itemValue); // Seçilen değeri fonksiyona gönder
             }
           }}
            style={styles.picker}
          >
            {options2.map((option) => (
              <Picker.Item
                key={option.hesapturid}
                label={option.hesapturadi}
                value={option.hesapturid}
              />
            ))}
          </Picker>
        </View>
      </View>
    );
  } else if (label === 'sube') {
    content = (
      <View style={styles.container}>
        <Text style={[styles.label, { color: theme === 'dark' ? 'white' : 'black' }]}>
          {t('Branches')}
        </Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={secilenSube}
            onValueChange={(itemValue) => {
              if (itemValue !== null) {
                setSecilenSube(itemValue);
                SecilenSubeChange(itemValue); // Seçilen değeri fonksiyona gönder
              }
            }}
            style={styles.picker}
          >
            {options3.map((option) => (
              <Picker.Item key={option.subeid} label={option.subeadi} value={option.subeid} />
            ))}
          </Picker>
        </View>
      </View>
    );
  } else if (label === 'doviztipicheck') {
    content = (
      <View style={styles.container}>
        <Text style={[styles.label, { color: theme === 'dark' ? 'white' : 'black' }]}>
          {t('Selectoptions')}
        </Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={secilenKontol}
            onValueChange={(itemValue) => {
              if (itemValue !== null) {
                setSecilenKontol(itemValue);
                SecilenKontrolChange(itemValue); // Seçilen değeri fonksiyona gönder
              }
            }}
            style={styles.picker}
          >
            {optiondoviz.map((option) => (
              <Picker.Item
                key={option.doviztipiid}
                label={option.dovizadi}
                value={option.doviztipiid}
              />
            ))}
          </Picker>
        </View>
      </View>
    );








  } else if (label === 'doviztipialis') {
    content = (
      <View style={[styles.container]}>
        <Text style={[styles.label, { color: theme === 'dark' ? 'white' : 'rgb(218, 231, 237)' }]}>
          {t('ConvertType')}
        </Text>
        <View style={[styles.pickerContainer]}>
          <Picker
            selectedValue={chechdoviz2}
            onValueChange={handleOptionChangealis}
            style={[styles.picker]}
          >
            {optiondoviz.map((option, index) => (
              <Picker.Item
                key={option.doviztipiid}
                label={option.dovizadi}
                value={option.doviztipiid}
              />
            ))}
          </Picker>
        </View>
      </View>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  container: {
    marginTop: '5%',
    marginBottom: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'rgb(6, 70, 130)',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    width: 200,
    backgroundColor: 'rgb(218, 231, 237)',
  },
  picker: {
    height: 40,
  },
});

export default ComboBox;
