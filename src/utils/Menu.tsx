import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import { View, StyleSheet, BackHandler } from 'react-native';
import ReHighlight from './ReHighlight';
import Text from './Text';
import Animated, {
  call,
  clockRunning,
  cond,
  Easing,
  eq,
  greaterThan,
  interpolate,
  lessThan,
  not,
  set,
  timing as runTiming,
  useCode,
} from 'react-native-reanimated';
import { createState } from './state';
import { Sizes, Typography } from '@metrics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  FlatList,
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';
import {
  timing,
  useClock,
  usePanGestureHandler,
  useValue,
} from 'react-native-redash';
import { useColors } from '@theme';

/**
 * MenuData
 * @interface MenuData
 */
interface MenuData {
  title: string;
  type: 'dark' | 'light' | 'primary' | 'secondary' | 'error';
}

/**
 * @interface MenuProps
 */
export interface MenuProps {
  data: MenuData[];
  onPress?: (val: MenuData, index: number) => void;
}

/**
 * MenuInterface
 */
export interface MenuInterface {
  openMenu: (props: MenuProps) => void;
}

/**
 * Menu Press Events
 */
let onPress: (val: MenuData, index: number) => void = () => {};

/**
 * Constant Values
 */
const ITEM_HEIGHT = Sizes.SIZE_50;
const MAX_LENGTH = 5;

/**
 * getHeight
 * @param length Data Length of the menu
 * @description gets the height of the Menu View
 * `if length > 5 ? 250 : length * 50`
 */
const getHeight = (length: number) =>
  length > MAX_LENGTH ? Sizes.SIZE_250 : length * ITEM_HEIGHT;

/**
 * Menu
 */
const Menu = forwardRef<MenuInterface>(({}, ref) => {
  /**
   * State
   */
  const [{ visible, data }, setState] = createState<{
    visible: boolean;
    data: MenuData[];
  }>({
    visible: false,
    data: [],
  });
  const viewRef = useRef<Animated.View>(null);
  const colors = useColors();
  const { bottom } = useSafeAreaInsets();

  /**
   * Animated Values
   */
  const value = useValue<number>(0);
  const translationY = useValue<number>(0);
  const clock = useClock();

  useEffect(() => {
    if (visible) {
      runTiming(value, {
        toValue: 1,
        duration: 300,
        easing: Easing.linear,
      }).start();
    } else {
    }
  }, [visible]);

  /**
   *
   * @param props Open Menu
   * @description Opens up menu used in ref object in Root
   */
  const openMenu = (props: MenuProps) => {
    onPress = props.onPress ? props.onPress : () => {};
    setState({
      data: props.data,
      visible: true,
    });
  };

  /**
   * Handler to bind open menu to ref object
   */
  useImperativeHandle(
    ref,
    () => ({
      openMenu,
    }),
    [],
  );

  /**
   * Getting the height of the menu
   */
  const { height } = useMemo(
    () => ({
      height: getHeight(data.length) + bottom + Sizes.scaleSize(32),
    }),
    [visible],
  );

  /**
   * Function to clearState of the Menu
   */
  const clearState = () => {
    setState({ visible: false, data: [] });
    onPress = () => {};
  };

  /**
   * Close menu function,
   * @description closes the Menu when called
   */
  const closeMenu = (item?: MenuData, i?: number) => {
    runTiming(value, {
      toValue: 0,
      duration: 400,
      easing: Easing.linear,
    }).start(({ finished }) => {
      if (finished) {
        console.log('item,i:', item, i);
        if (item && i !== undefined) {
          onPress(item, i);
        }
        clearState();
      }
    });
  };

  /**
   * Handling Android back Press
   */

  useEffect(() => {
    let backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      closeMenu();
      return false;
    });
    if (!visible) {
      backHandler.remove();
    }
    return backHandler?.remove();
  }, [visible]);

  /**
   * Handler for PanGestureHandler
   */
  const { gestureHandler, state, translation } = usePanGestureHandler();

  useCode(
    () => [
      cond(
        eq(state, State.ACTIVE),
        [
          cond(greaterThan(translation.y, 0), [
            set(translationY, translation.y),
          ]),
        ],
        [
          cond(eq(state, State.END), [
            cond(greaterThan(translation.y, 0), [
              cond(
                lessThan(translation.y, height / 2),
                [
                  set(
                    translationY,
                    timing({
                      from: translationY,
                      to: 0,
                      duration: 400,
                    }),
                  ),
                ],
                [
                  set(
                    value,
                    timing({
                      from: value,
                      to: 0,
                      clock,
                      duration: 400,
                    }),
                  ),
                  cond(not(clockRunning(clock)), [call([], clearState)]),
                ],
              ),
            ]),
          ]),
        ],
      ),
    ],
    [height],
  );

  /**
   * Animated styles for Parent
   */
  const viewStyle = {
    opacity: value,
  };

  /**
   * Animated styles for Menu View
   */
  const subViewStyle = {
    transform: [
      {
        translateY: interpolate(value, {
          inputRange: [0, 1],
          outputRange: [height, translationY],
        }),
      },
    ],
  };

  return visible ? (
    <View style={[styles.container]}>
      <ReHighlight
        noUnderlay
        onPress={closeMenu}
        style={[styles.subContainer, viewStyle]}
      />
      <PanGestureHandler {...gestureHandler}>
        <Animated.View
          ref={viewRef}
          style={[
            styles.menuContainer,
            {
              height,
              paddingBottom: data!.length <= 7 ? bottom : 0,
              backgroundColor: colors.background,
            },
            subViewStyle,
          ]}>
          <View
            style={[styles.line, { backgroundColor: colors.lightText + 60 }]}
          />
          {data!.length <= 7 ? (
            data?.map((item, index) => (
              <ReHighlight
                onPress={() => {
                  closeMenu(item, index);
                  // onPress(item, index);
                }}
                key={Math.random().toString(36).substring(7)}
                style={styles.item}>
                <Text
                  weight="500"
                  type={item.type}
                  fontSize={Typography.FONT_SIZE_16}>
                  {item.title}
                </Text>
              </ReHighlight>
            ))
          ) : (
            <FlatList
              removeClippedSubviews
              keyExtractor={(_, i) =>
                i.toString() + Math.random().toString(36).substring(7)
              }
              data={data}
              renderItem={({ item, index }) => (
                <ReHighlight
                  onPress={closeMenu?.bind(null, item, index)}
                  style={styles.item}>
                  <Text
                    weight="500"
                    type={item.type}
                    fontSize={Typography.FONT_SIZE_16}>
                    {item.title}
                  </Text>
                </ReHighlight>
              )}
              contentContainerStyle={{ paddingBottom: bottom }}
              showsVerticalScrollIndicator={false}
            />
          )}
        </Animated.View>
      </PanGestureHandler>
    </View>
  ) : (
    <View />
  );
});

export default Menu;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    zIndex: 5,
    justifyContent: 'flex-end',
  },
  subContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  menuContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 3,
    borderTopLeftRadius: Sizes.SIZE_30,
    borderTopRightRadius: Sizes.SIZE_30,
    overflow: 'hidden',
  },
  line: {
    marginVertical: Sizes.SIZE_14,
    alignSelf: 'center',
    width: Sizes.SIZE_40,
    height: Sizes.SIZE_4,
    borderRadius: Sizes.SIZE_2,
  },
  item: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    height: ITEM_HEIGHT,
  },
});
