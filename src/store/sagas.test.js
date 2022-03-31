import { call, delay, put } from "redux-saga/effects";
// import { delay } from "../utils/delay";
import { fetchUserPostsWorker } from "./sagas";
import * as postsApi from "../api/posts";
import { USER_POSTS_FETCH_SUCCEEDED } from "./posts/actions";

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
