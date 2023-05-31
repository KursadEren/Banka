import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, PanResponder } from 'react-native';

const ExpandableScreen = ({ onExpand, onCollapse }) => {
  const [expanded, setExpanded] = useState(false);
  const animation = new Animated.Value(expanded ? 1 : 0);
  const screenHeight = Dimensions.get('window').height;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        if (gestureState.dy < -50) {
          setExpanded(true);
        } else if (gestureState.dy > 50) {
          setExpanded(false);
        }
      },
      onPanResponderRelease: () => {},
    })
  ).current;

  const animateExpand = () => {
    Animated.timing(animation, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  const handleExpand = () => {
    setExpanded(!expanded);
    if (!expanded) {
      onExpand();
      
    } else {
      onCollapse();
      
    }
    animateExpand();
  };
  

  const animatedStyle = {
    height: animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['50%', '100%'],
    }),
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.lineContainer}>
        <View style={styles.line} onPress={handleExpand}{...panResponder.panHandlers} />
      </View>
      <View style={styles.expandedContent}>
        <Text style={styles.expandedText}>Expanded Content</Text>
        <Text style={styles.expandedText}>Expanded Content</Text>
        {/* Diğer expandedText öğeleri */}
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
    height: 10,
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
