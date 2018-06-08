import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { defaultReducer } from './reducers/defaultReducer';
import { homeReducer } from './reducers/homeReducer';
import { productReducer } from "./reducers/productReducer";
import thunk from 'redux-thunk';

import App from './App';

const combine =  combineReducers({defaultReducer: defaultReducer,homeReducer: homeReducer, productReducer: productReducer });

const store = createStore(combine, applyMiddleware(thunk));
render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
);
