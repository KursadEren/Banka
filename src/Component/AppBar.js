import { View, StyleSheet } from 'react-native';
import React, { useContext, useState } from 'react';
import { Appbar, Avatar, Switch, Snackbar } from 'react-native-paper';
import { DrawerActions } from '@react-navigation/native';
import { MyContext } from '../Context/Context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTranslation } from 'react-i18next';

const AppBar = ({ navigation, title }) => {
  const { t, i18n } = useTranslation();
  const context = useContext(MyContext);
  const { sayfa,theme, updatsetLanguage, Language,updateTheme,fullname } = context;

  const [switchValue, setSwitchValue] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const handleSwitchToggle = () => {
    setSwitchValue(!switchValue);
    setSnackbarVisible(true);
    updateTheme(theme === 'dark'? 'light' : 'dark')
  };

  const handleSnackbarDismiss = () => {
    setSnackbarVisible(false);
  };

  const handleMenuToggle = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  const changeLanguage = async () => {
    if (Language === 'tr') {
      updatsetLanguage('en');
      i18n.changeLanguage('en');
    } else if (Language === 'en') {
      updatsetLanguage('tr');
      i18n.changeLanguage('tr');
    }
  };

  return (
    <View>
      <Appbar.Header style={{ backgroundColor: theme === 'dark'? `#323232`: `rgb(6, 70, 115)` }}>
        {sayfa === 'Sign In' ? (
          <Appbar.Content title={title} titleStyle={{ flex: 1, textAlign: 'center', color: 'rgb(218, 231, 237)' }} />
        ) : (
          <>
            <Appbar.Action icon="menu" color="white" onPress={handleMenuToggle} />
            <Appbar.Action icon={() => <Icon name="globe" size={24} color="white" />} onPress={changeLanguage} />
            <Appbar.Content title={title} titleStyle={{ flex: 1, textAlign: 'center', marginHorizontal: '10%', color: 'white' }} />
            <Switch color="white" value={switchValue} onValueChange={handleSwitchToggle} />
            <Appbar.Action icon={() => <Avatar.Text size={30} label={fullname} />} />
          </>
        )}
      </Appbar.Header>
      <Snackbar visible={snackbarVisible} onDismiss={handleSnackbarDismiss} duration={3000}>
        {switchValue ?`${t('darktheme')}`  :`${t('lighttheme')}`}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  nameTag: { justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' },
  nameText: { fontSize: 20 },
});

export default AppBar;
