import { combineReducers } from "redux";
import { postsReducer } from "./posts/reducer";
import { counterReducer } from "./counter/reducer";
import { loginReducer } from "./login/reducer";

export const mainReducer = combineReducers({
  counter: counterReducer,
  posts: postsReducer,
  login: loginReducer
});

export type AppState0 = typeof mainReducer;
export type AppState = ReturnType<typeof mainReducer>;
