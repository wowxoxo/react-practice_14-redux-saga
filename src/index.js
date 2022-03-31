import React from "react";
import ReactDOM from "react-dom";
import { compose, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";

import "./index.css";
import App from "./App";
import { mainReducer } from "./store";
import { rootSaga } from "./store/sagas";
import { rootSagaWitchActionChannel } from "./store/sagas-with-action-channel";
import { loginFlowSaga } from "./store/sagas-login-flow-non-blocking";
import { forkSaga } from "./store/sagas-fork";
import { takeSagaRootWatcher } from "./store/sagas-takes";
import { countdownSaga } from "./store/saga-countdown-event-channel";
// import { userPostsFetchRequestedWithBuffer } from "./store/sagas-action-channel-with-buffer";
import { channelSaga } from "./store/sagas-channel";
import { filesUploadingChannelSaga } from "./store/sagas-upload-channel";
import { sagaThrottleDebounce } from "./store/sagas-throttle-debounce";
import * as postsApi from "./api/posts";
import { rootSaga1, rootSaga4, rootSaga5 } from "./store/sagas-root-saga";

const sagaMiddleware = createSagaMiddleware({
  context: {
    postsApi
  }
});

const store = createStore(
  mainReducer,
  compose(
    applyMiddleware(sagaMiddleware),
    process.env.NODE_ENV === "development" &&
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

// sagaMiddleware.run(rootSaga)
// sagaMiddleware.run(rootSagaWitchActionChannel);
sagaMiddleware.run(loginFlowSaga);
// sagaMiddleware.run(forkSaga);
// sagaMiddleware.run(takeSagaRootWatcher);
// sagaMiddleware.run(countdownSaga);
// sagaMiddleware.run(userPostsFetchRequestedWithBuffer);
sagaMiddleware.run(channelSaga);
sagaMiddleware.run(filesUploadingChannelSaga);
sagaMiddleware.run(sagaThrottleDebounce);
sagaMiddleware.run(rootSaga5);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
