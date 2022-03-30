export const USER_POSTS_FETCH_REQUESTED = "USER_POSTS_FETCH_REQUESTED";
export const USER_POSTS_FETCH_SUCCEEDED = "USER_POSTS_FETCH_SUCCEEDED";
export const USER_POSTS_FETCH_FAILED = "USER_POSTS_FETCH_FAILED";
export const requestUserPosts = ({ userId, id }) => {
  console.log(
    `Received action USER_POSTS_FETCH_REQUESTED with dispatch id ${id}`
  );
  return {
    type: USER_POSTS_FETCH_REQUESTED,
    payload: { userId, id }
  };
};

export const SAVE_USER_POSTS = "SAVE_USER_POSTS";
export const SAVE_USER_ALBUMS = "SAVE_USER_ALBUMS";

export const FILES_UPLOADING_START = "FILES_UPLOADING_START";
export const FILES_UPLOADING_PROGRESS = "FILES_UPLOADING_PROGRESS";

export const CHANGE_USERNAME = "CHANGE_USERNAME";
