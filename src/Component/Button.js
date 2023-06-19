import { View, Text, StyleSheet } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { Button } from 'react-native-paper';
import { MyContext } from '../Context/Context';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from  'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';

const Buttonx = ({label2, label, navigation,OnChangeButton }) => {
  const context = useContext(MyContext);
  const { theme } = context;
  const {t} = useTranslation();

  
  const  HandleButton = (text) =>{
      OnChangeButton(text);
  } 
  
  

  return (
    <View style={styles.container}>
      {label === 'Sign In' ? (
        <Button  icon="send" mode="contained" onPress={() => HandleButton(label)} style={[styles.button,{ backgroundColor: theme === "dark"? "#323232" : "rgb(6, 70, 115)"}]}>
          {t('SignIn')}
        </Button>
      ) : label === 'Sign Up' ?(
       <Button  icon="send" mode="contained" onPress={() => HandleButton(label)} style={[styles.button,{ backgroundColor: theme === "dark"? "#323232" : "rgb(6, 70, 115)"}]}>
        {t('SignUp')}
        </Button>
    ) : label === '+' ? (
        <TouchableOpacity  onPress={() => HandleButton(label)}>
       
            <Ionicons
               name="add-circle"
               size={40}
               color={theme === "dark"? "#323232" : "rgb(6, 70, 115)"} 
            />
          </TouchableOpacity>
      ):label === 'Sign Up2' ?(
        <Button icon="send" mode="contained" onPress={() => HandleButton(label)} style={[styles.button,{ backgroundColor: theme === "dark"? "#323232" : "rgb(6, 70, 115)"}]}>
        {t('SignUp')}
        </Button>
      ): label === `${t('AddAccount')}`? (
        <Button icon="send" mode="contained" onPress={() => HandleButton(label)} style={[styles.button,{ backgroundColor: theme === "dark"? "#323232" : "rgb(6, 70, 115)"}]}>
        {`${t('AddAccount')}`}
      </Button>
      ): label === 'Devam Et'?(
        <Button icon="send" mode="contained" onPress={() => HandleButton(label)} style={[styles.button,{ backgroundColor: theme === "dark"? "#323232" : "rgb(6, 70, 115)"}]}>
        {t('Next')}
      </Button>
      ):label === 'Çevir'?
      (
        <Button icon="send" mode="contained" onPress={() => HandleButton(label)} style={[styles.button,{ backgroundColor: theme === "dark"? "#323232" : "rgb(6, 70, 115)"}]}>
        {label}
      </Button>
      ):label === 'Geri'?(
        <Button icon="send" mode="contained" onPress={() => HandleButton(label)} style={[styles.button,{ backgroundColor: theme === "dark"? "#323232" : "rgb(6, 70, 115)"}]}>
        {"Geri"}
      </Button>
      ): label === '-'? (
        <TouchableOpacity  onPress={() => HandleButton(label)}>
       
            <Ionicons
               name="close-circle"
               size={40}
               color={theme === "dark"? "#323232" : "rgb(6, 70, 115)"}
            />
          </TouchableOpacity>
      ): label ==='islemler'? (
        <TouchableOpacity  onPress={() => HandleButton(label)}>
       
            <Ionicons
               name="hourglass"
               size={40}
               color={theme === "dark"? "#323232" : "rgb(6, 70, 115)"}
            />
          </TouchableOpacity>
         ):label ==='Hesap Sil'?(
         <Button icon="send" mode="contained"  onPress={() => HandleButton(label)} style={[styles.button,{ backgroundColor: theme === "dark"? "#323232" : "rgb(6, 70, 115)"}]}>
             {label}
           </Button>
           ):label ==='Hesap Sil'? (
              <Button icon="send" mode="contained"  onPress={() => HandleButton(label)} style={[styles.button,{ backgroundColor: theme === "dark"? "#323232" : "rgb(6, 70, 115)"}]}>
               {label}
             </Button>
          ): (
        <Button icon="send" mode="contained"  onPress={() => HandleButton(label)} style={[styles.button,{ backgroundColor: theme === "dark"? "#323232" : "rgb(6, 70, 115)"}]}>
        {label}
         </Button>
      )}
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
