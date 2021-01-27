import React from 'react';
import { NavigationService } from '@services';
import {
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';
import HomeTabs from './HomeTabNavigator';
import { CardInterpolator } from '@utils';

/**
 * @interface AppNavigatorProps
 */
interface AppNavigatorProps {}

const AppStack = createStackNavigator();

const screens = NavigationService.getScreens({
  HomeTabs,
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
