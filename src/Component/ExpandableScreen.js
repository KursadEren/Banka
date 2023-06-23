import React, { useState, useRef, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, PanResponder, TouchableOpacity, ScrollView } from 'react-native';
import SeeWatchList from './SeeWatchList';

import { MyContext } from '../Context/Context';

const ExpandableScreen = ({ onExpand, onCollapse, navigation,setErrorMessage }) => {

  const context = useContext(MyContext)
  const {theme} = context

  const [expanded, setExpanded] = useState(false);
  const animation = useRef(new Animated.Value(expanded ? 1 : 0)).current;
  const screenHeight = Dimensions.get('window').height;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: (event, gestureState) => {
        // Increase sensitivity by returning true for all movements
        return true;
      },
      onPanResponderMove: (event, gestureState) => {
        const { dy } = gestureState;
        const gesturePercentage = dy / screenHeight;

        if (gesturePercentage < -0.000002) {
          setExpanded(true);
        } else if (gesturePercentage > 0.000002) {
          setExpanded(false);
        }

        // Ekrana göre yukarı veya aşağı kaydırmak için ekranın yüzde 10'unu geçmesini kontrol et
        if (dy < -screenHeight * 0.1) {
          setExpanded(true);
        } else if (dy > screenHeight * 0.1) {
          setExpanded(false);
        }
      },
      onPanResponderRelease: () => {
        animateExpand();
      },
    })
  ).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: expanded ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [expanded]);

  const animatedStyle = {
    height: animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['47%', '100%'],
      extrapolate: 'clamp',
    }),
  };

  const animateExpand = () => {
    setExpanded(animation._value === 0 ? false : true);
  };

  return (
    <Animated.View style={[styles.container, animatedStyle,{backgroundColor:  theme === 'dark'? `#323232`: `white`}]}>
      <View style={styles.lineContainer}>
        {/* Wrap the line in a TouchableOpacity for touch effect */}
        <TouchableOpacity activeOpacity={1} onPress={animateExpand}>
          <View style={[styles.line,{backgroundColor:theme === 'dark'? `#1e1e1e`: `rgb(6, 70, 115)`}]} {...panResponder.panHandlers} />
        </TouchableOpacity>
      </View>

      <View style={styles.expandedContent}>
        <View style={{ height: expanded ? '100%' : '100%', width: '100%',backgroundColor:theme === 'dark'? `#1e1e1e`: `rgb(218, 231, 237)` }}>
           <SeeWatchList  setErrorMessage={setErrorMessage} navigation={navigation} />
        </View>
       
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  lineContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  line: {
    width: 200,
    borderRadius: 20,
    height: 15,
    
  },
  expandedContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
    width: '100%',
  },
  expandedText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});

export default ExpandableScreen;
