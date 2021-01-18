import React, { FC, useMemo } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { useColors } from '@theme';

interface Inset {
  top?: number | string;
  bottom?: number | string;
  left?: number | string;
  right?: number | string;
  horizontal?: number | string;
  vertical?: number | string;
}

export interface ContainerProps {
  type?: 'dark' | 'light';
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  padding?: Inset;
  margin?: Inset;
}

const Container: FC<ContainerProps> = ({
  style,
  padding,
  margin,
  type = 'dark',
  children,
}: ContainerProps) => {
  const colors = useColors();
  const { backgroundColor } = useMemo(
    () => ({
      backgroundColor:
        type === 'dark' ? colors.background : colors.lightBackground,
    }),
    [colors, type],
  );

  return (
    <View
      style={[
        style,
        { backgroundColor },
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
    </View>
  );
};

export default Container;
