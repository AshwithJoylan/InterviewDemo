import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@utils';

/**
 * @interface HomeProps
 */
interface HomeProps {}

/**
 * Home
 */
const Home: React.FC<HomeProps> = () => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
