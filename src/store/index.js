import { combineReducers } from "redux";
import { postsReducer } from "./posts/reducer";
import { counterReducer } from "./counter/reducer";
import { loginReducer } from "./login/reducer";

export const mainReducer = combineReducers({
  counter: counterReducer,
  posts: postsReducer,
  login: loginReducer
});
