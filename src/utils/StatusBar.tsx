import React from 'react';
import { StatusBar } from 'react-native';
import { useColorScheme } from 'react-native-appearance';

/**
 * @interface StatusBarProps
 */
interface StatusBarProps {
  translucent?: boolean;
  backgroundColor?: string;
}

/**
 * StatusBar
 */
export default ({
  translucent = true,
  backgroundColor = 'rgba(0, 0, 0, 0.05)',
}: StatusBarProps) => {
  const theme = useColorScheme();
  const barStyle = theme === 'light' ? 'dark-content' : 'light-content';
  return <StatusBar {...{ translucent, backgroundColor, barStyle }} />;
};
