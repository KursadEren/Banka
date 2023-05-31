import { View, Text, Alert, BackHandler,StyleSheet } from 'react-native';

import React, { useContext, useEffect } from 'react';

import AppBar from '../Component/AppBar';
import { MyContext } from '../Context/Context';

import MyFlatList from '../Component/FlatList';


const HomeScreen = ({ navigation }) => {
  const context = useContext(MyContext);
  const { sayfa, updateSayfa, email, updateEmail, password, updatePassword, fullname, updateFullname, userinfo, updateUserinfo } = context;

 

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Çıkış yapmak istiyor musunuz?', '', [
        { text: 'Hayır', style: 'cancel' },
        { text: 'Evet', onPress: handleExit },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  const handleExit = () => {
    updateSayfa("Sign In");
    navigation.goBack();
  };

  return (
    <View>
      <AppBar navigation={navigation} />
      <View>
      <View style={style.listItemContainer}>
  
  <View style={{backgroundColor:'#e2e2e2',margin:10,borderRadius:10}}>
    <Text style={{fontSize:20}}> Hesaplarınız </Text>
  </View>
  <MyFlatList/>

  </View>
        
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  listItemContainer:{
    marginTop:'10%',
    marginHorizontal:"10%",
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    
    
  }
    
})

export default HomeScreen;