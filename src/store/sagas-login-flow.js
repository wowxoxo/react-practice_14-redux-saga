import { take, put, call } from "redux-saga/effects";
import {
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT
} from "./login/actions";
import * as userApi from "../api/user";

// worker
export function* authorize(username, password) {
  try {
    const token = yield call(userApi.login, username, password);
    yield put({ type: LOGIN_SUCCESS, payload: { token } });
    return token;
  } catch (error) {
    yield put({ type: LOGIN_ERROR, payload: { error } });
  }
}

// watcher
export function* loginFlow() {
  while (true) {
    const { payload } = yield take(LOGIN_REQUEST);
    const token = yield call(authorize, payload.username, payload.password);

    if (token) {
      yield call(userApi.saveToken, payload.username, token);
      yield take(LOGOUT);
      yield call(userApi.clearToken);
    }
  }
}

// root watcher saga
export function* loginFlowSaga() {
  yield loginFlow();
}
