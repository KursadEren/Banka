import { View, Text } from 'react-native'
import React,{useContext} from 'react';
import { Appbar,Avatar } from 'react-native-paper';
import { MyContext } from '../Context/Context';



export default function AppBar() {
    const context = useContext(MyContext);
    const {sayfa,updatesayfa} = context;

  return (
    <View>
    <Appbar.Header>
    
    
    <Appbar.Action icon={"menu"} onPress={() => {}} />
    <Appbar.Content title={sayfa}titleStyle={{flex:1,textAlign:'center'}} />
    
    <Appbar.Action icon={() => <Avatar.Image size={24} label="" />}  />
    </Appbar.Header>
    </View>
  )
}