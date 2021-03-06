import { USER_POSTS_FETCH_SUCCEEDED } from "./actions";

const initState = {
  posts: []
};

export const postsReducer = (state = initState, action) => {
  switch (action.type) {
    case USER_POSTS_FETCH_SUCCEEDED: {
      const posts = action.payload.data;
      return { ...state, posts };
    }

    default:
      return state;
  }
};
