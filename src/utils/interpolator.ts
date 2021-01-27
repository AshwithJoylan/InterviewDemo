import { Sizes } from '@metrics';
import { StackCardStyleInterpolator } from '@react-navigation/stack';
import { Animated } from 'react-native';

export const CardInterpolator: StackCardStyleInterpolator = ({
  current,
  inverted,
  next,
}) => {
  const opacity = Animated.multiply(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
    inverted,
  );

  const translateUnfocused = next
    ? Animated.multiply(
        next.progress.interpolate({
          inputRange: [0, 0.999, 1],
          outputRange: [0, 0, -Sizes.WIDTH],
          extrapolate: 'clamp',
        }),
        inverted,
      )
    : 0;

  const overlayOpacity = current.progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.07],
    extrapolate: 'clamp',
  });

  const shadowOpacity = current.progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.3],
    extrapolate: 'clamp',
  });

  return {
    cardStyle: {
      opacity,
      transform: [
        // Translation for the animation of the card on top of this
        { translateX: translateUnfocused },
      ],
    },
    overlayStyle: { opacity: overlayOpacity },
    shadowStyle: { shadowOpacity },
  };
};
