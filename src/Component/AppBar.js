import { View, Text } from 'react-native'
import React,{useContext} from 'react';
import { Appbar,Avatar } from 'react-native-paper';
import { MyContext } from '../Context/Context';
import Icon from 'react-native-vector-icons/FontAwesome';

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
          <Appbar.Action icon={() => <Icon name="globe" size={24} />} onPress={() => {}} />
          <Appbar.Content title={sayfa} titleStyle={{ flex: 1, textAlign: 'center' }} />
          <Appbar.Action icon={() => <Avatar.Image size={24} label="" />} />
        </>
      )}
    </Appbar.Header>
  </View>
  )
}