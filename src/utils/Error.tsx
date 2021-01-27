import Images from '@images';
import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch } from 'react-redux';
import ReHighlight from './ReHighlight';
import Icon from './icon';
import Text from './text';
import { Sizes, Typography } from '@metrics';
import { useColors } from '@theme';

// Props
interface ErrorProps {
  onClick?: () => void;
  getBanners?: number;
  error?: string;
  style?: StyleProp<ViewStyle>;
  status?: number;
  hideButton?: boolean;
  buttonText?: string;
}

// Error Component
export default ({
  onClick = () => {},
  error = 'Something Went Wrong!',
  style = styles.container,
  status,
  hideButton = false,
  buttonText,
}: ErrorProps) => {
  const dispatch = useDispatch();
  const colors = useColors();
  return (
    <View {...{ style }}>
      <FastImage
        resizeMode="stretch"
        style={styles.emptyIcon}
        source={
          status === 401
            ? Images.ERROR_401
            : status === 404
            ? Images.ERROR_404
            : status === 500
            ? Images.ERROR_500
            : Images.ERROR_408
        }
      />

      {status && (
        <Text weight="bold" fontSize={Typography.FONT_SIZE_18} type="dark">
          {status === 401
            ? 'Your session has expired'
            : status === 500
            ? 'Server error'
            : status === 404
            ? 'Page not found'
            : status === 408
            ? 'Error! Timeout'
            : status === 600
            ? 'Permission Error'
            : 'Error'}
        </Text>
      )}
      <Text weight="500" type="light" style={styles.noText}>
        {status === 401
          ? 'Please login to access the app'
          : status === 500
          ? 'Our team is working on it, please come back later'
          : status === 404
          ? ' We couldn’t find the page you requested'
          : status === 408
          ? 'It usually doesn’t take this long, try checking your connection or come back later, we are not going anywhere'
          : status === 600
          ? error
          : ''}
      </Text>
      {!hideButton && (
        <ReHighlight
          onPress={
            status === 401
              ? () => {
                  onClick();
                  dispatch({ type: 'LOGOUT' });
                }
              : onClick
          }
          style={[styles.button, { backgroundColor: colors.lightBackground }]}>
          <Text weight="500" type="dark" style={styles.tryAgain}>
            {buttonText || 'Try Again'}
          </Text>
        </ReHighlight>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Sizes.SIZE_20,
  },
  noText: {
    fontSize: Typography.FONT_SIZE_18,
    marginTop: Sizes.SIZE_10,
    textAlign: 'center',
  },
  emptyIcon: {
    width: Sizes.SIZE_200,
    height: Sizes.SIZE_200,
  },
  button: {
    paddingHorizontal: Sizes.SIZE_30,
    height: Sizes.SIZE_40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Sizes.SIZE_30,
    borderRadius: Sizes.SIZE_6,
  },
  tryAgain: {
    fontSize: Typography.FONT_SIZE_14,
  },
});
