import { GetCarouselImagesAction, GetImagesAction } from '@types';
import { say, pass } from './actions';
import * as Constants from '@constants';
import Axios from 'axios';

/**
 * getImagesAction
 * get all the images from api
 * @returns void
 */
export const getCarouselImagesAction: GetCarouselImagesAction = () => async (
  dispatch,
) => {
  dispatch(say(Constants.GET_CAROUSEL_IMAGES_LOADING));
  try {
    const response = await Axios.get(
      'http://shibe.online/api/shibes?count=5&urls=true&httpsUrls=true',
    );
    if (response.status === 200) {
      dispatch(pass(Constants.GET_CAROUSEL_IMAGES_SUCCESS, response.data));
    } else {
      dispatch(
        pass(Constants.GET_CAROUSEL_IMAGES_ERROR, {
          error: 'Failed to get Images',
        }),
      );
    }
  } catch (error) {
    const err = error.response;
    dispatch(
      pass(Constants.GET_CAROUSEL_IMAGES_ERROR, {
        status: error.code === 'ECONNABORTED' ? 408 : err?.status,
        error:
          err?.data?.error?.lead_id ||
          err?.data?.error?.lead_type ||
          err?.data ||
          error.message,
      }),
    );
  }
};

/**
 * getImagesAction
 * get all the images from api
 * @returns void
 */
export const getImagesAction: GetImagesAction = () => async (dispatch) => {
  dispatch(say(Constants.GET_IMAGES_LOADING));
  try {
    const response = await Axios.get(
      'http://shibe.online/api/shibes?count=30&urls=true&httpsUrls=true',
    );
    if (response.status === 200) {
      dispatch(pass(Constants.GET_IMAGES_SUCCESS, response.data));
    } else {
      dispatch(
        pass(Constants.GET_IMAGES_ERROR, { error: 'Failed to get Images' }),
      );
    }
  } catch (error) {
    const err = error.response;
    dispatch(
      pass(Constants.GET_IMAGES_ERROR, {
        status: error.code === 'ECONNABORTED' ? 408 : err?.status,
        error:
          err?.data?.error?.lead_id ||
          err?.data?.error?.lead_type ||
          err?.data ||
          error.message,
      }),
    );
  }
};
