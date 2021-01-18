import { Sizes } from '@metrics';
import { StackCardStyleInterpolator } from '@react-navigation/stack';

export const CardInterpolator: StackCardStyleInterpolator = ({
  current: { progress },
}) => {
  const translateY = progress.interpolate({
    inputRange: [-1, -0.5, 0, 0.5, 1],
    outputRange: [
      -Sizes.WIDTH,
      -Sizes.WIDTH / 0.2,
      0,
      Sizes.WIDTH / 0.2,
      Sizes.WIDTH,
    ],
  });
  return {
    cardStyle: {
      transform: [
        {
          translateY,
        },
      ],
    },
  };
};
