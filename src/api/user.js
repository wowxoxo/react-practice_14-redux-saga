const mockusers = [
  {
    username: "user1",
    password: "password1"
  },
  {
    username: "user2",
    password: "password2"
  }
];

export const login = (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockusers.find(
        (user) => user.username === username && user.password === password
      );
      if (user) {
        resolve(`${user.username}-token`);
      }
      reject(`${user.username} is dumb ass`);
    }, 1000);
  });
};

export const saveToken = (username, token) => {
  // todo, add username
  localStorage.setItem("token", JSON.stringify({ username, token }));
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const clearToken = () => {
  localStorage.removeItem("token");
};

export const saveUsernameOnServer = (username) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`saved ${username}`);
      resolve();
    }, 500);
  });
};
