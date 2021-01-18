import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@utils';

/**
 * @interface LoginProps
 */
interface LoginProps {}

/**
 * Login
 */
const Login: React.FC<LoginProps> = () => {
  return (
    <View style={styles.container}>
      <Text>Login</Text>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
