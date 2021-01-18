import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { NavigationService } from '@services';
import App from './AppNavigator';
import Auth from './AuthNavigator';
import { CardInterpolator, Root } from '@utils';

/**
 * @interface MainNavigatorProps
 */
interface MainNavigatorProps {}

const MainStack = createStackNavigator();

const screens = NavigationService.getScreens({
  Auth,
  App,
});

/**
 * MainNavigator
 */
const MainNavigator: React.FC<MainNavigatorProps> = () => {
  return (
    <Root>
      <NavigationContainer ref={NavigationService.navigationRef}>
        <MainStack.Navigator
          screenOptions={{
            ...TransitionPresets.SlideFromRightIOS,
            cardStyleInterpolator: CardInterpolator,
          }}
          initialRouteName="App"
          headerMode="none">
          {screens.map(({ name, component }, key) => (
            <MainStack.Screen {...{ name, component, key }} />
          ))}
        </MainStack.Navigator>
      </NavigationContainer>
    </Root>
  );
};

export default MainNavigator;
