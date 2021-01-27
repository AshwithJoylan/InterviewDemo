import { GetCarouselImagesState, GetImagesState } from '@types';
import { Reducer } from 'redux';
import * as Constants from '@constants';

const initState: GetImagesState = {
  isLoading: false,
  hasError: false,
  hasData: false,
  error: null,
  data: [],
};

/**
 * getImages Reducer
 * @param state GetImagesState
 * @param action Action
 * @returns GetImagesState
 */
export const getImages: Reducer<GetImagesState> = (
  state = initState,
  action,
) => {
  console.log('action:', action)
  switch (action.type) {
    case Constants.GET_IMAGES_LOADING:
      console.log('reduer', {
        ...state,
        ...initState,
        isLoading: true,
      })
      return {
        ...state,
        ...initState,
        isLoading: true,
      };
    case Constants.GET_IMAGES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasData: true,
        data: action.payload,
      };
    case Constants.GET_IMAGES_ERROR:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        error: action.payload,
      };
    default:
      return state;
  }
};

/**
 * getCarouselImages Reducer
 * @param state GetCarouselImagesState
 * @param action Action
 * @returns GetCarouselImagesState
 */
export const getCarouselImages: Reducer<GetCarouselImagesState> = (
  state = initState,
  action,
) => {
  switch (action.type) {
    case Constants.GET_CAROUSEL_IMAGES_LOADING:
      return {
        ...state,
        ...initState,
        isLoading: true,
      };
    case Constants.GET_CAROUSEL_IMAGES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasData: true,
        data: action.payload,
      };
    case Constants.GET_CAROUSEL_IMAGES_ERROR:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        error: action.payload,
      };
    default:
      return state;
  }
};
