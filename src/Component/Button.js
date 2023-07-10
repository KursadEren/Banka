import { View, Text, StyleSheet } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { Button } from 'react-native-paper';
import { MyContext } from '../Context/Context';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from  'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';

const Buttonx = ({label2, label, navigation,OnChangeButton,whatbut,icon }) => {
  const context = useContext(MyContext);
  const { theme } = context;
  const {t} = useTranslation();

  
  const  HandleButton = (text) =>{
      OnChangeButton(text);
  } 
  
  

  return (
    <View style={styles.container}>
      {whatbut === ' ' ? (
        <Button  icon={icon} mode="contained" onPress={() => HandleButton(label)} style={[styles.button,{ backgroundColor: theme === "dark"? "#323232" : "rgb(6, 70, 115)"}]}>
          {label}
        </Button>
       
      ) : ( <TouchableOpacity  onPress={() => HandleButton(label)}>
       
      <Ionicons
         name={icon}
         size={40}
         color={theme === 'dark' ? 'white':"rgb(6, 70, 115)"} 
      />
    </TouchableOpacity>)}
       
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
