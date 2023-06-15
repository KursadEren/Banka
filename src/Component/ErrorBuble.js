import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MyContext } from '../Context/Context';

const ErrorBubble = ({ message }) => {

    const context = useContext(MyContext)
    const {errortext,
        updatesetErrorText,} = context;
  if (!errortext) {
    return null; // Mesaj yoksa bileşen null döndürerek hiçbir şey göstermeyecek
  }

  return (
    <View style={styles.errorBubble}>
      <Text style={styles.errorMessage}>{errortext}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errorBubble: {
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 10,
    alignSelf: 'flex-start',
    marginBottom: 10,
    position:"relative",
    marginHorizontal:"17%"
  },
  errorMessage: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ErrorBubble;
