import {
  all,
  take,
  takeEvery,
  put,
  call,
  takeLatest,
  delay,
  race
} from "redux-saga/effects";
import { INCREMENT, INCREMENT_ASYNC } from "./counter/actions";
// import { delay } from "../utils/delay";
import {
  USER_POSTS_FETCH_REQUESTED,
  USER_POSTS_FETCH_SUCCEEDED,
  USER_POSTS_FETCH_FAILED,
  USER_POSTS_FETCH_CANCEL
} from "./posts/actions";
import * as postsApi from "../api/posts";

export function* fetchUserPostsWorker(action) {
  yield delay(2000);
  try {
    const userPosts = yield call(postsApi.getUserPosts, action.payload.userId);
    yield put({
      type: USER_POSTS_FETCH_SUCCEEDED,
      payload: { data: userPosts }
    });
    // console.log("userPosts", userPosts);
    return userPosts;
  } catch (error) {
    yield put({
      type: USER_POSTS_FETCH_FAILED,
      payload: error.message
    });
  }
}

export function* userPostsRaceSaga() {
  while (true) {
    const action = yield take(USER_POSTS_FETCH_REQUESTED);
    const [userPosts, userPostCancelled] = yield race([
      fetchUserPostsWorker(action),
      take(USER_POSTS_FETCH_CANCEL)
    ]);
    console.log("userPosts", userPosts);
    console.log("userPostCancelled", userPostCancelled);
  }
}
