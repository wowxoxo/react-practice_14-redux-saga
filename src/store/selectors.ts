import { AppState } from ".";

export const getUserPostsSelector = (state: AppState) => state.posts.posts;
export const getUserPostsByQuerySelector = (state: AppState, query = "") =>
  state.posts.posts.filter(
    (post) => post.title.includes(query) || post.body.includes(query)
  );
