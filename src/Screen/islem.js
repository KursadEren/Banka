import { View, Text,BackHandler,ScrollView } from 'react-native'
import React,{useContext, useEffect} from 'react'
import { MyContext } from '../Context/Context';
import SeeWatchList from '../Component/SeeWatchList';
import ComboBox from '../Component/Combobox';
import TextInputC from '../Component/TextInput';
import Buttonx from '../Component/Button';
import axios from 'axios';
import Constants from 'expo-constants'
import { log } from 'react-native-reanimated';
const Islem = ({navigation}) => {
    const context = useContext(MyContext);
    const{updateSayfa,sayfa,updatesetoptiondoviz} = context;

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
     <View style={{flex:1,width:"100%"}}>
           <SeeWatchList sayfa={sayfa}/>

            </View>
            <View style={{flex:3.5}}>
            <View style={{marginVertical:"5%",width:"80%",marginHorizontal:"10%"}}>
                <ComboBox  label="doviztipisatis"/>
                <View>
                <TextInputC label="Satış"/>
                </View>
            </View>
            <View style={{marginVertical:"5%",width:"80%",marginHorizontal:"10%"}}>
                <ComboBox  label="doviztipialis"/>
                <TextInputC label="Alış" />
            </View>
            </View>
            <View style={{marginTop:'20%'}}>
                <Buttonx label="Çevir" OnChangeButton={OnChangeButton} navigation={navigation} />
            </View>
    </View>
    </ScrollView>
  )
}
export default Islem