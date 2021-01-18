import { Sizes, Typography } from '@metrics';
import { useColors } from '@theme';
import React, { FC } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import ReHighlight, { Inset } from './ReHighlight';
import Text, { TextType } from './Text';
import Icon, { IconType } from './Icon';
interface ButtonProps {
  type: 'primary' | 'light';
  onPress?: () => void;
  margin?: Inset;
  style?: StyleProp<ViewStyle>;
}

export const Button: FC<ButtonProps> = ({
  children,
  type,
  onPress,
  margin,
  style,
}) => {
  const colors = useColors();
  const backgroundColor =
    type === 'primary' ? colors.primary : colors.lightBackground;
  const textType = type === 'primary' ? 'white' : 'dark';
  return (
    <ReHighlight
      style={[styles.button, style, { backgroundColor }]}
      {...{ type, margin, onPress }}>
      <Text weight="600" type={textType} fontSize={Typography.FONT_SIZE_16}>
        {children}
      </Text>
    </ReHighlight>
  );
};

/**
 * IconButtonProps
 */
export interface IconButtonProps {
  name: string;
  onPress?: () => void;
  type: IconType;
  style?: StyleProp<ViewStyle>;
  color?: string;
  size?: number;
}

export const IconButton: FC<IconButtonProps> = ({
  style,
  onPress,
  ...rest
}) => (
  <ReHighlight {...{ style, onPress }}>
    <Icon {...rest} />
  </ReHighlight>
);
interface TextButtonProps {
  onPress?: () => void;
  type?: 'dark' | 'light' | 'primary' | 'secondary';
  textDecorationLine?:
    | 'none'
    | 'underline'
    | 'line-through'
    | 'underline line-through'
    | Animated.Node<
        | number
        | 'none'
        | 'underline'
        | 'line-through'
        | 'underline line-through'
        | undefined
      >;
  margin?: Inset;
  fontSize?: number | Animated.Node<number | undefined>;
}

export const TextButton: FC<TextButtonProps> = ({
  onPress,
  type,
  children,
  textDecorationLine,
  margin,
  fontSize,
}) => {
  return (
    <ReHighlight
      {...{ onPress }}
      {...{ margin }}
      style={styles.textButton}
      padding={{ horizontal: Sizes.SIZE_10, vertical: Sizes.SIZE_6 }}>
      <Text
        style={{
          textDecorationLine,
        }}
        {...{ fontSize, type }}>
        {children}
      </Text>
    </ReHighlight>
  );
};

/**
 * AlertButtonProps
 */
export interface AlertButtonProps {
  onPress?: () => void;
  type?: 'dark' | 'light' | 'primary' | 'secondary';

  margin?: Inset;
}

export const AlertButton: FC<AlertButtonProps> = ({
  onPress,
  type,
  children,
  margin,
}) => {
  const colors = useColors();
  return (
    <ReHighlight
      {...{ margin, onPress }}
      style={[
        styles.alertButton,
        {
          backgroundColor:
            type === 'dark'
              ? colors.background
              : type === 'light'
              ? colors.lightBackground
              : type === 'primary'
              ? colors.primary
              : colors.secondary,
        },
      ]}
      padding={{ horizontal: Sizes.SIZE_10, vertical: Sizes.SIZE_6 }}>
      <Text
        weight="500"
        fontSize={Typography.FONT_SIZE_14}
        type={
          (type === 'dark'
            ? colors.darkText
            : type === 'light'
            ? colors.lightText
            : 'white') as TextType
        }>
        {children}
      </Text>
    </ReHighlight>
  );
};

export const LikeButton = ({ onPress }: { onPress: () => void }) => {
  const colors = useColors();
  return (
    <ReHighlight {...{ onPress }} style={styles.iconButton}>
      <Icon
        color={colors.lightText}
        name="thumbs-up"
        type="Feather"
        size={Typography.FONT_SIZE_18}
      />
      <Text
        margin={{ left: Sizes.SIZE_6 }}
        fontSize={Typography.FONT_SIZE_14}
        type="light">
        35
      </Text>
    </ReHighlight>
  );
};

export const CommentButton = ({ onPress }: { onPress: () => void }) => {
  const colors = useColors();
  return (
    <ReHighlight {...{ onPress }} style={styles.iconButton}>
      <Icon
        color={colors.lightText}
        name="ios-chatbubble-outline"
        type="Ion"
        size={Typography.FONT_SIZE_18}
      />
      <Text
        margin={{ left: Sizes.SIZE_6 }}
        fontSize={Typography.FONT_SIZE_14}
        type="light">
        34
      </Text>
    </ReHighlight>
  );
};

export const ShareButton = ({ onPress }: { onPress: () => void }) => {
  const colors = useColors();
  return (
    <ReHighlight {...{ onPress }} style={styles.iconButton}>
      <Icon
        color={colors.lightText}
        name="ios-share-outline"
        type="Ion"
        size={Typography.FONT_SIZE_18}
      />
      <Text
        margin={{ left: Sizes.SIZE_6 }}
        fontSize={Typography.FONT_SIZE_14}
        type="light">
        2
      </Text>
    </ReHighlight>
  );
};

export const MoreButton = ({ onPress }: { onPress: () => void }) => {
  const colors = useColors();
  return (
    <ReHighlight {...{ onPress }} style={styles.iconButton}>
      <Icon
        color={colors.lightText}
        name="more-horizontal"
        type="Feather"
        size={Typography.FONT_SIZE_18}
      />
    </ReHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '60%',
    height: Sizes.SIZE_50,
    borderRadius: Sizes.SIZE_20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    borderRadius: Sizes.SIZE_6,
  },
  alertButton: {
    flex: 1,
    borderRadius: Sizes.SIZE_20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButton: {
    height: '100%',
    paddingHorizontal: Sizes.SIZE_15,
    borderRadius: Sizes.SIZE_10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
