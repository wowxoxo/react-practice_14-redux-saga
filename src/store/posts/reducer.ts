import { PostI } from "../../interfaces/posts";
import {
  UserPostsActionType,
  SaveUserActionType,
  FilesUploadingActionType
} from "./action-types";
import { UserPostsAction } from "./actions";

interface PostsState {
  posts: Array<PostI>;
  albums: Array<any>;
  filesUploadingProgress: number;
}

const initState: PostsState = {
  posts: [],
  albums: [],
  filesUploadingProgress: 0
};

export const postsReducer = (state = initState, action: UserPostsAction) => {
  switch (action.type) {
    case UserPostsActionType.FETCH_SUCCEEDED:
    case SaveUserActionType.POSTS: {
      const posts = action.payload.data;
      return { ...state, posts };
    }

    case SaveUserActionType.ALBUMS: {
      const albums = action.payload.data;
      return { ...state, albums };
    }

    // case SAVE_USER_POSTS: {
    //   const posts = action.payload.data;
    //   return { ...state, posts };
    // }

    case FilesUploadingActionType.PROGRESS: {
      const filesUploadingProgress = action.payload.progressValue;
      return { ...state, filesUploadingProgress };
    }

    default:
      return state;
  }
};
