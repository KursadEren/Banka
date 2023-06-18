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
    updateSayfa,
    updatesetoptiondoviz,
    Language,
    updatsetsetuserid,
    usersid,
  } = context;

  const fetchData = async () => {
    i18n.changeLanguage(Language);
    try {
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

      const response = await axios.get(`${apiAddress}/users/dovizsatis/${tcno}`);

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
    BackHandler.removeEventListener('hardwareBackPress', backAction); // Geri tuşu olayını kaldır

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
    <View style={styles.container}>
      <AppBar title={t('HomeScreen')} navigation={navigation} />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{t('Account')}</Text>
        </View>
        <View style={styles.listItemContainer}>
          <MyFlatList OnChangeButton={OnChangeButton} navigation={navigation} />
        </View>
        <ErrorBubble />
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
    marginTop: height * 0.01,
    marginHorizontal: width * 0.1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    backgroundColor: 'rgb(218, 231, 237)',
    margin: 10,
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
