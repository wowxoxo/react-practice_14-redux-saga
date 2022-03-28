import {
  call,
  cancel,
  fork,
  put,
  take,
  takeEvery,
  takeLatest,
  takeLeading
} from "redux-saga/effects";
import * as postsApi from "../api/posts";
import {
  USER_POSTS_FETCH_REQUESTED,
  USER_POSTS_FETCH_SUCCEEDED,
  USER_POSTS_FETCH_FAILED
} from "./posts/actions";

function* fetchUserPostsWorker(action) {
  try {
    const userPosts = yield call(postsApi.getUserPosts, action.payload.userId);
    yield put({
      type: USER_POSTS_FETCH_SUCCEEDED,
      payload: { data: userPosts }
    });
    console.log(
      `put posts ${userPosts.length}; action id ${action.payload.id}`
    );
  } catch (error) {
    yield put({
      type: USER_POSTS_FETCH_FAILED,
      payload: error.message
    });
  }
}

export function* fetchUserPostsWatcherSaga() {
  // yield takeEvery(USER_POSTS_FETCH_REQUESTED, fetchUserPostsWorker);
  // yield takeLatest(USER_POSTS_FETCH_REQUESTED, fetchUserPostsWorker);
  // yield takeLeading(USER_POSTS_FETCH_REQUESTED, fetchUserPostsWorker);

  // takeLeading
  // while (true) {
  //   const action = yield take(USER_POSTS_FETCH_REQUESTED);
  //   yield call(fetchUserPostsWorker, action);
  // }

  // takeEvery
  // while (true) {
  //   const action = yield take(USER_POSTS_FETCH_REQUESTED);
  //   yield fork(fetchUserPostsWorker, action);
  // }

  let task;
  while (true) {
    const action = yield take(USER_POSTS_FETCH_REQUESTED);
    if (task) {
      yield cancel(task);
    }
    task = yield fork(fetchUserPostsWorker, action);
  }
}

export function* takeSagaRootWatcher() {
  yield fetchUserPostsWatcherSaga();
}
