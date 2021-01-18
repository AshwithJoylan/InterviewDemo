import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Main from './MainNavigator';
import { AppearanceProvider } from 'react-native-appearance';

export default () => {
  return (
    <AppearanceProvider>
      <SafeAreaProvider>
        <Main />
      </SafeAreaProvider>
    </AppearanceProvider>
  );
};
