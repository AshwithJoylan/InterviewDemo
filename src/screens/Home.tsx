import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { getCarouselImagesAction, getImagesAction } from '@actions';
import { useDispatch } from 'react-redux';
import { HomeComponents } from '@components';
import { useColors } from '@theme';
import { useNetInfo } from '@react-native-community/netinfo';

const { Container, Header, List, HomeHeaderComponent } = HomeComponents;
/**
 * @interface HomeProps
 */
interface HomeProps {}

/**
 * Home
 */
const Home: React.FC<HomeProps> = () => {
  /**
   * Actions
   */
  const actions = bindActionCreators(
    {
      getImages: getImagesAction,
      getCarouselImages: getCarouselImagesAction,
    },
    useDispatch(),
  );

  const { isConnected } = useNetInfo();
  const colors = useColors();

  /**
   * getCarouselImages
   */
  const getCarouselImages = () => {
    if (isConnected) {
      actions.getCarouselImages();
    }
  };

  /**
   * getImages
   */
  const getImages = () => {
    if (isConnected) {
      actions.getImages();
    }
  };

  useEffect(() => {
    getImages();
    getCarouselImages();
  }, [isConnected]);

  return (
    <Container>
      <Header />
      <List
        getData={getImages}
        ListHeaderComponent={
          <HomeHeaderComponent getData={getCarouselImages} {...{ colors }} />
        }
      />
    </Container>
  );
};

export default Home;
