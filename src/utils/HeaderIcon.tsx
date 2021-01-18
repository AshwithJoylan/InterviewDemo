import React from 'react';
import Icon, { IconType } from './Icon';
import Text from './Text';
import ReHighlight from './ReHighlight';
import { Sizes } from '@metrics';
import { Platform, PlatformIOSStatic, View } from 'react-native';
import { useColors } from '@theme';

const IS_PAD = Platform.OS === 'ios' && (Platform as PlatformIOSStatic).isPad;

export interface HeaderIconProps {
  onPress?: () => void;
  name?: string;
  type?: IconType;
  size?: number;
  color?: any;
  testID?: string;
  badge?: number;
}

/**
 * Header Icon
 */
export default ({
  name = 'ios-chevron-back',
  onPress,
  color: c,
  size = Sizes.SIZE_24,
  type = 'Ion',
  testID,
  badge,
}: HeaderIconProps) => {
  const colors = useColors();
  const color = c || colors.darkText;
  return (
    <ReHighlight
      {...{ onPress, testID }}
      style={{
        borderRadius: IS_PAD ? 32 : 20,
        width: IS_PAD ? 64 : 40,
        alignItems: 'center',
        justifyContent: 'center',
        height: IS_PAD ? 64 : 40,
        paddingRight: name === 'ios-chevron-back' ? Sizes.SIZE_2 : 0,
        alignSelf: 'flex-start',
      }}>
      <Icon {...{ name, type, size, color }} />
      {badge && (
        <View
          style={{
            position: 'absolute',
            top: Sizes.SIZE_6,
            right: Sizes.SIZE_6,
            width: Sizes.SIZE_12,
            height: Sizes.SIZE_12,
            borderRadius: Sizes.SIZE_20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text weight="bold" type="primary" style={{ fontSize: Sizes.SIZE_6 }}>
            {badge}
          </Text>
        </View>
      )}
    </ReHighlight>
  );
};
