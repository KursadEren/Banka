import React from 'react';
import { View, StyleSheet } from 'react-native';

const Line = () => {
  return <View style={styles.line} />;
};

const styles = StyleSheet.create({
  line: {
    width: 100,
    height: 5 ,
    borderRadius:20,
    backgroundColor: 'black', // Çizginin rengini buradan ayarlayabilirsiniz
  },
});

export default Line;