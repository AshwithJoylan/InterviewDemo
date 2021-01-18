import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import { View, StyleSheet } from 'react-native';
import Text from './Text';
import { createState } from './state';
import { useColors } from '@theme';
import Animated, {
  timing as runTiming,
  spring as runSpring,
  Easing,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Sizes, Typography } from '@metrics';
import { useValue } from 'react-native-redash';

/**
 * ToastProps
 * @export
 * @interface ToastProps
 */
export interface ToastProps {
  /**
   * Tost text
   */
  text: string;
  /**
   * Toast Type
   * @default 'default'
   */
  type?: 'error' | 'success' | 'default';
  /**
   * Duration
   * @default 1000 -> 1s
   */
  duration?: number;
  /**
   * Function  to call when Toast is finished
   * @default ()=>{}
   */
  onDone?: () => void;
}

/**
 * ToastInterface
 */
export interface ToastInterface {
  show: (props: ToastProps) => void;
}

/**
 * Toast State
 */
interface ToastState {
  text: string;
  type?: 'error' | 'success' | 'default';
  visible: boolean;
}

/**
 * Default Values
 */
const DURATION = 1000;

let duration = DURATION;
let onDone: (() => void) | undefined;

/**
 * Toast
 */
const Toast = forwardRef<ToastInterface>(({}, ref) => {
  /**
   * State
   */
  const [{ visible, text, type }, setState] = createState<ToastState>({
    visible: false,
    text: '',
  });

  /**
   * Constant Values
   */
  const colors = useColors();
  const { bottom } = useSafeAreaInsets();

  /**
   * Animated Values
   */
  const value = useValue<number>(0);

  useEffect(() => {
    if (visible) {
      runSpring(value, {
        toValue: 1,
      }).start(({ finished }) => {
        if (finished) {
          setTimeout(() => {
            runTiming(value, {
              toValue: 0,
              duration: 300,
              easing: Easing.linear,
            }).start(({ finished }) => {
              if (finished) {
                clearState();
              }
            });
          }, duration || DURATION);
        }
      });
    }
  }, [visible]);
  /**
   *
   * @param props Open Alert
   * @description Opens up Alert used in ref object in Root
   */
  const show = ({
    onDone: oD,
    type = 'default',
    duration,
    ...rest
  }: ToastProps) => {
    onDone = oD;
    setState({
      ...rest,
      visible: true,
      type,
    });
  };

  /**
   * Handler to bind open menu to ref object
   */
  useImperativeHandle(
    ref,
    () => ({
      show,
    }),
    [],
  );

  /**
   * Function to clearState of the Alert
   */
  const clearState = () => {
    setState({
      visible: false,
      text: '',
      type: undefined,
    });
    onDone = undefined;
    value.setValue(0);
  };

  /**
   * Animated styles for Parent
   */
  const viewStyle = {
    opacity: value,
  };

  // /**
  //  * Animated styles for Alert View
  //  */
  const subViewStyle = {};

  return visible ? (
    <View pointerEvents="none" style={[styles.container]}>
      <Animated.View style={[styles.subContainer, viewStyle]} />
      <Animated.View
        style={[
          styles.toastContainer,
          {
            bottom: Sizes.SIZE_100 + bottom,
            backgroundColor:
              type === 'error'
                ? colors.error
                : type === 'success'
                ? colors.success
                : colors.background,
          },
          subViewStyle,
        ]}>
        <Text
          textAlign="center"
          weight="500"
          margin={{ horizontal: Sizes.SIZE_30 }}
          type={type}
          fontSize={Typography.FONT_SIZE_14}>
          {text}
        </Text>
      </Animated.View>
    </View>
  ) : (
    <View />
  );
});

export default Toast;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    zIndex: 5,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  subContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  toastContainer: {
    position: 'absolute',
    paddingVertical: Sizes.SIZE_10,
    marginHorizontal: Sizes.SIZE_30,
    zIndex: 3,
    borderRadius: Sizes.SIZE_30,
    overflow: 'hidden',
  },
});
