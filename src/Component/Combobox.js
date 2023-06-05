import React, { useEffect, useState } from 'react';
import { View, StyleSheet, BackHandler, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Constants from 'expo-constants';
import axios from 'axios';

const ComboBox = ({label, navigation }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [options, setOptions] = useState([]);
  const [options2, setOptions2] = useState([]);
  const [options3, setOptions3] = useState([]);

  useEffect(() => {
    const { manifest } = Constants;
    const apiAddress = `http://${manifest.debuggerHost.split(':').shift()}:5000`;

    axios
      .get(`${apiAddress}/users/doviztipi`)
      .then((response) => {
        // API'den alınan verileri options state'ine ata
        setOptions(response.data);
      })
      .catch((error) => {
        console.error('API veri alınırken bir hata oluştu:', error);
      });

      axios
      .get(`${apiAddress}/users/hesaptur`)
      .then((response) => {
        // API'den alınan verileri options state'ine ata
        setOptions2(response.data);
      })
      .catch((error) => {
        console.error('API veri alınırken bir hata oluştu:', error);
      });
      axios
      .get(`${apiAddress}/users/sube`)
      .then((response) => {
        // API'den alınan verileri options state'ine ata
        setOptions3(response.data);
      })
      .catch((error) => {
        console.error('API veri alınırken bir hata oluştu:', error);
      });
  }, []);

        

  const handleOptionChange = (itemValue) => {
    setSelectedOption(itemValue);
  };

  let content;
  if(label === "doviztipi")
  {
    content = (<View style={styles.container}>
      
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedOption}
          onValueChange={handleOptionChange}
          style={styles.picker}
        >
          {options.map((option) => (
            <Picker.Item key={option.doviztipiid} label={option.dovizadi} value={option.doviztipiid} />
          ))}
        </Picker>
      </View>
    </View>)
  } else if (label ==="HesapTUR" ){
    content = (<View style={styles.container}>
    <Text style={styles.label}>Seçenekleri Seçin:</Text>
    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={selectedOption}
        onValueChange={handleOptionChange}
        style={styles.picker}
      >
        {options2.map((option) => (
          <Picker.Item key={option.hesapturid} label={option.hesapadi} value={option.hesapturid} />
        ))}
      </Picker>
    </View>
  </View>
    )
  }
  else if(label === "sube")
  {
    content = (<View style={styles.container}>
        <Text style={styles.label}>Seçenekleri Seçin:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedOption}
            
            onValueChange={handleOptionChange}
            style={styles.picker}
          >
            {options3.map((option) => (
              <Picker.Item key={option.subeid} label={option.subeadi} value={option.subeid} />
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
