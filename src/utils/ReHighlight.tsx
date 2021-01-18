import React, { ReactNode, useState } from 'react';
import {
  ViewStyle,
  StyleSheet,
  StyleProp,
  LayoutChangeEvent,
} from 'react-native';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import Animated, { Easing, timing, useValue } from 'react-native-reanimated';
import { useColors } from '@theme';
import { useTransition } from 'react-native-redash';

/**
 * Inset
 */
export interface Inset {
  top?: number | string;
  bottom?: number | string;
  left?: number | string;
  right?: number | string;
  horizontal?: number | string;
  vertical?: number | string;
}

export interface Props {
  /**
   * Style for Container
   * @type {StyleProp<Animated.AnimateStyle<ViewStyle>>}
   * @memberof Props
   */
  style?: StyleProp<Animated.AnimateStyle<ViewStyle>>;
  /**
   * Function To Call When Button is Pressed
   * @memberof Props
   */
  onPress?: () => void;
  /**
   * Children
   * @type {ReactNode}
   * @memberof Props
   */
  children?: ReactNode;
  /**
   * Defines Weather Button is Disabled
   * @type {boolean}
   * @memberof Props
   * @default false
   */
  disabled?: boolean;
  /**
   * Function to Call When Button is Pressed In
   * @memberof Props
   */
  onPressIn?: () => void;
  /**
   * Function to Call When Button is Pressed Out
   * @memberof Props
   */
  onPressOut?: () => void;
  /**
   * Test ID
   * @type {string}
   * @memberof Props
   */
  testID?: string;

  margin?: Inset;
  padding?: Inset;

  onLayout?:
    | ((event: LayoutChangeEvent) => void)
    | Animated.Node<((event: LayoutChangeEvent) => void) | undefined>;
  viewRef?:
    | string
    | ((instance: Animated.View | null) => void)
    | React.RefObject<Animated.View>
    | null;
  noUnderlay?: boolean;
}

/**
 * Re Highlight
 */
export default ({
  onPress = () => {},
  onPressIn = () => {},
  onPressOut = () => {},
  style,
  children,
  testID,
  noUnderlay,
  padding,
  margin,
  viewRef,
  onLayout,
  disabled = false,
}: Props) => {
  const colors = useColors();
  const opacity = useValue(0);

  const animateIn = () => {
    timing(opacity, {
      toValue: 1,
      duration: 50,
      easing: Easing.linear,
    }).start();
  };

  const animateOut = () => {
    timing(opacity, {
      toValue: 0,
      duration: 400,
      easing: Easing.linear,
    }).start();
  };

  const viewStyle = {
    backgroundColor: noUnderlay ? 'transparent' : colors.underlay,
    opacity,
  };

  return (
    <TapGestureHandler
      shouldCancelWhenOutside
      enabled={!disabled}
      onHandlerStateChange={({ nativeEvent: { state } }) => {
        if (state === State.BEGAN) {
          animateIn();
          onPressIn();
        } else if (state === State.END) {
          animateOut();
          onPress();
        } else if (state === State.CANCELLED || state === State.FAILED) {
          animateOut();
          onPressOut();
        }
      }}>
      <Animated.View
        ref={viewRef}
        pointerEvents={!disabled ? undefined : 'none'}
        {...{ testID, onLayout }}
        style={[
          style,
          { overflow: 'hidden' },
          margin && {
            marginHorizontal: margin.horizontal,
            marginVertical: margin.vertical,
            marginLeft: margin.left,
            marginRight: margin.right,
            marginTop: margin.top,
            marginBottom: margin.bottom,
          },
          padding && {
            paddingHorizontal: padding.horizontal,
            paddingVertical: padding.vertical,
            paddingLeft: padding.left,
            paddingRight: padding.right,
            paddingTop: padding.top,
            paddingBottom: padding.bottom,
          },
        ]}>
        {children}
        <Animated.View
          pointerEvents="none"
          style={[styles.overlay, viewStyle]}
        />
      </Animated.View>
    </TapGestureHandler>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
