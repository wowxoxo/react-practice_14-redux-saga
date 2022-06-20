import { take, fork, call, throttle, debounce } from "redux-saga/effects";
import { saveUsernameOnServer } from "../api/user";
import { CHANGE_USERNAME } from "./posts/action-types";

function* changeUsernameWorker(action) {
  console.log("username", action.payload.username);

  yield call(saveUsernameOnServer, action.payload.username);
}

export function* sagaThrottleDebounce() {
  // while (true) {
  //   const action = yield take(CHANGE_USERNAME);
  //   yield fork(changeUsernameWorker, action);
  // }

  // yield throttle(1000, CHANGE_USERNAME, changeUsernameWorker);
  yield debounce(500, CHANGE_USERNAME, changeUsernameWorker);
}
