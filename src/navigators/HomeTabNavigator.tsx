import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon, ReHighlight, Text } from '@utils';
import {
  NavigationState,
  SceneMap,
  SceneRendererProps,
  TabView,
} from 'react-native-tab-view';
import { Home, Messages } from '@screens';
import { Sizes } from '@metrics';
import { useColors } from '@theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Tab {
  title: string;
  key: string;
  icon: string;
}

const routes: Tab[] = [
  {
    title: 'Home',
    key: 'Home',
    icon: 'ios-home',
  },
  {
    title: 'Messages',
    key: 'Messages',
    icon: 'ios-chatbubbles',
  },
];

/**
 * HomeTabNavigator
 */
const HomeTabNavigator: React.FC = () => {
  /**
   * Tab Index
   */
  const [index, setIndex] = useState(0);

  const colors = useColors();
  const { bottom } = useSafeAreaInsets();
  const TAB_BAR_HEIGHT = Sizes.SIZE_50 + bottom;

  /**
   * Tab Bar
   */
  const renderTabBar = (
    props: SceneRendererProps & {
      navigationState: NavigationState<any>;
    },
  ) => {
    return (
      <View
        style={[
          styles.tabBar,
          {
            backgroundColor: colors.background,
            height: TAB_BAR_HEIGHT,
            paddingBottom: bottom,
          },
        ]}>
        {props.navigationState.routes.map((route, key) => {
          const active = index === key;
          const name = (route as Tab).icon;
          const color = active ? colors.primary : colors.lightText;
          const type = route.type;
          const onPress = () => {
            setIndex(key);
          };
          return (
            <ReHighlight {...{ key, onPress }} style={[styles.tabItem]}>
              <Icon {...{ name, type, color }} size={Sizes.SIZE_22} />
            </ReHighlight>
          );
        })}
      </View>
    );
  };

  /**
   * Render Scene
   */
  const renderScene = SceneMap({
    Home,
    Messages,
  });
  return (
    <TabView
      onIndexChange={setIndex}
      {...{ renderTabBar, renderScene }}
      tabBarPosition="bottom"
      initialLayout={{ width: Sizes.WIDTH }}
      navigationState={{ index, routes }}
    />
  );
};

export default HomeTabNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  tabBar: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
