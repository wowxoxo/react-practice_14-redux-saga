import { UserPostsActionType } from "./action-types";
import {
  requestUserPostsAction,
  requestUserPostsActionPayload
} from "./actions";

export const requestUserPosts = ({
  userId,
  id
}: requestUserPostsActionPayload): requestUserPostsAction => {
  console.log(
    `Received action USER_POSTS_FETCH_REQUESTED with dispatch id ${id}`
  );
  return {
    type: UserPostsActionType.FETCH_REQUESTED,
    payload: { userId, id }
  };
};
