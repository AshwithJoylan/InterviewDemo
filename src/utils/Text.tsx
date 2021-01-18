import React from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';
import { Typography } from '../metrics';
import Animated from 'react-native-reanimated';
import { useColors } from '@theme';

/**
 * TextType
 */
export type TextType =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'dark'
  | 'light'
  | 'white'
  | 'success'
  | 'default';
/**
 * @interface TextProps
 */
export interface TextProps {
  isTitle?: boolean;
  children?: React.ReactNode;
  /**
   * Text Style
   * @type {StyleProp<TextStyle>}
   * @memberof TextProps
   */
  style?: StyleProp<Animated.AnimateStyle<TextStyle>>;
  /**
   * Test ID
   * @type {string}
   * @memberof TextProps
   */
  testID?: string;
  type?: TextType;
  /**
   * Number Of Lines
   * @type {string}
   * @memberof TextProps
   */
  numberOfLines?: number;
  /**
   * Italic
   * @type {boolean}
   * @memberof TextProps
   */
  italic?: boolean;

  adjustsFontSizeToFit?: boolean | Animated.Node<boolean | undefined>;
}

export type FontWeight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

/**
 *
 * @param val string
 * @param length number default 50
 * @returns Reduced Text
 *
 * ### Example
 * ```
 * reduceText('123456', 3) -> gives '123...'
 * ```
 */
export const reduceText = (val: string, length?: number) => {
  if (val.length > (length || 50)) {
    return val.substr(0, (length || 50) - 3) + '...';
  }
  return val;
};

/**
 * Inset
 */
interface Inset {
  top?: number | string;
  bottom?: number | string;
  left?: number | string;
  right?: number | string;
  horizontal?: number | string;
  vertical?: number | string;
}

export interface CustomTextProps extends TextProps {
  weight?: FontWeight;

  fontSize?: number | Animated.Node<number | undefined>;
  onPress?: () => void;
  margin?: Inset;
  padding?: Inset;
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';

  letterSpacing?: number | Animated.Node<number>;
  textAlign?: 'left' | 'right' | 'center' | 'auto' | 'justify';

  textAlignVertical?: 'bottom' | 'top' | 'center' | 'auto';
}

export const getFont = (isTitle: boolean, weight: any, italic: boolean) => {
  if (isTitle) {
    if (italic) {
      switch (weight) {
        case '500':
        case '600':
          return {
            fontFamily: 'ProzaLibre-SemiBoldItalic',
          };
        case '100':
        case '200':
        case '300':
          return {
            fontFamily: 'ProzaLibre-Italic',
          };
        case '400':
          return {
            fontFamily: 'ProzaLibre-MediumItalic',
          };
        case 'normal':
          return {
            fontFamily: 'ProzaLibre-Italic',
          };
        case '700':
        case 'bold':
          return {
            fontFamily: 'ProzaLibre-BoldItalic',
          };
        case '800':
        case '900':
          return {
            fontFamily: 'ProzaLibre-ExtraBoldItalic',
          };
        case 'normal':
        default:
          return {
            fontFamily: 'ProzaLibre-RegularItalic',
          };
      }
    } else {
      switch (weight) {
        case '500':
        case '600':
          return {
            fontFamily: 'ProzaLibre-SemiBold',
          };
        case '100':
        case '200':
        case '300':
          return {
            fontFamily: 'ProzaLibre-Regular',
          };
        case '800':
        case '900':
          return {
            fontFamily: 'ProzaLibre-ExtraBold',
          };
        case '700':
        case 'bold':
          return {
            fontFamily: 'ProzaLibre-Bold',
          };
        case '400':
          return {
            fontFamily: 'ProzaLibre-Medium',
          };
        case 'normal':
        default:
          return {
            fontFamily: 'ProzaLibre-Regular',
          };
      }
    }
  } else {
    if (italic) {
      switch (weight) {
        case '100':
        case '200':
          return {
            fontFamily: 'OpenSans-LightItalic',
          };

        case '300':
        case '400':
        case 'normal':
          return {
            fontFamily: 'OpenSans-Italic',
          };
        case '500':
        case '600':
        case '700':
        case 'bold':
          return {
            fontFamily: 'OpenSans-BoldItalic',
          };
        case '800':
        case '900':
          return {
            fontFamily: 'OpenSans-ExtraBoldItalic',
          };
        case 'normal':
        default:
          return {
            fontFamily: 'OpenSans-RegularItalic',
          };
      }
    } else {
      switch (weight) {
        case '200':
        case '100':
          return {
            fontFamily: 'OpenSans-Light',
          };

        case '300':
        case '400':
        case 'normal':
          return {
            fontFamily: 'OpenSans-Regular',
          };
        case '500':
        case '600':
        case '700':
        case 'bold':
          return {
            fontFamily: 'OpenSans-Bold',
          };
        case '800':
        case '900':
          return {
            fontFamily: 'OpenSans-ExtraBold',
          };
        case 'normal':
        default:
          return {
            fontFamily: 'OpenSans-Regular',
          };
      }
    }
  }
};

export const toLocaleString = (val: number | string) => {
  const number = Number(val);
  return number
    .toFixed(2)
    .replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,')
    .split('.')[0];
};

/**
 * Text
 */
export default ({
  children,
  style,
  testID,
  numberOfLines,
  onPress,
  textTransform,
  fontSize = Typography.FONT_SIZE_14,
  italic = false,
  type = 'primary',
  weight = 'normal',
  margin,
  isTitle = false,
  padding,
  textAlign,
  adjustsFontSizeToFit,
  letterSpacing = 0.56,
  textAlignVertical,
}: CustomTextProps) => {
  const colors = useColors();
  const color =
    type === 'primary'
      ? colors.primary
      : type === 'secondary'
      ? colors.secondary
      : type === 'light'
      ? colors.lightText
      : type === 'error'
      ? colors.errorText
      : type === 'success'
      ? colors.successText
      : type === 'white'
      ? '#fff'
      : colors.darkText;
  return (
    <Animated.Text
      {...{ testID, numberOfLines, onPress, adjustsFontSizeToFit }}
      style={[
        {
          textTransform,
          color,
          fontWeight: weight,
          fontSize,
          letterSpacing,
          textAlign,
          textAlignVertical,
        },
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
        style,
        {
          // ...getFont(isTitle, weight, italic),
        },
      ]}>
      {children}
    </Animated.Text>
  );
};
