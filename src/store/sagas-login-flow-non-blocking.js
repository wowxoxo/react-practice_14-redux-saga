import { take, put, call, fork, cancel, cancelled } from "redux-saga/effects";
import {
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  STOP_LOGIN_LOADING
} from "./login/actions";
import * as userApi from "../api/user";

// worker
export function* authorize(username, password) {
  try {
    const token = yield call(userApi.login, username, password);
    yield call(userApi.saveToken, username, token);
    yield put({ type: LOGIN_SUCCESS, payload: { token } });
    return token;
  } catch (error) {
    yield put({ type: LOGIN_ERROR, payload: { error } });
  } finally {
    if (yield cancelled()) {
      yield put({ type: STOP_LOGIN_LOADING });
    }
  }
}

// watcher
export function* loginFlow() {
  while (true) {
    const { payload } = yield take(LOGIN_REQUEST);
    const loginTask = yield fork(authorize, payload.username, payload.password);
    const action = yield take([LOGOUT, LOGIN_ERROR]);
    if (action.type === LOGOUT) yield cancel(loginTask);
    yield call(userApi.clearToken);
  }
}

// root watcher saga
export function* loginFlowSaga() {
  yield loginFlow();
}
