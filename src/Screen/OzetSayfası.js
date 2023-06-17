import { View, Text,BackHandler } from 'react-native'
import React,{useContext, useEffect} from 'react'
import Ozet from '../Component/OzetComponent'
import AppBar from '../Component/AppBar'
import { MyContext } from '../Context/Context'

export default function OzetSayfasi({navigation}) {
    const context = useContext(MyContext)
    const {updateSayfa} = context;
    useEffect(() => {

        const backAction = () => {
          updateSayfa("HomeScreen");
          navigation.navigate('HomeScreen');
          return true;
        };
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => backHandler.remove();
    }, []);
  return (
    <View style={{flex:1}}>
        <AppBar navigation={navigation}/>
      <Ozet/>
    </View>
  )
}