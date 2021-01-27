import { useColors } from '@theme';
import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import Container from './Container';

/**
 * Loader
 */
const Loader: React.FC = () => {
  const colors = useColors();
  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.secondary} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
