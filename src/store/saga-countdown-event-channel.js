import { eventChannel, END } from "redux-saga";
import { call, cancelled, take, cancel } from "redux-saga/effects";

function countdown(secs) {
  return eventChannel((emitter) => {
    const interval = setInterval(() => {
      secs -= 1;
      if (secs > 0) {
        emitter(secs);
      } else {
        emitter(END);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });
}

export function* countdownSaga() {
  const value = 10;
  const channel = yield call(countdown, value);
  try {
    while (true) {
      const seconds = yield take(channel);
      // if (seconds == 5) {
      //   yield cancel(channel);
      // }
      console.log(`countdown: ${seconds}`);
    }
  } finally {
    if (yield cancelled()) {
      console.log("countdown cancelled");
      channel.close();
      // console.log("countdown terminated");
    } else {
      console.log("countdown finished");
    }
  }
}
