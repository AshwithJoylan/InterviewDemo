import React from 'react';
import { View } from 'react-native';
import { Sizes } from '@metrics';
import { useColors } from '@theme';

/**
 * @interface SwitchProps
 */
interface SwitchProps {
  isOn: boolean;
  size?: number;
}

/**
 * Switch
 */
export default ({ isOn = false, size = Sizes.SIZE_25 }: SwitchProps) => {
  const colors = useColors();
  return (
    <View
      style={{
        width: size + Sizes.SIZE_20,
        height: size,
        borderRadius: size,
        borderWidth: Sizes.SIZE_2,
        borderColor: isOn ? colors.secondary : colors.background,
        backgroundColor: isOn ? colors.secondary : colors.background,
        justifyContent: 'center',
        padding: Sizes.SIZE_1,
        alignItems: isOn ? 'flex-end' : 'flex-start',
      }}>
      <View
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          backgroundColor: '#fff',
          height: '100%',
          aspectRatio: 1 / 1,
          borderRadius: (size - Sizes.SIZE_4) / 2,
        }}
      />
    </View>
  );
};
