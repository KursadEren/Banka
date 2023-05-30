import { View, Text } from 'react-native'
import {  DrawerActions } from '@react-navigation/native';
import React from 'react'
import {
  
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    
  } from '@react-navigation/drawer'; 


 const HomeScreen = () => {
  return (
    <View>
      <Text>HomeScreen</Text>
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
        
      </Drawer.Navigator>
      
    );
  }
  
  export default DraverNavigator;