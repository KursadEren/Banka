import { View, Text,BackHandler,ScrollView } from 'react-native'
import React,{useContext, useEffect, useState} from 'react'
import { MyContext } from '../Context/Context';
import SeeWatchList from '../Component/SeeWatchList';
import ComboBox from '../Component/Combobox';
import TextInputC from '../Component/TextInput';
import Buttonx from '../Component/Button';
import axios from 'axios';
import Constants from 'expo-constants'
import { Ionicons } from '@expo/vector-icons';
import Bilgi from '../Component/Bilgi';


const Islem = ({navigation}) => {
    const context = useContext(MyContext);
    const{updateSayfa,sayfa,updatesetoptiondoviz,alisSatisdoviz} = context;
    const[dolarmiktar,setdolarmiktar] = useState('');
    useEffect(() => {
      
     
        
        const backAction = () => {
          updateSayfa("HomeScreen");
          navigation.navigate('HomeScreen');
          return true;
        };
        
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    
        return () => backHandler.remove();
      }, []);

      useEffect(() => {
        // Sayfa adını "islem" olarak güncelle
        updateSayfa("islem");
      }, []);

    const  OnChangeButton =  () =>{

    }
    useEffect(()=>{
      const { manifest } = Constants;
      const apiAddress = `http://${manifest.debuggerHost.split(':').shift()}:5000`;
  
      axios
      .get(`${apiAddress}/users/dovizsatis`)
      .then((response) => {
        // API'den alınan verileri options state'ine ata
        
        updatesetoptiondoviz(response.data);
      })
      .catch((error) => {
        console.error('API veri alınırken bir hata oluştu:', error);
      });
    },[])


  return (
    <ScrollView>
    <View style={{flex:1,marginTop:"7%",width:"100%"}}>
            <View style={{flex:3.5}}>
            <View style={{marginVertical:"5%",width:"100%",flexDirection:"row",justifyContent:"center"}}>
              
                
                <ComboBox  label="doviztipialis"/>
            </View>
            <View style={{marginVertical:"5%",width:"80%",marginHorizontal:"10%"}}>
                <View>
                <TextInputC onChangeText={setdolarmiktar} label="Miktar"/>
                </View>
            </View>
            </View>
            <View style={{marginTop:'20%'}}>
              <Bilgi/>
              
                <Buttonx label="Çevir" OnChangeButton={OnChangeButton} navigation={navigation} />
            </View>
            <Text>{alisSatisdoviz}</Text>
    </View>
    </ScrollView>
  )
}
export default Islem