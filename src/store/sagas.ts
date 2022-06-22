import {
  all,
  take,
  takeEvery,
  put,
  call,
  takeLatest,
  delay
} from "redux-saga/effects";
import { CounterActionType } from "./counter/action-types";
// import { delay } from "../utils/delay";
import { UserPostsActionType } from "./posts/action-types";
import * as postsApi from "../api/posts";
import { CounterAction } from "./counter/actions";
import { requestUserPostsAction, UserPostsAction } from "./posts/actions";
import { PostI } from "../interfaces/posts";

export function* loggerSaga() {
  console.log("logger saga");
}

export function eachSagaWorker(action: CounterAction) {
  console.log("action", action);
}

// saga watcher
export function* eachSagaWatcher() {
  yield takeEvery("*", eachSagaWorker);
}

export function* incrementAsyncWorker() {
  // yield delay(1000);
  yield delay(1000);
  yield put<CounterAction>({ type: CounterActionType.INCREMENT });
}

export function* watchIncrementAsync() {
  yield takeEvery<CounterAction>(
    CounterActionType.INCREMENT_ASYNC,
    incrementAsyncWorker
  );
}

export function* fetchUserPostsWorker(action: requestUserPostsAction) {
  yield delay(500);
  try {
    const userPosts: PostI[] = yield call(
      postsApi.getUserPosts,
      action.payload.userId
    );
    yield put<UserPostsAction>({
      type: UserPostsActionType.FETCH_SUCCEEDED,
      payload: { data: userPosts }
    });
  } catch (error) {
    yield put<UserPostsAction>({
      type: UserPostsActionType.FETCH_FAILED,
      payload: (error as Error).message
    });
  }
}

export function* userPostsFetchRequestedWatcherSaga() {
  // yield takeEvery(USER_POSTS_FETCH_REQUESTED, fetchUserPostsWorker);
  yield takeLatest(UserPostsActionType.FETCH_REQUESTED, fetchUserPostsWorker);
}

export function* rootSaga() {
  yield all([
    loggerSaga(),
    eachSagaWatcher(),
    watchIncrementAsync(),
    userPostsFetchRequestedWatcherSaga()
  ]);
}
