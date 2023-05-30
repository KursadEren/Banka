import { View, Text,StyleSheet } from 'react-native'
import React,{useContext,useEffect,useState} from 'react'
import AppBar from '../Component/AppBar'
import { MyContext } from '../Context/Context';
import TextInputC from '../Component/TextInput';
import Buttonx from '../Component/Button';
const SignIn = ({navigation}) => {
    
    const context = useContext(MyContext);
  const {sayfa, updateSayfa ,  email, updateEmail,password,
    updatePassword} = context;
  
   
  useEffect(() => {
    // Sayfa açıldığında bir kez çalışacak işlemler
    
    updateSayfa("Sign In"); // Örnek olarak sayfa değerini güncelliyoruz
    
  }, []);



  return (
    <View>
        <View style={style.con}>
            <View style={style.appBarr}>
                <AppBar/>
               <Text style={{textAlign:'center',marginTop:"10%",fontSize:20,}}> Hoşgeldiniz </Text>
            </View>
            <View style={style.Body}>
                <View style={style.TextInput}>
                <TextInputC label="E-mail"/>
                </View>
                <View style={style.TextInput}>
                <TextInputC label="Password"/>
                </View>
                <View style={style.ButonContainer}>
                <Buttonx label="Sign In" navigation={navigation}/>
                <Buttonx label="Sign Up" navigation={navigation}/>
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
    appBarr:{marginVertical:'5%'},
    Body:{marginVertical:'5%',marginHorizontal:'10%'},
    ButonContainer:{flexDirection:'row',justifyContent:'space-around'},
    TextInput:{marginVertical:'5%'}
})
export default SignIn