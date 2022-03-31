import {
  all,
  takeLatest,
  delay,
  call,
  put,
  fork,
  spawn,
  select
} from "redux-saga/effects";
import {
  USER_POSTS_FETCH_SUCCEEDED,
  USER_POSTS_FETCH_FAILED,
  USER_POSTS_FETCH_REQUESTED
} from "./posts/actions";
import * as postsApi from "../api/posts";
import { getUserPostsByQuerySelector, getUserPostsSelector } from "./selectors";

export function* fetchUserPostsWorker(action) {
  yield delay(500);
  try {
    const userPosts = yield call(postsApi.getUserPosts, action.payload.userId);

    yield put({
      type: USER_POSTS_FETCH_SUCCEEDED,
      payload: { data: userPosts }
    });

    // const data = yield select((state) => state.posts.posts);
    const data1 = yield select(getUserPostsSelector);
    console.log("data1", data1);
    const data2 = yield select(getUserPostsByQuerySelector, "do");
    console.log("data2", data2);
  } catch (error) {
    yield put({
      type: USER_POSTS_FETCH_FAILED,
      payload: error.message
    });
  }
}

export function* loggerSaga() {
  throw new Error("AAAAA");
  console.log("logger saga");
}

export function* userPostsFetchRequestedWatcherSaga() {
  yield takeLatest(USER_POSTS_FETCH_REQUESTED, fetchUserPostsWorker);
}

// all
export function* rootSaga1() {
  yield all([userPostsFetchRequestedWatcherSaga(), loggerSaga()]);
}

// fork
export function* rootSaga2() {
  yield fork(userPostsFetchRequestedWatcherSaga);
  yield fork(loggerSaga);
}

export function* rootSaga3() {
  yield all([fork(userPostsFetchRequestedWatcherSaga), fork(loggerSaga)]);
}

// spawn
export function* rootSaga4() {
  yield spawn(userPostsFetchRequestedWatcherSaga);
  yield spawn(loggerSaga);
}

// spawn with restart
export function* rootSaga5() {
  const sagas = [userPostsFetchRequestedWatcherSaga, loggerSaga];

  let counter = 0;
  yield all(
    sagas.map((saga) =>
      spawn(function* () {
        while (counter < 10) {
          try {
            yield call(saga);
            counter++;
            break;
          } catch (e) {
            console.log(e);
            counter++;
          }
        }
      })
    )
  );
}
