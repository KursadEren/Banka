import React, { useEffect, useState,useContext} from 'react';
import { View, StyleSheet, BackHandler, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Constants from 'expo-constants';
import axios from 'axios';
import { MyContext } from '../Context/Context';
const ComboBox = ({label, navigation,onChangeBox }) => {
 
  const context = useContext(MyContext);
  const {selectedOptiondoviz,
    updateSelectedOptiondoviz,
    selectedOptionhesap,
    updateSelectedOptionhesap,
    selectedOptionsube,
    updateSelectedOptionsube,options,options2,options3,
    //combobox 
    updatesetChechdoviz,
      updatesetChechdoviz2,
      chechdoviz,
      chechdoviz2,
    optiondoviz,updatesetoptiondoviz,updatesetcevirilecekdovizadi} = context;
    

 
  
 


  const handleOptionChange = (itemValue) => {
    
    updateSelectedOptiondoviz(itemValue);
  };
  const handleOptionChange2 = (itemValue) => {
   
    updateSelectedOptionhesap(itemValue);
  };
  const handleOptionChange3 = (itemValue) => {
    
    updateSelectedOptionsube(itemValue);
  };
  const handleOptionChangesatis = (itemValue) => {
   
    updatesetChechdoviz(itemValue);
  };
  const handleOptionChangealis = (itemValue,selectedIndex) =>{
    updatesetChechdoviz2(itemValue);
    updatesetcevirilecekdovizadi(optiondoviz[selectedIndex].dovizadi);
    
  }
  

  let content;
  if(label === "doviztipi")
  {
    content = (<View style={styles.container}>
      <Text style={styles.label}>Seçenekleri Seçin:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedOptiondoviz}
          onValueChange={handleOptionChange}
          style={styles.picker}
        >
          {options.map((option) => (
            <Picker.Item key={option.doviztipiid} label={option.dovizadi} value={option.doviztipiid} />
          ))}
        </Picker>
      </View>
    </View>
      )
  } else if (label === "HesapTUR" ){
    content = (<View style={styles.container}>
    <Text style={styles.label}>Seçenekleri Seçin:</Text>
    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={selectedOptionhesap}
        onValueChange={handleOptionChange2}
        style={styles.picker}
      >
        {options2.map((option) => (
          <Picker.Item key={option.hesapturid} label={option.hesapturadi} value={option.hesapturid} />
        ))}
      </Picker>
    </View>
  </View>
    )
  }
  else if(label === "sube")
  {
   
      content = (
        <View style={styles.container}>
          <Text style={styles.label}>Seçenekleri Seçin:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedOptionsube} // selectedOption3 doğru şekilde ayarlandı
              onValueChange={handleOptionChange3}
              style={styles.picker}
            >
            {options3.map((option) => (
              <Picker.Item key={option.subeid} label={option.subeadi} value={option.subeid} />
            ))}
          </Picker>
      </View>
    </View>
    )
  }else if(label === "doviztipisatis")
  {
    content = (<View style={styles.container}>
      <Text style={styles.label}>Seçenekleri Seçin:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={chechdoviz}
          onValueChange={handleOptionChangesatis}
          style={styles.picker}
        >
          {optiondoviz.map((option) => (
            <Picker.Item key={option.doviztipiid} label={option.dovizadi} value={option.doviztipiid} />
          ))}
        </Picker>
      </View>
    </View>
      )
  }
  else if(label === "doviztipialis")
  {
    content = (<View style={styles.container}>
      <Text style={styles.label}>Dönüştürülecek Tip</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={chechdoviz2}
          onValueChange={handleOptionChangealis}
          style={styles.picker}
        >
          {optiondoviz.map((option,index) => (
            <Picker.Item key={option.doviztipiid} label={option.dovizadi} value={option.doviztipiid} />
          ))}
        </Picker>
      </View>
    </View>
      )
  }

  return content;
  
  
};

const styles = StyleSheet.create({
  container: {
    marginTop:'5%',
    marginBottom:'5%',
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  picker: {
    height: 40,
  },
});

export default ComboBox;
