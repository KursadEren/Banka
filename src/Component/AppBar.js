import { View, Text,StyleSheet } from 'react-native'
import React,{useContext,useState} from 'react';
import { Appbar,Avatar,Switch,Snackbar,Subheading,snackbarVisible,handleSnackbarDismiss,switchValue   } from 'react-native-paper';
import { MyContext } from '../Context/Context';
import Icon from 'react-native-vector-icons/FontAwesome'
import { DrawerActions } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
const AppBar = ({navigation,title}) => {
  const { t,i18n } = useTranslation();
    const context = useContext(MyContext);
    const {sayfa,updatesayfa,userinfo} = context;

    const [switchValue, setSwitchValue] = useState(false);

  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const handleSwitchToggle = () => {
    setSwitchValue(!switchValue);
    setSnackbarVisible(true);
  };

  const handleSnackbarDismiss = () => {
    setSnackbarVisible(false);
  };

    const handleMenuToggle = () => {
      navigation.dispatch(DrawerActions.toggleDrawer()); // Drawer'ı açmak için DrawerActions.toggleDrawer() kullanın
    };
    const localizedSayfa = t(sayfa);
  return (
    <View>
    <Appbar.Header style={{backgroundColor:"rgb(6, 70, 130)"}}>
      {sayfa === 'Sign In' ? (
        <Appbar.Content  title={title } titleStyle={{ flex: 1, textAlign: 'center',color:'rgb(218, 231, 237)' }} />
        
      ) : (
        <>
        <Appbar.Action icon="menu" color='white' onPress={handleMenuToggle} />
            <Appbar.Action icon={() => <Icon name="globe" size={24} color="white" />} onPress={() => DraverNavigator()} />

            <Appbar.Content title={title} titleStyle={{ flex: 1, textAlign: 'center', marginHorizontal: '10%',color:"white"  }} />
            <Switch color='white' value={switchValue} onValueChange={handleSwitchToggle} />
            <Appbar.Action icon={() => <Avatar.Image size={24} label=""   />} />
            
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