import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Alert, BackHandler, StyleSheet, Dimensions, ScrollView } from 'react-native';
import AppBar from '../Component/AppBar';
import { MyContext } from '../Context/Context';
import ExpandableScreen from '../Component/ExpandableScreen';
import MyFlatList from '../Component/FlatList';
import Constants from 'expo-constants';
import axios from 'axios';
import ErrorBubble from '../Component/ErrorBuble';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

const HomeScreen = ({ navigation }) => {
  const { t, i18n } = useTranslation();

  const context = useContext(MyContext);
  const {
    tcno,
    updateTcno,
    updateSayfa,
    updatesetoptiondoviz,
    updatesetOptions2,updatesetOptions3,
    Language,
    options2,
    updatsetsetuserid,
    usersid,
    updatesetOptions,
    theme,
    updatsetDovizFull,
    dovizFull
  } = context;
  

  const fetchData = async () => {
    i18n.changeLanguage(Language);
    
      const { manifest } = Constants;
      const apiAddress = `http://${manifest.debuggerHost.split(':').shift()}:5000`;

      axios
        .get(`${apiAddress}/users/users/${tcno}`)
        .then((response) => {
          
          updatsetsetuserid(response.data[0].userid);
          
        })
        .catch((error) => {
          console.error('API veri alınırken bir hata oluştu:', error);
        });

        //////////////////////////////////////
        axios
        .get(`${apiAddress}/users/doviztipi/${tcno}`)
        .then((response) => {
          // API'den alınan verileri options state'ine ata
          updatesetOptions(response.data);
          console.log(response.data)
        })
        .catch((error) => {
          console.error('API veri alınırken bir hata oluştu:', error);
        });
        ////////////////////////////////////////////



        try {
          const response1 = await axios.get(`${apiAddress}/users/doviztipiF`);
          await new Promise(resolve => setTimeout(resolve, 1000)); // İsteğin tamamlanması için 1 saniye bekleyin (isteğe bağlı)
          updatsetDovizFull(response1.data);
        } catch (error) {
          console.error('API veri alınırken bir hata oluştu:', error);
        }
        
        try {
          const response2 = await axios.get(`${apiAddress}/users/hesaptur`);
          await new Promise(resolve => setTimeout(resolve, 1000)); // İsteğin tamamlanması için 1 saniye bekleyin (isteğe bağlı)
          updatesetOptions2(response2.data);
          console.log(response2.data);
        } catch (error) {
          console.error('API veri alınırken bir hata oluştu:', error);
        }
        
        try {
          const response3 = await axios.get(`${apiAddress}/users/sube`);
          await new Promise(resolve => setTimeout(resolve, 1000)); // İsteğin tamamlanması için 1 saniye bekleyin (isteğe bağlı)
          updatesetOptions3(response3.data);
          console.log(response3.data);
        } catch (error) {
          console.error('API veri alınırken bir hata oluştu:', error);
        }
        try {
          const response = await axios.get(`${apiAddress}/users/dovizsatis/${tcno}`);
          await new Promise(resolve => setTimeout(resolve, 1000)); // İsteğin tamamlanması için 1 saniye bekleyin (isteğe bağlı)
          updatesetoptiondoviz(response.data);
        } catch (error) {
          console.error('API veri alınırken bir hata oluştu:', error);
        }
        
            

  
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  const backAction = () => {
    Alert.alert(`${t('Notification')}`, '', [
      { text: `${t('No')}`, style: 'cancel' },
      { text: `${t('Yes')}`, onPress: handleExit },
    ]);

    return true; // Geri tuşu olayını durdur
  };

  const OnChangeButton = async (text) => {
    if (text === 'HesapEkle') {
      updateSayfa('HesapEkle');
      navigation.navigate('HesapEkle');
    }
    if (text === '+') {
      updateSayfa('HesapEkle');
      navigation.navigate('HesapEkle');
    }
    if (text === '-') {
      updateSayfa('Hesapduzenle');
      navigation.navigate('Hesapduzenle');
    }
    if (text === 'islemler') {
      updateSayfa('OzetSayfasi');
      navigation.navigate('OzetSayfasi');
    }
  };

  const handleExit = () => {
   
    updateTcno('')
    updateSayfa('Sign In');
    navigation.goBack();
  };

  const handleExpand = () => {
    // Burada yapılacak işlemler
  };

  const handleCollapse = () => {
    // Burada yapılacak işlemler
  };

  return (
    <View style={[styles.container,{backgroundColor:theme === 'dark'? `#1e1e1e`: `rgb(218, 231, 237)`}]}>
      <AppBar title={t('HomeScreen')} navigation={navigation} />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={[styles.headerText,{color: theme === 'dark' ? 'white':'black'}]}>{t('Account')}</Text>
        </View>
        <View style={styles.listItemContainer}>
          <MyFlatList OnChangeButton={OnChangeButton} navigation={navigation} />
        </View>
        <View style={{flex:1.5}}>
        <ErrorBubble />
        </View>
        <ExpandableScreen navigation={navigation} onExpand={handleExpand} onCollapse={handleCollapse} />
        </ScrollView>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  listItemContainer: {
   
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
   flex:1,
   
  },
  headerContainer: {
    
    margin:"1%",
    borderRadius: 10,
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
  },
  ExpanScreen: {
    flex: 1,
  },
});

export default HomeScreen;
