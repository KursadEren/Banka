import { View, Text,StyleSheet } from 'react-native'
import React,{useContext,useState} from 'react';
import { Appbar,Avatar,Switch,Snackbar,Subheading   } from 'react-native-paper';
import { MyContext } from '../Context/Context';
import Icon from 'react-native-vector-icons/FontAwesome';

const AppBar = ({navigation}) => {
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
    <Snackbar
        visible={snackbarVisible}
        onDismiss={handleSnackbarDismiss}
        duration={3000}
      >
        {switchValue ? 'Açık Tema' : 'Koyu Tema'}
      </Snackbar>
      
  </View>
  )
}

const style = StyleSheet.create({
    nameTag:{justifyContent:"center",alignItems:"center",backgroundColor:"white"},
    nameText:{fontSize:20}
})
export default AppBar;