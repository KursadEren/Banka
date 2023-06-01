import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, PanResponder, TouchableOpacity } from 'react-native';
import WatchList from './WatchList';


const ExpandableScreen = ({ onExpand, onCollapse }) => {
  const [expanded, setExpanded] = useState(false);
  const animation = useRef(new Animated.Value(expanded ? 1 : 0)).current;
  const screenHeight = Dimensions.get('window').height;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: (event, gestureState) => {
        return true;
      },
      onPanResponderMove: (event, gestureState) => {
        const { dy } = gestureState;
        const gesturePercentage = dy / screenHeight;
        if (gesturePercentage < -0.2) {
          setExpanded(true);
        } else if (gesturePercentage > 0.2) {
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
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [expanded]);

  const animatedStyle = {
    height: animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['50%', '100%'],
      extrapolate: 'clamp',
    }),
  };

  const animateExpand = () => {
    Animated.timing(animation, {
      toValue: expanded ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.lineContainer}>
        <TouchableOpacity activeOpacity={1} onPress={animateExpand}>
          <View style={styles.line} {...panResponder.panHandlers} />
        </TouchableOpacity>
      </View>
      <View style={styles.expandedContent}>
       <View>
       <WatchList/>
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
    width: 100,
    height: 20,
    backgroundColor: 'gray',
  },
  expandedContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  expandedText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});

export default ExpandableScreen;
