import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { NavigationService } from '@services';
import { CardInterpolator } from '@utils';
import { Login } from '@screens';

/**
 * @interface AuthNavigatorProps
 */
interface AuthNavigatorProps {}

const AuthStack = createStackNavigator();

const screens = NavigationService.getScreens({
  Login,
});

/**
 * AuthNavigator
 */
const AuthNavigator: React.FC<AuthNavigatorProps> = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        gestureDirection: 'horizontal',

        // transitionSpec: {
        //   open: iosTransitionSpec,
        //   close: iosTransitionSpec,
        // },
        cardStyleInterpolator: CardInterpolator,
      }}
      headerMode="none">
      {screens.map(({ name, component }, key) => (
        <AuthStack.Screen {...{ name, component, key }} />
      ))}
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
