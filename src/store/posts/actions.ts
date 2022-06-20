import { UserPostsActionType } from "./action-types";
import { PostI } from "../../interfaces/posts";

export interface requestUserPostsActionPayload {
  userId: PostI["userId"];
  id: PostI["id"];
}

export interface requestUserPostsAction {
  type: UserPostsActionType.FETCH_REQUESTED;
  payload: requestUserPostsActionPayload;
}

export interface userPostsFetchSucceededAction {
  type: UserPostsActionType.FETCH_SUCCEEDED;
  payload: { data: PostI[] };
}

export type UserPostsAction = userPostsFetchSucceededAction;
