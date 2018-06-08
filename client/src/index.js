import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { defaultReducer } from './reducers/defaultReducer';
import { homeReducer } from './reducers/homeReducer';
import { productReducer } from "./reducers/productReducer";

import App from './App';

const test =  combineReducers({defaultReducer: defaultReducer,homeReducer: homeReducer, productReducer: productReducer });

const store = createStore(test);
render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
);
