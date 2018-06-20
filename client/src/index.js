import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { defaultReducer } from './reducers/defaultReducer';
import { homeReducer } from './reducers/homeReducer';
import { productReducer } from "./reducers/productReducer";
import thunk from 'redux-thunk';
import App from "./components/App";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import HomePage from "./components/home/homePage";
import ProductsPage from "./components/products/productsPage"

const combine =  combineReducers({defaultReducer: defaultReducer,homeReducer: homeReducer, productReducer: productReducer });

const store = createStore(combine, applyMiddleware(thunk));
render(

        <Provider store={store}>

                <BrowserRouter>
                    <div>
                        <App/>
                        <Switch>
                            <Route exact path='/' component={HomePage}/>
                            <Route path='/products' component={ProductsPage}/>
                            <Redirect to='/'/>
                        </Switch>
                    </div>
                </BrowserRouter>
        </Provider>,
        document.getElementById('root')
);
