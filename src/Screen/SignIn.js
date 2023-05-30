import { View, Text,StyleSheet } from 'react-native'
import React,{useContext,useEffect,useState} from 'react'
import AppBar from '../Component/AppBar'
import { MyContext } from '../Context/Context';
import TextInputC from '../Component/TextInput';
import Buttonx from '../Component/Button';
const SignIn = ({navigation}) => {
    const context = useContext(MyContext);
  const {  email, updateEmail } = context;
  const [password, setPassword] = useState('');
    const handleLogin = () => {
     
        // Expo Constants paketinden IP adresinizi alın.
        const { manifest } = Constants;
        const apiAddress = `http://${manifest.debuggerHost.split(':').shift()}:5000`;
          axios.post(`${apiAddress}/users/login`,{email,password} )
          .then((response) => { 
            if (response.status === 200) {
               
              navigation.navigate('DraverNavigator', { screen: 'HomeScreen' });
                console.log(response.data.message);
              } else {
                // İstek başarısız oldu, hata mesajını gösterin
                console.error(response.data.message);
              }
            })
            .catch(error => {
              // HTTP isteği hata verdi, hata mesajını gösterin
              console.error(error);
            });
            
      }
    


  return (
    <View>
        <View style={style.con}>
            <View style={style.appBarr}>
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