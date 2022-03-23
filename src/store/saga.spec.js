import test from "tape";
import { call } from "redux-saga/effects";
import { delay } from "../utils/delay";
import { incrementAsyncWorker } from "./sagas";

test("incrementAsyncWorker Saga test", (assert) => {
  const gen = incrementAsyncWorker();
  // gen.next(); // { done: false, value: result of delay }
  // gen.next(); // { done: false, value: result of calling put }
  // gen.next(); // { done: true, value: undefined }

  // assert.deepEqual(
  //   gen.next(),
  //   { done: false, value: undefined },
  //   "incrementAsyncWorker should return Promise that will resolve after 1 sec"
  // );

  assert.deepEqual(
    gen.next().value,
    call(delay, 1000),
    "incrementAsyncWorker should return Promise that will resolve after 1 sec"
  );

  assert.end();

  // expect(gen.next().value).toEqual(call(delay, 1000));
});
