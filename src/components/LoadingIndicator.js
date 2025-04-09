import React, { useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Animated, 
  Easing 
} from 'react-native';

const LoadingIndicator = ({ message = 'Loading...' }) => {
  const spinValue = new Animated.Value(0);
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    // Start rotation animation
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Start fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    return () => {
      // Cleanup animations when component unmounts
      spinValue.stopAnimation();
      fadeAnim.stopAnimation();
    };
  }, []);

  // Interpolate rotation value
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Animated.View style={[styles.spinner, { transform: [{ rotate: spin }] }]}>
        <View style={styles.circle} />
      </Animated.View>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  spinner: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#007BFF',
    borderTopColor: 'rgba(0, 123, 255, 0.2)',
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    color: '#555',
    fontWeight: '500',
  },
});

export default LoadingIndicator;