import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@utils';

/**
 * @interface MessagesProps
 */
interface MessagesProps {}

/**
 * Messages
 */
const Messages: React.FC<MessagesProps> = () => {
  return (
    <View style={styles.container}>
      <Text>Messages</Text>
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
