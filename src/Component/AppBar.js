import { View, Text } from 'react-native'
import React,{useContext} from 'react';
import { Appbar,Avatar } from 'react-native-paper';
import { MyContext } from '../Context/Context';
import Icon from 'react-native-vector-icons/FontAwesome';
import DraverNavigator from '../Screen/HomeScreen';
import App from '../../App';
import { DrawerActions } from '@react-navigation/native';

export default function AppBar() {
    const context = useContext(MyContext);
    const {sayfa,updatesayfa} = context;


  return (
    <View>
    <Appbar.Header>
      {sayfa === 'Sign In' ? (
        <Appbar.Content title={sayfa} titleStyle={{ flex: 1, textAlign: 'center' }} />
        
      ) : (
        <>
        <Appbar.Action icon="menu" onPress={handleMenuToggle} />

          <Appbar.Action icon={() => <Icon name="globe" size={24} />}  />
          
          <Appbar.Content title={sayfa} titleStyle={{ flex: 1, textAlign: 'center',marginHorizontal:"10%" }} />
          <Switch value={switchValue} onValueChange={handleSwitchToggle} />
          <Appbar.Action icon={() => <Avatar.Image size={24} label="" />} />
        </>
      )}
    </Appbar.Header>
  </View>
  )
}