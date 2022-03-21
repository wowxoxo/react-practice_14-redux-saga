import { combineReducers } from "redux";
import { postsReducer } from "./reducer";

export const mainReducer = combineReducers({
  posts: postsReducer
});
