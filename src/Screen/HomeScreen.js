import React, { useContext, useEffect } from 'react';
import { View, Text, Alert, BackHandler, StyleSheet } from 'react-native';
import AppBar from '../Component/AppBar';
import { MyContext } from '../Context/Context';
import ExpandableScreen from '../Component/ExpandableScreen';
import MyFlatList from '../Component/FlatList';
import Constants from 'expo-constants';
import axios from 'axios';
const HomeScreen = ({ navigation }) => {
  const context = useContext(MyContext);
  const {tcno,  updateSayfa,  updateUserinfo } = context;

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
    <View style={{ flex: 1 }}>
      <AppBar navigation={navigation} />
      <View style={{ flex: 1 }}>
        <View style={styles.listItemContainer}>
          <View style={{ backgroundColor: '#e2e2e2', margin: 10, borderRadius: 10 }}>
            <Text style={{ fontSize: 20 }}> Hesaplarınız </Text>
          </View>
          
          <MyFlatList navigation={navigation} />
        </View>
        <ExpandableScreen onExpand={handleExpand} onCollapse={handleCollapse} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listItemContainer: {
    marginTop: '10%',
    marginHorizontal: '10%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
