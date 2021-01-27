import { combineReducers } from 'redux';
import * as HomeReducer from './Home';

export default combineReducers({
  ...HomeReducer,
});
