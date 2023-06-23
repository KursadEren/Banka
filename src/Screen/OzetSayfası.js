import { View, Text,BackHandler } from 'react-native'
import React,{useContext, useEffect} from 'react'
import Ozet from '../Component/OzetComponent'
import AppBar from '../Component/AppBar'
import { MyContext } from '../Context/Context'
import { useTranslation } from 'react-i18next'
export default function OzetSayfasi({navigation}) {
    const context = useContext(MyContext)
    const {updateSayfa,theme} = context;
    const { t,i18n } = useTranslation();
    useEffect(() => {

        const backAction = () => {
          updateSayfa("HomeScreen");
          navigation.goBack()
          return true;
        };
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => backHandler.remove();
    }, []);
  return (
    <View style={{flex:1,backgroundColor: theme === 'dark' ? '#1e1e1e':"rgb(218, 231, 237)"}}>
      <View style={{backgroundColor: theme === 'dark' ? '#1e1e1e':"rgb(218, 231, 237)"}}>
      <AppBar title={t('Summary')} navigation={navigation}/>
      </View>
        
        <View style={{flex:1, marginHorizontal:"10%",backgroundColor: theme === 'dark' ? '#1e1e1e':"rgb(218, 231, 237)"}}>
      <Ozet title={t('Transactions')} />
      </View>
    </View>
  )
}