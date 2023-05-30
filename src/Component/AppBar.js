import { View, Text,StyleSheet } from 'react-native'
import React,{useContext,useState} from 'react';
import { Appbar,Avatar,Switch,Snackbar,Subheading   } from 'react-native-paper';
import { MyContext } from '../Context/Context';
import Icon from 'react-native-vector-icons/FontAwesome';
import DraverNavigator from '../Screen/HomeScreen';
import App from '../../App';
import { DrawerActions } from '@react-navigation/native';

const AppBar = ({navigation}) => {
    const context = useContext(MyContext);
    const {sayfa,updatesayfa,fullname} = context;

    const [switchValue, setSwitchValue] = useState(false);

    const [snackbarVisible, setSnackbarVisible] = useState(false);
    

    const handleMenuToggle = () => {
        navigation.dispatch(DrawerActions.toggleDrawer());
      };
      
    const handleSwitchToggle = () => {
      setSwitchValue(!switchValue);
      setSnackbarVisible(true);
    };
  
    const handleSnackbarDismiss = () => {
      setSnackbarVisible(false);
    };
   
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