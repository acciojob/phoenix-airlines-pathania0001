import React from "react";
import {render} from 'react-dom';
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";

import Home from "./modules/home/home";

import rootReducer from "./rootReducer";
import rootSaga from "./sagas";

const sagaMiddleWare = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleWare));
sagaMiddleWare.run(rootSaga);

const rootElement = document.getElementById("root");

render(
  <Provider store={store}>
    <Home />
  </Provider>
  ,
  rootElement
);