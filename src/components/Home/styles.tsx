import { Sizes } from '@metrics';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    width: '50%',
    aspectRatio: 1 / 1,
  },
  listImage: {
    flex: 1,
  },
  offersContainer: {
    alignSelf: 'stretch',
    height: Sizes.SIZE_240,
  },
});
