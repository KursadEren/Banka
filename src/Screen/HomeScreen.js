import { View, Text } from 'react-native'
import {  DrawerActions } from '@react-navigation/native';
import React,{useContext,useEffect} from 'react'
import {
  
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    
  } from '@react-navigation/drawer'; 
import AppBar from '../Component/AppBar';
import { MyContext } from '../Context/Context';
import Constants from 'expo-constants';
import axios from 'axios';
import Profile from './Profile';
 const HomeScreen = ({navigation}) => {

    const context = useContext(MyContext);
    const {sayfa, updateSayfa ,  email, updateEmail,password,
      updatePassword,fullname,
      updateFullname,userinfo,
      updateUserinfo} = context;
    
     
    useEffect(() => {
        updateSayfa("HomeScreen");
        const { manifest } = Constants;
        const apiAddress = `http://${manifest.debuggerHost.split(':').shift()}:5000`;
          axios.get(`${apiAddress}/users/hesap/${email}`, )
          .then((response) => {
            if (response.status === 200 ) {
                updateFullname(response.data[1].fullname)
                updateUserinfo(response.data)
                console.log(response.data)
              } else {
                // İstek başarısız oldu, hata mesajını gösterin
                
                console.error(response.data.message);
              }
            })
            .catch(error => {
              // HTTP isteği hata verdi, hata mesajını gösterin
              console.error(error);
            });
       // Örnek olarak sayfa değerini güncelliyoruz
    }, []);
  


  return (
    <View>
     <AppBar navigation={navigation}/>
    </View>
  )
}
const Drawer = createDrawerNavigator();
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      
    </DrawerContentScrollView>
  );
}

const DraverNavigator =  () => { 
    return (
   
      <Drawer.Navigator
        initialRouteName="HomeScreen"
         screenOptions={{headerShown:false}}
         useLegacyImplementation
          drawerContent={(props) => <CustomDrawerContent {...props}     />}
          
        >
        <Drawer.Screen name='HomeScreen'   component={HomeScreen} />
        <Drawer.Screen name='Profile'   component={Profile} />
        
      </Drawer.Navigator>
      
    );
  }
  
  export default DraverNavigator;