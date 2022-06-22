import {
  FilesUploadingActionType,
  SaveUserActionType,
  UserPostsActionType
} from "./action-types";
import { PostI } from "../../interfaces/posts";

export interface requestUserPostsActionPayload {
  userId: PostI["userId"];
  id: PostI["id"];
}

interface UserPostsActionPayloadType {
  data: PostI[];
}

export interface requestUserPostsAction {
  type: UserPostsActionType.FETCH_REQUESTED;
  payload: requestUserPostsActionPayload;
}

// for reducer
export interface userPostsFetchSucceededAction {
  type: UserPostsActionType.FETCH_SUCCEEDED;
  payload: UserPostsActionPayloadType;
}

// for saga
export interface userPostsFetchFailedAction {
  type: UserPostsActionType.FETCH_FAILED;
  payload: string;
}

export interface saveUserPostsAction {
  type: SaveUserActionType.POSTS;
  payload: UserPostsActionPayloadType;
}
export interface saveUserAlbumsAction {
  type: SaveUserActionType.ALBUMS;
  payload: { data: PostI[] };
}

export interface filesUploadingProgressAction {
  type: FilesUploadingActionType.PROGRESS;
  payload: { progressValue: number };
}

export type UserPostsAction =
  | userPostsFetchSucceededAction
  | userPostsFetchFailedAction
  | saveUserPostsAction
  | saveUserAlbumsAction
  | filesUploadingProgressAction;
