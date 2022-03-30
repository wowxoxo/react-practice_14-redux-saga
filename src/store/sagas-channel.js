import { channel } from "redux-saga";
import { take, call, delay, fork, put } from "redux-saga/effects";

function* handleChannelRequest(requestChannel) {
  while (true) {
    const payload = yield take(requestChannel);
    console.log("payload", payload);
    yield delay(1000);
  }
}

export function* channelSaga() {
  const requestChannel = yield call(channel);

  yield fork(handleChannelRequest, requestChannel);

  yield put(requestChannel, { payload: "Hello" });
  yield put(requestChannel, { payload: "Hello 2" });
  yield put(requestChannel, { payload: "Hello 3" });
  yield put(requestChannel, { payload: "Hello 4" });
}
