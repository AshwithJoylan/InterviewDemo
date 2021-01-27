import React, { FC, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ViewToken,
} from 'react-native';
import { Text } from '@utils';
import { FlatList } from 'react-native-gesture-handler';
import FastImage, { ResizeMode } from 'react-native-fast-image';
import { Sizes } from '@metrics';
import Indicator from './Indicator';
import { Colors } from '@theme';

/**
 * @interface SimpleImageSliderProps
 */
interface SimpleImageSliderProps {
  style: StyleProp<ViewStyle>;
  images: string[];
  width?: number;
  resizeMode?: ResizeMode;
  bounces?: boolean;
  colors: Colors;
}

/**
 * SimpleImageSlider
 */
const SimpleImageSlider: React.FC<SimpleImageSliderProps> = ({
  style = styles.defaultStyle,
  images,
  resizeMode,
  width = Sizes.WIDTH,
  bounces = false,
  colors,
}) => {
  const [index, setIndex] = useState(0);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        let currentIndex = viewableItems[0].index!;
        setIndex(currentIndex);
      }
    },
  );

  return (
    <View {...{ style }}>
      <FlatList
        horizontal
        windowSize={1}
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        removeClippedSubviews
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        pagingEnabled
        decelerationRate="fast"
        snapToInterval={width}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged.current}
        {...{ bounces }}
        data={images}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <FastImage
            source={{ uri: item }}
            {...{ resizeMode }}
            style={{ width, ...styles.imageContainer }}
          />
        )}
      />

      <Indicator
        itemCount={images.length}
        indicatorContainerStyle={{
          position: 'absolute',
          bottom: Sizes.SIZE_20,
        }}
        indicatorActiveWidth={Sizes.SIZE_30}
        indicatorActiveColor={colors.secondary}
        indicatorInActiveColor={colors.lightText}
        currentIndex={index}
      />
    </View>
  );
};

export default SimpleImageSlider;

const styles = StyleSheet.create({
  defaultStyle: {
    height: Sizes.SIZE_160,
  },
  imageContainer: {
    alignSelf: 'stretch',
    height: '100%',
  },
});
