import { Colors } from './../theme/theme';
import { Dispatch } from 'redux';
import { ReducerDataState } from './Reducer';

/**
 * HomeListProps
 */
export interface HomeListProps {
  ListHeaderComponent:
    | React.ComponentType<any>
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  getData: () => void;
}

/**
 * HomeHeaderProps
 */
export interface HomeHeaderProps {
  colors: Colors;
  getData: () => void;
}

/*==============Actions================*/

/**
 * Get Image Action
 * Get all the images
 */
export type GetImagesAction = () => (dispatch: Dispatch) => void;

/**
 * Get Carousel Image Action
 * Get all the images from carousel
 */
export type GetCarouselImagesAction = () => (dispatch: Dispatch) => void;

/*==============State================*/

/**
 * GetImagesState
 */
export interface GetImagesState extends ReducerDataState {
  data: string[];
}

/**
 * GetImagesState
 */
export interface GetCarouselImagesState extends ReducerDataState {
  data: string[];
}
