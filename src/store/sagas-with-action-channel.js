import {
  all,
  take,
  takeEvery,
  put,
  call,
  takeLatest,
  actionChannel
} from "redux-saga/effects";
import { buffers } from "redux-saga";
import { INCREMENT, INCREMENT_ASYNC } from "./counter/actions";
import { delay } from "../utils/delay";
import {
  USER_POSTS_FETCH_REQUESTED,
  USER_POSTS_FETCH_SUCCEEDED,
  USER_POSTS_FETCH_FAILED
} from "./posts/actions";
import * as postsApi from "../api/posts";

export function* loggerSaga() {
  console.log("logger saga");
}

export function eachSagaWorker(action) {
  console.log("action", action);
}

// saga watcher
export function* eachSagaWatcher() {
  yield takeEvery("*", eachSagaWorker);
}

export function* incrementAsyncWorker() {
  // yield delay(1000);
  yield call(delay, 1000);
  yield put({ type: INCREMENT });
}

export function* watchIncrementAsync() {
  yield takeEvery(INCREMENT_ASYNC, incrementAsyncWorker);
}

export function* fetchUserPostsWorker(action) {
  yield delay(500);
  try {
    const userPosts = yield call(postsApi.getUserPosts, action.payload.userId);
    yield put({
      type: USER_POSTS_FETCH_SUCCEEDED,
      payload: { data: userPosts }
    });
  } catch (error) {
    yield put({
      type: USER_POSTS_FETCH_FAILED,
      payload: error.message
    });
  }
}

export function* userPostsFetchRequestedWatcherSaga() {
  // yield takeLatest(USER_POSTS_FETCH_REQUESTED, fetchUserPostsWorker);
  const requestChannel = yield actionChannel(
    USER_POSTS_FETCH_REQUESTED,
    buffers.none()
  );
  while (true) {
    const action = yield take(requestChannel);
    yield call(fetchUserPostsWorker, action);
  }
}

export function* rootSaga() {
  yield all([
    loggerSaga(),
    eachSagaWatcher(),
    watchIncrementAsync(),
    userPostsFetchRequestedWatcherSaga()
  ]);
}
