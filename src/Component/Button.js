import { View, Text } from 'react-native'
import React,{useContext} from 'react'
import { Button } from 'react-native-paper'
import { MyContext } from '../Context/Context'
import Constants from 'expo-constants';
import axios from 'axios';
const Buttonx = ({label,navigation}) => {
    const context = useContext(MyContext);
    const {sayfa, updateSayfa ,  email, updateEmail,password,
      updatePassword} = context;
    const handleLogin = ()=>{
        
        if(label == "Sign In"){
            
     
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
                    
              

        }else if(label == "Sign Up"){
            navigation.navigate('Sign Up');
        }
    }
   
  return (
    <View>
      <Button icon="send" mode="contained" onPress={() => handleLogin()}>
      {label}
     </Button>
      </View>
  )
}
export default Buttonx;