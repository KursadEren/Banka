import React, { useContext, useEffect } from 'react';
import { View, Text, Alert, BackHandler, StyleSheet, Dimensions } from 'react-native';
import AppBar from '../Component/AppBar';
import { MyContext } from '../Context/Context';
import ExpandableScreen from '../Component/ExpandableScreen';
import MyFlatList from '../Component/FlatList';
import Constants from 'expo-constants';
import axios from 'axios';
import ErrorBubble from '../Component/ErrorBuble';

const HomeScreen = ({ navigation }) => {
  const context = useContext(MyContext);
  const { tcno, updateSayfa, updateUserinfo, updatesetoptiondoviz, userinfo } = context;
  useEffect(() => {
    const { manifest } = Constants;
    const apiAddress = `http://${manifest.debuggerHost.split(':').shift()}:5000`;

    axios
      .get(`${apiAddress}/users/dovizsatis/${tcno}`)
      .then((response) => {
        updatesetoptiondoviz(response.data);
        console.log('response.data');
        console.log(response.status);
      })
      .catch((error) => {
        console.error('API veri alınırken bir hata oluştu:', error);
      });
  }, []);

  useEffect(() => {
    const { manifest } = Constants;
    const apiAddress = `http://${manifest.debuggerHost.split(':').shift()}:5000`;

    axios
      .get(`${apiAddress}/users/hesap/${tcno}`)
      .then((response) => {
        if (response.status === 200) {
          updateUserinfo(response.data);
        } else {
          console.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  const backAction = () => {
    Alert.alert('Çıkış yapmak istiyor musunuz?', '', [
      { text: 'Hayır', style: 'cancel' },
      { text: 'Evet', onPress: handleExit },
    ]);

    return true; // Geri tuşu olayını durdur
  };

  const OnChangeButton = (text) => {
    if (text === 'HesapEkle') {
      updateSayfa('HesapEkle');
      navigation.navigate('HesapEkle');
    }
    if (text === '+') {
      updateSayfa('HesapEkle');
      navigation.navigate('HesapEkle');
    }
    if (text === '-') {
      updateSayfa('Ozet');
      navigation.navigate('Ozet');
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
      <AppBar navigation={navigation} />
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}> Hesaplarınız </Text>
        </View>
        <View style={styles.listItemContainer}>
          <MyFlatList OnChangeButton={OnChangeButton} navigation={navigation} />
        </View>
        <ErrorBubble />
        <ExpandableScreen navigation={navigation} onExpand={handleExpand} onCollapse={handleCollapse} />
      </View>
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
    textAlign:"center"
  },
  ExpanScreen: {
    flex: 1,
  },
});

export default HomeScreen;
