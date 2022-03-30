import {
  all,
  take,
  takeEvery,
  put,
  call,
  fork,
  takeLatest,
  actionChannel
} from "redux-saga/effects";
import { buffers } from "redux-saga";
import { delay } from "../utils/delay";
import {
  USER_POSTS_FETCH_REQUESTED,
  USER_POSTS_FETCH_SUCCEEDED,
  USER_POSTS_FETCH_FAILED
} from "./posts/actions";
import * as postsApi from "../api/posts";

export function* fetchUserPostsWorker(action) {
  // yield delay(500);
  console.log(
    `Processing action ${action.type}; dispatchId: ${action.payload.id}`
  );
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

// watcher
export function* userPostsFetchRequestedWithBuffer() {
  // yield takeLatest(USER_POSTS_FETCH_REQUESTED, fetchUserPostsWorker);
  const requestChannel = yield actionChannel(
    USER_POSTS_FETCH_REQUESTED,
    // buffers.none()
    // buffers.fixed(2)
    // buffers.expanding(1)
    // buffers.dropping(2)
    buffers.sliding(2)
  );
  while (true) {
    const action = yield take(requestChannel);
    yield call(fetchUserPostsWorker, action);
  }
}

export function* rootSaga() {
  yield all([userPostsFetchRequestedWithBuffer()]);
}
