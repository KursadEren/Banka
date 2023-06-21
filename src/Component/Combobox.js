import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, BackHandler, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Constants from 'expo-constants';
import axios from 'axios';
import { MyContext } from '../Context/Context';
import { useTranslation } from 'react-i18next';

const ComboBox = ({ label, navigation, onChangeBox,onChangeHesap,data }) => {
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

 

  
  const handleOptionChangealis = async (itemValue, index) => {
    
    
    updatesetChechdoviz2(itemValue);
    onChangeHesap(itemValue);

    if(label==='doviztipialis'){
    const selectedOption = data.find((option) => option.id === itemValue);
    updatesetcevirilecekdovizadi(selectedOption.adi);}
    
  };
  

  

  return (
    <View style={[styles.container]}>
      <Text style={[styles.label, { color: theme === 'dark' ? 'white' : 'rgb(218, 231, 237)' }]}>
        {t('ConvertType')}
      </Text>
      <View style={[styles.pickerContainer]}>
        <Picker
           selectedValue={secilenDoviz}
           onValueChange={(itemValue) => {
             if (itemValue !== null) {
               setSecilenDoviz(itemValue);
               handleOptionChangealis(itemValue); // Seçilen değeri fonksiyona gönder
             }
           }}
          style={[styles.picker]}
        >
          <Picker.Item label={t('Selectoptions')} value="A" />

          {data.map((option, index) => (
            <Picker.Item
              key={option.id}
              label={option.adi}
              value={option.id}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
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
