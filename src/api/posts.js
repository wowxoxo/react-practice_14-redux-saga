export const getUserPosts = (userId) => {
  // throw new Error("user posts not implemented");
  return fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}/posts`
  ).then((response) => response.json());
};
