import HomeScreen from "../Screen/HomeScreen";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Profile from '../Screen/Profile';
import WatchList from "../Screen/WatchList";
import Islem from '../Screen/islem';
import React, { useContext } from "react";
import { MyContext } from "../Context/Context";
import { useTranslation } from "react-i18next";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const { theme } = useContext(MyContext);
 
  const { state, ...rest } = props;

  return (
    <DrawerContentScrollView {...rest} style={{ backgroundColor: theme === 'dark' ? '#1e1e1e' : 'rgb(218, 231, 237)' }}>
      <DrawerItemList
        {...rest}
        state={state}
        labelStyle={{
          color: theme === 'dark' ? 'white' : 'black'
        }}
      />
    </DrawerContentScrollView>
  );
}

const DraverNavigator = () => {
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
        options={({ navigation }) => ({
          drawerLabel: t('HomeScreen'), // Çevrilen metni burada alın
          drawerLabelStyle: { color: theme === 'dark' ? 'white' : 'black' },
        })}
      />
      
      <Drawer.Screen
        name="WatchList"
        component={WatchList}
        options={{
          drawerLabel: t('Watchlist'),
          drawerLabelStyle: { color: theme === 'dark' ? 'white' : 'black' },
        }}
      />
    </Drawer.Navigator>
  );
};

export default DraverNavigator;
