import React, { FC } from 'react';
import { ListRenderItem } from 'react-native';
import {
  Text,
  Container as Parent,
  Loader,
  ReHighlight,
  Slider,
  Header as Head,
} from '@utils';
import styles from './styles';
import { FlatList } from 'react-native-gesture-handler';
import { HomeHeaderProps, HomeListProps } from '@types';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { Sizes } from '@metrics';

/**
 * Container
 * @returns Element
 */
export const Container: FC = ({ children }) => (
  <Parent type="dark" style={styles.container}>
    {children}
  </Parent>
);

/**
 * Header
 */
export const Header = () => <Head title="Home" />;

/**
 * Home List
 * @returns Element
 */
export const List: FC<HomeListProps> = ({ ListHeaderComponent, getData }) => {
  const { isLoading, data, hasData, hasError, error } = useSelector(
    (state) => state.getImages,
  );

  console.log('isLoading:', isLoading);
  /**
   * Render List Item
   */
  const renderItem: ListRenderItem<string> = ({ item }) => (
    <ReHighlight style={[styles.listItem]}>
      <FastImage
        resizeMode="cover"
        style={styles.listImage}
        source={{ uri: item }}
      />
    </ReHighlight>
  );

  return isLoading ? (
    <Loader />
  ) : (
    <FlatList
      {...{ data }}
      numColumns={2}
      keyExtractor={(_, i) => i.toString()}
      showsVerticalScrollIndicator={false}
      {...{ ListHeaderComponent, data, renderItem }}
    />
  );
};

/**
 * HomeHeaderComponent
 */
export const HomeHeaderComponent: FC<HomeHeaderProps> = ({
  colors,
  getData,
}) => {
  const { data, hasError, isLoading } = useSelector(
    (state) => state.getCarouselImages,
  );
  return (
    <Slider
      timer={4000}
      style={styles.offersContainer}
      {...{ data }}
      animation
      contentContainerStyle={{}}
      width={Sizes.WIDTH}
      height={Sizes.SIZE_200}
      local={false}
      onPress={() => {}}
      indicatorActiveColor={colors.secondary}
      indicatorInActiveColor={colors.lightText}
      indicatorActiveWidth={Sizes.SIZE_30}
      indicatorContainerStyle={{ position: 'absolute', bottom: Sizes.SIZE_20 }}
      indicator
      loop
    />
  );
};
