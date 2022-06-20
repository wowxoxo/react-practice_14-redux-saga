import { PostI } from "../interfaces/posts";

export const getUserPosts = (userId: string): Promise<PostI> => {
  // throw new Error("user posts not implemented");
  return fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}/posts`
  ).then((response) => response.json());
};