import { View, Text,StyleSheet, Alert } from 'react-native'
import React,{useContext,useEffect} from 'react'
import AppBar from '../Component/AppBar'
import { MyContext } from '../Context/Context';
import TextInputC from '../Component/TextInput';
import Buttonx from '../Component/Button';
import Constants from 'expo-constants'
import axios from 'axios';


const SignIn = ({navigation}) => {
 
    
    const context = useContext(MyContext);
    const {dogumtarih,tcno, updateSayfa,  password, userinfo,selectedOptiondoviz,selectedOptionsube,selectedOptionhesap,selectedIBAN,updateTcno, email, updateEmail,updatePassword,telno,updatesetTelno,   fullname,updateFullname, } = context;
  
   
  useEffect(() => {
    // Sayfa açıldığında bir kez çalışacak işlemler
    
    updateSayfa("Sign In"); // Örnek olarak sayfa değerini güncelliyoruz
    
  }, []);
  const OnChangeButton = (text) =>{
    if(text ==='Sign In')
    {
    const { manifest } = Constants;
      const apiAddress = `http://${manifest.debuggerHost.split(':').shift()}:5000`;
      axios
        .post(`${apiAddress}/users/login`, { tcno, password })
        .then((response) => {
          
          if (response.status === 200) {
            
            
            navigation.navigate('DraverNavigator', { screen: 'HomeScreen' });
            
          } else {
            // İstek başarısız oldu, hata mesajını gösterin
           
            console.error(response.data.message);
          }
        })
        .catch((error) => {
          // HTTP isteği hata verdi, hata mesajını gösterin
          console.error(error);
        });
      }else if(text ==='Sign Up')
      {
        navigation.navigate('Sign Up');
      }
      else {
        Alert.alert('hata');
      }
  }

  return (
    <View style={{flex:1,backgroundColor:"rgb(6, 70, 130)"}}>
        <View style={style.con}>
            <View style={style.appBarr}>
                <AppBar/>
               <Text style={{textAlign:'center',marginTop:"10%",fontSize:20 }}> Hoşgeldiniz </Text>
            </View>
            <View style={style.Body}>
                <View style={style.TextInput}>
                <TextInputC onChangeText={updateTcno} label="TC No"/>
                </View>
                <View style={style.TextInput}>
                <TextInputC onChangeText={updatePassword} label="Password"/>
                </View>
                <View style={style.ButonContainer}>
                <Buttonx label="Sign In" OnChangeButton={OnChangeButton} navigation={navigation}/>
                <Buttonx label="Sign Up" OnChangeButton={OnChangeButton} navigation={navigation}/>
               </View>
               <View style={style.or}>
                <View style={{borderBottomWidth: 1, flex: 1,position: 'relative', top: -7}} ></View>
                <Text style={{marginHorizontal: 5}}> Or </Text>
                <View style={{borderBottomWidth: 1, flex: 1,position: 'relative', top: -7}} ></View>
               </View>
   
            </View>
            <View style={style.ButonContainer}>
                
            </View>
            
        </View>
     
    </View>
  );
}

const style = StyleSheet.create({
    container:{flex:1,flexDirection:'row'},
    appBarr:{},
    Body:{marginVertical:'5%',marginHorizontal:'10%'},
    ButonContainer:{flexDirection:'row',justifyContent:'space-around',marginTop:"20%"},
    TextInput:{marginVertical:'8%'},
    or:{flexDirection:"row",marginTop:20}
})
export default SignIn