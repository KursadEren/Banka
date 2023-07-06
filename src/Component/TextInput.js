import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
const TextInputC = ({ label, onChangeText, error, errorPassword,errorEmail }) => {
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const { t,i18n } = useTranslation();
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleTextChange = (text) => {
    setText(text);
    onChangeText(text);
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <View style={styles.container}>
      <TextInput
        label={label}
        value={text}
        mode="outlined"
        onBlur={handleBlur}
        onFocus={handleFocus} // Değişiklik burada
        style={{backgroundColor:'rgb(218, 231, 237)'}}
        theme={{colors: {primary: '#064682'}}}
        onChangeText={handleTextChange}
        secureTextEntry={label === t('Password') && !showPassword}
        right={
          label === t('Password') ? (
          <TextInput.Icon
            icon={showPassword ? "eye-off" : 'eye'}
            onPress={toggleShowPassword}
            size={24}
          />
          ) : null
        }
      />
      {error && <HelperText type="error" visible={true}>{error}</HelperText>}
      {errorPassword && <HelperText type="error" visible={true}>{errorPassword}</HelperText>}
      {errorEmail && <HelperText type="error" visible={true}>{errorEmail}</HelperText>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 100
  },
});

export default TextInputC;
