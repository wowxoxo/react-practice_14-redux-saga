import { call, delay, put } from "redux-saga/effects";
// import { delay } from "../utils/delay";
import { fetchUserPostsWorker } from "./sagas";
import * as postsApi from "../api/posts";
import {
  USER_POSTS_FETCH_FAILED,
  USER_POSTS_FETCH_SUCCEEDED
} from "./posts/actions";
import { cloneableGenerator } from "@redux-saga/testing-utils";
import { runSaga } from "redux-saga";

describe("fetchUserPostsWorker positive path", () => {
  describe("fetches user posts", () => {
    const userId = 1;
    const action = {
      payload: { userId }
    };
    const userPosts = [{ id: "user-post-1" }];

    const g = fetchUserPostsWorker(action);
    it("should delay", () => {
      expect(g.next().value).toEqual(delay(500));
    });

    // g.next() === delay(500)

    it("should return user posts", () => {
      expect(g.next().value).toEqual(call(postsApi.getUserPosts, 1));
    });

    it("should put user posts to store", () => {
      expect(g.next(userPosts).value).toEqual(
        put({
          type: USER_POSTS_FETCH_SUCCEEDED,
          payload: { data: userPosts }
        })
      );
    });

    it("should check generator has been done", () => {
      expect(g.next().done).toEqual(true);
    });
  });
});

describe("fetchUserPostsWorker branching", () => {
  const userId = 1;
  const action = {
    payload: { userId }
  };
  const userPosts = [{ id: "user-post-1" }];
  const errorMessage = "Request failed";

  const g = cloneableGenerator(fetchUserPostsWorker)(action);
  g.next(); // delay

  it("should fetch user posts and puts them to the store", () => {
    const gClone = g.clone();

    expect(gClone.next().value).toEqual(call(postsApi.getUserPosts, userId));

    expect(gClone.next(userPosts).value).toEqual(
      put({
        type: USER_POSTS_FETCH_SUCCEEDED,
        payload: { data: userPosts }
      })
    );

    expect(gClone.next().done).toEqual(true);
  });

  it("puts error message to store if error was thrown", () => {
    const gClone = g.clone();

    gClone.next(); // call

    expect(
      gClone.throw({
        message: errorMessage
      }).value
    ).toEqual(
      put({
        type: USER_POSTS_FETCH_FAILED,
        payload: errorMessage
      })
    );

    expect(gClone.next().done).toEqual(true);
  });
});

describe("fetchUserPostsWorker full saga", () => {
  const userId = 1;
  const action = {
    payload: { userId }
  };
  it("should fetch user posts and puts them to the store", async () => {
    const userPosts = [{ id: "user-post-1" }];
    postsApi.getUserPosts = jest.fn().mockResolvedValue(userPosts);

    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => ({ state: "test" })
      },
      fetchUserPostsWorker,
      action
    ).toPromise();

    expect(postsApi.getUserPosts).toHaveBeenCalledWith(userId);
    expect(dispatched).toEqual([
      {
        type: USER_POSTS_FETCH_SUCCEEDED,
        payload: { data: userPosts }
      }
    ]);
  });

  it("puts error message to store if error was thrown", async () => {
    const errorMessage = "Request failed";
    postsApi.getUserPosts = jest
      .fn()
      .mockRejectedValue({ message: errorMessage });

    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => ({ state: "test" })
      },
      fetchUserPostsWorker,
      action
    ).toPromise();

    expect(postsApi.getUserPosts).toHaveBeenCalledWith(userId);
    expect(dispatched).toEqual([
      {
        type: USER_POSTS_FETCH_FAILED,
        payload: errorMessage
      }
    ]);
  });
});
