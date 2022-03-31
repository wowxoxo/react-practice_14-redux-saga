export const getUserPostsSelector = (state) => state.posts.posts;
export const getUserPostsByQuerySelector = (state, query = "") =>
  state.posts.posts.filter(
    (post) => post.title.includes(query) || post.body.includes(query)
  );
