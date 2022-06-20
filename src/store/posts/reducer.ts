import {
  SAVE_USER_ALBUMS,
  USER_POSTS_FETCH_SUCCEEDED,
  SAVE_USER_POSTS,
  FILES_UPLOADING_PROGRESS,
  UserPostsActionType
} from "./action-types";
import { UserPostsAction } from "./actions";

const initState = {
  posts: [],
  albums: [],
  filesUploadingProgress: 0
};

export const postsReducer = (state = initState, action: UserPostsAction) => {
  switch (action.type) {
    case USER_POSTS_FETCH_SUCCEEDED:
    case UserPostsActionType.FETCH_SUCCEEDED:
    case SAVE_USER_POSTS: {
      const posts = action.payload.data;
      return { ...state, posts };
    }

    case SAVE_USER_ALBUMS: {
      const albums = action.payload.data;
      return { ...state, albums };
    }

    // case SAVE_USER_POSTS: {
    //   const posts = action.payload.data;
    //   return { ...state, posts };
    // }

    case FILES_UPLOADING_PROGRESS: {
      const filesUploadingProgress = action.payload.progressValue;
      return { ...state, filesUploadingProgress };
    }

    default:
      return state;
  }
};
