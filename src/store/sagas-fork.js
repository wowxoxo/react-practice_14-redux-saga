import { call, fork, put, spawn, takeEvery } from "redux-saga/effects";
import { getUserAlbums } from "../api/albums";
import { getUserPosts } from "../api/posts";
import { delay } from "../utils/delay";
import {
  SAVE_USER_ALBUMS,
  SAVE_USER_POSTS,
  USER_POSTS_FETCH_REQUESTED
} from "./posts/action-types";

function* getAlbums(userId) {
  const data = yield call(getUserAlbums, userId);
  yield put({ type: SAVE_USER_ALBUMS, payload: { data } });
}

function* getPosts(userId) {
  const data = yield call(getUserPosts, userId);
  yield put({ type: SAVE_USER_POSTS, payload: { data } });
}

function* getUserData() {
  const userId = 1;
  const albums = yield spawn(getAlbums, userId);
  const posts = yield spawn(getPosts, userId);
  yield delay(2000);
  console.log("finished getting user data");
}

export function* forkSaga() {
  yield takeEvery(USER_POSTS_FETCH_REQUESTED, getUserData);
}
