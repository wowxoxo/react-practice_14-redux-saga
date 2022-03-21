import React from "react";
import ReactDOM from "react-dom";
import { compose, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";

import "./index.css";
import App from "./App";
import { mainReducer } from "./store";
import { rootSaga } from "./store/sagas";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  mainReducer,
  compose(
    applyMiddleware(sagaMiddleware),
    process.env.NODE_ENV === "development" &&
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
