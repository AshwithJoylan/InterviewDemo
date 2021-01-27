import { GetCarouselImagesState, GetImagesState } from './Home';
/**
 * ReduxState
 */
export interface ReduxState {
  getImages: GetImagesState;
  getCarouselImages: GetCarouselImagesState;
}
