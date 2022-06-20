import { UserPostsActionType } from "./action-types";
import { requestUserPostsActionPayload } from "./actions";

export const requestUserPosts = ({ userId, id }: requestUserPostsActionPayload ) => {
  console.log(
    `Received action USER_POSTS_FETCH_REQUESTED with dispatch id ${id}`
  );
  return {
    type: UserPostsActionType.FETCH_REQUESTED,
    payload: { userId, id }
  };
};