import { applyMiddleware, createStore } from 'redux';
import rootReducer from '@reducers';
import { Provider } from 'react-redux';
import React, { FC } from 'react';
import thunk from 'redux-thunk';

/**
 * Redux Store
 */
export const store = createStore(rootReducer, applyMiddleware(thunk));

export const Store: FC = ({ children }) => (
  <Provider {...{ store }}>{children}</Provider>
);
