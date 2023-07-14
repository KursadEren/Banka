import React, { useContext } from "react";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Text,StyleSheet } from "react-native";
import { MyContext } from "../Context/Context";
import { useTranslation } from "react-i18next";
import HomeScreen from '../Screen/HomeScreen'
import WatchList from '../Screen/WatchList'
import { View } from "react-native";
import SifreDegistirme from "../Screen/SifreDegistirme";
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const { theme } = useContext(MyContext);
  const { state, ...rest } = props;

  return (
    <DrawerContentScrollView {...rest} style={{ backgroundColor: theme === 'dark' ? '#1e1e1e' : 'rgb(218, 231, 237)' }}>
      <DrawerItemList {...rest} state={state} labelStyle={{ color: theme === 'dark' ? 'white' : 'black' }} />
    </DrawerContentScrollView>
  );
}

const DrawerNavigator = () => {
  const { theme } = useContext(MyContext);
  const { t } = useTranslation();

  return (
    <Drawer.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ headerShown: false }}
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          drawerLabel: ({ focused }) => (
            <View style={[style.container,{borderColor: theme === 'dark' ? 'white':'black' }]}>
            <Text style={{ color : theme === 'dark' ? 'white' : 'black',fontSize: 20 }}>
              {t('HomeScreen')}
              
            </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="WatchList"
        component={WatchList}
        options={{
          drawerLabel: ({ focused }) => (
            <View style={[style.container,{borderColor: theme === 'dark' ? 'white':'black' }]}>
            <Text style={{ color : theme === 'dark' ? 'white' : 'black',fontSize: 20 }}>
              {t('Watchlist')}
              
            </Text>
            <Text style={{marginLeft:'5%',marginTop:'4%',color : theme === 'dark' ? 'white' : 'black',}}>
             - {t('DrawerNoti')}
            </Text>
            </View>
          ),
        }}
      />

<Drawer.Screen
        name="Şifre Değiştirme"
        component={SifreDegistirme}
        options={{
          drawerLabel: ({ focused }) => (
            <View style={[style.container,{borderColor: theme === 'dark' ? 'white':'black' }]}>
            <Text style={{ color: focused ? 'black' : theme === 'dark' ? 'white' : 'black',fontSize: 20 }}>
              {t('SifreDegistirme')}
            </Text>           
            </View>
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const style = StyleSheet.create({
  container:{paddingBottom:'5%',borderBottomWidth:1}
})

export default DrawerNavigator;
