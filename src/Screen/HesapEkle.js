import React, { useEffect, useContext } from 'react';
import { BackHandler } from 'react-native';
import { MyContext } from '../Context/Context';
import { View,Text } from 'react-native';

export default function HesapEkle({ navigation }) {
  const context = useContext(MyContext);
  const {sayfa, updateSayfa } = context;

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => backHandler.remove();
  }, []);

  const handleBackPress = () => {
    updateSayfa('HomeScreen'); // sayfa değerini "HomeScreen" olarak güncelle
    navigation.navigate('HomeScreen'); // HomeScreen'e geri dön
    return true; // geri tuşuna bastığında işlemin devam etmesini engelle
  };

  return (
    <View>
      <Text style={{ marginTop: 350 }}>{sayfa}</Text>
    </View>
  );
}
