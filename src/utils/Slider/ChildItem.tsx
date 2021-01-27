import { Sizes } from '@metrics';
import { ReHighlight } from '@utils';
import React from 'react';
import { StyleSheet, StyleProp, ImageStyle } from 'react-native';
import FastImage from 'react-native-fast-image';

/**
 * ChildItemProps
 */
export interface ChildItemProps {
  item: any;
  style?: StyleProp<ImageStyle>;
  onPress?: (index: number) => void;
  index: number;
  local: boolean;
  height: number;
}

/**
 * Child Item
 */
export default ({
  item,
  style,
  onPress,
  index,
  local,
  height,
}: ChildItemProps) => {
  return (
    <ReHighlight
      style={[styles.container, style, { height: height }]}
      onPress={() => onPress?.(index)}>
      <FastImage
        style={[styles.image, { height: '100%' }]}
        source={local ? item : { uri: item }}
      />
    </ReHighlight>
  );
};

const styles = StyleSheet.create({
  container: {},
  image: {
    height: Sizes.SIZE_160,
    resizeMode: 'stretch',
  },
});
