import { View, StyleSheet, Image } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { Link, router } from 'expo-router';
import { useEffect, useState } from 'react';

export default function TabOneScreen() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Show splash for 3 seconds
    setTimeout(() => {
      setShowSplash(false);
      router.replace('/screens/onboarding');
    }, 2000);
  }, []);

  if (showSplash) {
    return (
      <View style={styles.splashContainer}>
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.logo}
        />
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 170,
    height: 150,
    marginBottom: 20,
  },
});
