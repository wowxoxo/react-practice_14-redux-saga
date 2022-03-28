export const getUserAlbums = (userId) => {
  // throw new Error("get user albums not implemented");
  return fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}/albums`
  ).then((response) => response.json());
};
