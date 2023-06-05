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
                <TextInputC label="TC No"/>
                </View>
                <View style={style.TextInput}>
                <TextInputC label="Password"/>
                </View>
                <View style={style.ButonContainer}>
                <Buttonx label="Sign In" navigation={navigation}/>
                <Buttonx label="Sign Up" navigation={navigation}/>
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
    appBarr:{marginVertical:'5%'},
    Body:{marginVertical:'5%',marginHorizontal:'10%'},
    ButonContainer:{flexDirection:'row',justifyContent:'space-around',marginTop:"20%"},
    TextInput:{marginVertical:'8%'},
    or:{flexDirection:"row",marginTop:20}
})
export default SignIn