import React from 'react';
import { NavigationService } from '@services';
import {
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';
import { Home } from '@screens';
import { CardInterpolator } from '@utils';

/**
 * @interface AppNavigatorProps
 */
interface AppNavigatorProps {}

const AppStack = createStackNavigator();

const screens = NavigationService.getScreens({
  Home,
});

/**
 * AppNavigator
 */
const AppNavigator: React.FC<AppNavigatorProps> = (): JSX.Element => {
  return (
    <AppStack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardInterpolator,
      }}
      headerMode="none">
      {screens.map(({ name, component }, key) => (
        <AppStack.Screen {...{ name, component, key }} />
      ))}
    </AppStack.Navigator>
  );
};

export default AppNavigator;
