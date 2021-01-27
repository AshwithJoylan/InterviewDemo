import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import { View, StyleSheet } from 'react-native';
import Text from './Text';
import { createState } from './state';
import {
  PanGestureHandler,
  State,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import Animated, {
  call,
  cond,
  Easing,
  eq,
  greaterThan,
  interpolate,
  set,
  useCode,
  timing as runTiming,
} from 'react-native-reanimated';
import {
  snapPoint,
  timing,
  usePanGestureHandler,
  useValue,
} from 'react-native-redash';
import { Sizes, Typography } from '@metrics';
import { useColors } from '@theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AlertButton } from './Buttons';

/**
 * @interface AlertProps
 */
export interface AlertProps {
  /**
   * Alert Title
   * @type {string}
   * @memberof AlertProps
   */
  title: string;
  /**
   * Alert Description
   * @type {string}
   * @memberof AlertProps
   */
  description?: string;
  /**
   * Cancel Text
   * @type {string}
   * @memberof AlertProps
   * @default Cancel
   */
  cancelText?: string;
  /**
   * Confirm Text
   * @type {string}
   * @memberof AlertProps
   * @default Confirm
   */
  confirmText?: string;
  /**
   * Function to Call on Cancel button Pressed
   * @memberof AlertProps
   * @default ()=>{}
   */
  onCancel?: () => void;
  /**
   * Function to Call on Confirm button Pressed
   * @memberof AlertProps
   * @default ()=>{}
   */
  onConfirm?: () => void;
}

/**
 * AlertInterface
 */
export interface AlertInterface {
  show: (props: AlertProps) => void;
}

/**
 * AlertState
 */
interface AlertState {
  visible: boolean;
  title: string;
  description?: string;
  cancelText: string;
  confirmText: string;
  height: number;
}

/**
 * Default Values
 */
const cText = 'Cancel';
const coText = 'Confirm';
const onPress = () => {};

/**
 * Alert OnPress Events
 */
let onPressConfirm = onPress,
  onPressCancel = onPress;
/**
 * Alert
 */
const Alert = forwardRef<AlertInterface>(({}, ref) => {
  /**
   * State
   */
  const [
    { visible, title, description, cancelText, confirmText, height },
    setState,
  ] = createState<AlertState>({
    visible: false,
    title: '',
    cancelText: cText,
    confirmText: coText,
    height: 0,
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
  const translationY = useValue<number>(0);

  useEffect(() => {
    if (visible) {
      runTiming(value, {
        toValue: 1,
        duration: 300,
        easing: Easing.linear,
      }).start();
    }
  }, [visible]);

  /**
   *
   * @param props Open Alert
   * @description Opens up Alert used in ref object in Root
   */
  const show = ({ onCancel, onConfirm, ...rest }: AlertProps) => {
    onPressConfirm = onConfirm || onPress;
    onPressCancel = onCancel || onPress;
    setState({
      ...rest,
      visible: true,
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
    translationY.setValue(0);
    setState({
      height: 0,
      visible: false,
      title: '',
      description: undefined,
      cancelText: cText,
      confirmText: coText,
    });
    onPressCancel = onPress;
    onPressConfirm = onPress;
  };

  /**
   * Close alert function,
   * @description closes the Alert when called
   */
  const closeAlert = () => {
    runTiming(value, {
      toValue: 0,
      duration: 400,
      easing: Easing.linear,
    }).start(({ finished }) => {
      if (finished) {
        clearState();
      }
    });
  };

  /**
   * Handler for PanGestureHandler
   */
  const {
    gestureHandler,
    state,
    velocity,
    translation,
  } = usePanGestureHandler();

  const to = snapPoint(translation.y, velocity.y, [height, 0]);

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
                eq(to, 0),
                [
                  set(
                    translationY,
                    timing({
                      to,
                      duration: 400,
                    }),
                  ),
                ],
                [call([], () => closeAlert())],
              ),
            ]),
          ]),
        ],
      ),
    ],
    [],
  );

  /**
   * Animated styles for Parent
   */
  const viewStyle = {
    opacity: value,
  };

  /**
   * Animated styles for Alert View
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
      <TouchableWithoutFeedback onPress={closeAlert}>
        <Animated.View style={[styles.subContainer, viewStyle]} />
      </TouchableWithoutFeedback>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View
          onLayout={({
            nativeEvent: {
              layout: { height: h },
            },
          }) => {
            if (height === 0) {
              setState({
                height: h,
              });
            }
          }}
          style={[
            styles.alertContainer,
            {
              paddingBottom: bottom + Sizes.SIZE_10,
              backgroundColor: colors.background,
            },
            subViewStyle,
          ]}>
          <View
            style={[styles.line, { backgroundColor: colors.lightText + 60 }]}
          />
          <Text
            margin={{
              horizontal: Sizes.SIZE_30,
              bottom: description ? Sizes.SIZE_10 : Sizes.SIZE_30,
            }}
            weight="500"
            type="dark"
            fontSize={Typography.FONT_SIZE_16}>
            {title}
          </Text>
          {description && (
            <Text
              textAlign="center"
              margin={{
                horizontal: Sizes.SIZE_30,
                bottom: Sizes.SIZE_30,
              }}
              weight="500"
              type="light"
              fontSize={Typography.FONT_SIZE_14}>
              {description}
            </Text>
          )}
          <View style={styles.buttons}>
            <AlertButton
              onPress={() => {
                closeAlert();
                onPressCancel();
              }}
              type="light">
              {cancelText}
            </AlertButton>
            <View style={styles.separator} />
            <AlertButton
              onPress={() => {
                closeAlert();
                onPressConfirm();
              }}
              type="primary">
              {confirmText}
            </AlertButton>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  ) : (
    <View />
  );
});

export default Alert;

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
  alertContainer: {
    position: 'absolute',
    alignItems: 'center',
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
  buttons: {
    paddingHorizontal: Sizes.SIZE_30,
    alignSelf: 'stretch',
    flexDirection: 'row',
    height: Sizes.SIZE_45,
  },
  separator: {
    width: Sizes.SIZE_10,
  },
});
