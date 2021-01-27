import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Main from './MainNavigator';
import { AppearanceProvider } from 'react-native-appearance';
import { Store } from '@store';

export default () => {
  return (
    <AppearanceProvider>
      <SafeAreaProvider>
        <Store>
          <Main />
        </Store>
      </SafeAreaProvider>
    </AppearanceProvider>
  );
};
