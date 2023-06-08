import { View, Text,BackHandler,ScrollView } from 'react-native'
import React,{useContext, useEffect} from 'react'
import { MyContext } from '../Context/Context';
import SeeWatchList from '../Component/SeeWatchList';
import ComboBox from '../Component/Combobox';
import TextInputC from '../Component/TextInput';
import Buttonx from '../Component/Button';

const Islem = ({navigation}) => {
    const context = useContext(MyContext);
    const{updateSayfa,sayfa} = context;

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

  return (
    <ScrollView>
    <View style={{flex:1,marginTop:"7%",width:"100%"}}>
     <View style={{flex:1,width:"100%"}}>
           <SeeWatchList sayfa={sayfa}/>

            </View>
            <View style={{flex:3.5}}>
            <View style={{marginVertical:"5%",width:"80%",marginHorizontal:"10%"}}>
                <ComboBox  label="doviztipi"/>
                <View>
                <TextInputC label="merhaba"/>
                </View>
            </View>
            <View style={{marginVertical:"5%",width:"80%",marginHorizontal:"10%"}}>
                <ComboBox  label="doviztipi"/>
                <TextInputC  />
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