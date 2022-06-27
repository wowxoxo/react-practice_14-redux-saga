import { createSelector } from "reselect";
import { AppState } from ".";

export const getUserPostsSelector = (state: AppState) => state.posts.posts;
export const getUserPostsByQuerySelector = (state: AppState, query = "") =>
  state.posts.posts.filter(
    (post) => post.title.includes(query) || post.body.includes(query)
  );

export const getCounter = (state: AppState) => state.counter;
export const getPosts = (state: AppState) => state.posts;
export const getLogin = (state: AppState) => state.login;

export const getUserPostsByQuerySelectorCached = createSelector(
  getPosts,
  getLogin,
  (todos, login) => {
    if (login.token) {
      return todos;
    } else {
      return [];
    }
  }
);
