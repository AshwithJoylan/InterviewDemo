import React from 'react';
import {
  View,
  StyleSheet,
  Platform,
  StatusBar,
  Dimensions,
  PlatformIOSStatic,
} from 'react-native';
import Text from './Text';
import { Sizes, Typography } from '@metrics';
import { useRoute } from '@react-navigation/native';
import HeaderIcon from './HeaderIcon';
import { NavigationService } from '@services';
import { useColors } from '@theme';
import { useColorScheme } from 'react-native-appearance';

export const OS = Platform.OS;
export const IS_PAD = OS === 'ios' && (Platform as PlatformIOSStatic).isPad;
const { height } = Dimensions.get('window');
export const TOP =
  OS === 'android'
    ? StatusBar.currentHeight || 0
    : IS_PAD
    ? 20
    : height >= 812
    ? 44
    : 20;
export const CENTERED = OS === 'ios' ? true : false;
export const HEADER_HEIGHT =
  (OS === 'android' ? 50 : IS_PAD ? 64 : 40) +
  TOP +
  (Platform.OS === 'ios' ? Sizes.SIZE_10 : 0);

interface HeaderProps {
  /**
   * @description Header Title
   * @default TITLE Navigation State title
   * @type {string}
   * @memberof HeaderProps
   */
  title?: string;
  /**
   * @description Weather header is centered?
   * @type {boolean}
   * @memberof HeaderProps
   */
  centered?: boolean;
  hideLeft?: boolean;
  /**
   * @default null
   * @description Header left component
   * @type {React.ReactNode}
   * @memberof HeaderProps
   */
  renderLeft?: (data: { color: string }) => React.ReactNode;
  /**
   * @default null
   * @description Header right component
   * @type {React.ReactNode}
   * @memberof HeaderProps
   */
  renderRight?: (data: { color: string }) => React.ReactElement;

  /**
   * ID Used to identify this view in End to End Testing
   * @type {string}
   * @memberof HeaderProps
   */
  testID?: string;
  hideStatusBar?: boolean;
  hideTop?: boolean;
  hideTitle?: boolean;
  type?: 'dark' | 'light';
}

/**
 * Header
 */
export default ({
  renderLeft,
  testID,
  hideStatusBar = false,
  centered = true,
  renderRight,
  hideTitle,
  hideLeft = false,
  title,
  hideTop = false,
  type = 'dark',
}: HeaderProps) => {
  const routeTitle = useRoute()
    .name.replace(/([A-Z])/g, ' $1')
    .trim();
  const colors = useColors();
  const theme = useColorScheme();
  /**
   * Dak Mode Interpolations
   */
  const backgroundColor =
    type === 'dark' ? colors.background : colors.lightBackground;
  const iconColor = colors.darkText;
  const barStyle = theme === 'dark' ? 'light-content' : 'dark-content';

  return (
    <View style={{ zIndex: 5 }}>
      {!hideStatusBar && (
        <StatusBar
          {...{ barStyle }}
          backgroundColor="rgba(0, 0, 0, 0.05)"
          translucent
        />
      )}
      <View
        {...{ testID }}
        style={[
          styles.container,
          hideTop && { paddingTop: 0, height: HEADER_HEIGHT - TOP },
          {
            backgroundColor,
          },
        ]}>
        <View style={styles.headerButton}>
          {renderLeft
            ? renderLeft({ color: iconColor })
            : NavigationService.canGoBack() &&
              !hideLeft && (
                <HeaderIcon
                  name="ios-chevron-back"
                  color={iconColor}
                  onPress={NavigationService.goBack}
                />
              )}
        </View>

        <View style={styles.titleContainer}>
          {!hideTitle && (
            <Text
              weight="400"
              fontSize={Typography.FONT_SIZE_18}
              type="dark"
              style={[centered && styles.centerTitle]}>
              {title || routeTitle}
            </Text>
          )}
        </View>
        {renderRight && (
          <View style={styles.headerButton}>
            {renderRight({ color: iconColor })}
          </View>
        )}
        {!renderRight && <View style={styles.headerButton} />}
      </View>
    </View>
  );
};

const radius = OS === 'android' ? 25 : IS_PAD ? 26 : 25;
export const styles = StyleSheet.create({
  container: {
    height: HEADER_HEIGHT,
    borderBottomLeftRadius: radius,
    borderBottomRightRadius: radius,
    overflow: 'hidden',
    alignItems: 'center',
    paddingHorizontal: Sizes.SIZE_10,
    alignSelf: 'stretch',
    overlayColor: 'hidden',
    flexDirection: 'row',
    paddingTop: TOP,
    paddingBottom: Platform.OS === 'ios' ? Sizes.SIZE_10 : 0,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  centerTitle: {
    alignSelf: 'center',
  },
  headerButton: {
    width: OS === 'android' ? 50 : IS_PAD ? 64 : 40,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  border: {
    left: 0,
    top: HEADER_HEIGHT,
    right: 0,
    position: 'absolute',
    alignSelf: 'stretch',
    height: 3,
  },
});
