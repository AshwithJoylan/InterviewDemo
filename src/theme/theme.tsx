import {useColorScheme} from 'react-native-appearance';

/**
 * Colors
 */
export interface Colors {
  primary: string;
  secondary: string;
  background: string;
  lightBackground: string;
  darkText: string;
  lightText: string;
  errorText: string;
  successText: string;
  underlay: string;
  success: string;
  error: string;
}

/**
 * Light Mode Theme
 */
const lightColors: Colors = {
  errorText: '#ff0033',
  successText: '#212529',
  success: '#d0f0c0',
  error: '#ff0033',
  primary: '#0F74BC',
  secondary: '#F36421',
  background: '#FFFFFF',
  lightBackground: '#F3F7FF',
  darkText: '#212529',
  lightText: '#90929C',
  underlay: '#21252920',
};

/**
 * Dark Mode Theme
 */
const darkColors: Colors = {
  errorText: '#ff0033',
  successText: '#FFFFFF',
  success: '#123524',
  error: '#ff0033',
  background: '#111118',
  primary: '#0F74BC',
  secondary: '#F36421',
  lightBackground: '#3C4052',
  darkText: '#FFFFFF',
  lightText: '#90929C',
  underlay: '#FFFFFF20',
};

/**
 * useColors Hook
 * gives colors depending appearance
 * @returns Colors
 */
export const useColors = () => {
  const theme = useColorScheme();
  return theme === 'light' ? lightColors : darkColors;
};
