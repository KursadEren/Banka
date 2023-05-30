import { View, Text } from 'react-native'
import React,{useContext} from 'react'
import { Button } from 'react-native-paper'
import { MyContext } from '../Context/Context'

const Buttonx = ({label,navigation}) => {
    const handleLogin = ()=>{
        
        if(label == "Sign In"){

        }else if(label == "Sign Up"){
            navigation.navigate('Sign Up');
        }
    }
    const context = useContext(MyContext);
    const {  email, updateEmail } = context;
  return (
    <View>
      <Button icon="send" mode="contained" onPress={() => handleLogin()}>
      {label}
     </Button>
      </View>
  )
}
export default Buttonx;