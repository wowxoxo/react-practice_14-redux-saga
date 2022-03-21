import { all, take, takeEvery } from "redux-saga/effects";

export function* loggerSaga() {
  console.log("logger saga");
}

export function eachSagaWorker(action) {
  console.log("action", action);
}

// saga watcher
export function* eachSaga() {
  yield takeEvery("*", eachSagaWorker);
}

export function* rootSaga() {
  yield all([loggerSaga(), eachSaga()]);
}
