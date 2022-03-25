import React from "react";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN_REQUEST, LOGOUT } from "./store/login/actions";

const Login = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.login.isLoading);
  const error = useSelector((state) => state.login.error);
  const token = useSelector((state) => state.login.token);
  const handleLoginClick = () => {
    dispatch({
      type: LOGIN_REQUEST,
      payload: { username: "user1", password: "password1" }
    });
  };

  const handleLogoutClick = () => {
    dispatch({ type: LOGOUT });
  };

  return (
    <div>
      <Button type="button" variant="primary" onClick={handleLoginClick}>
        Login
      </Button>
      <br />
      <Button type="button" variant="primary" onClick={handleLogoutClick}>
        Logout
      </Button>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {token && <p>{token}</p>}
    </div>
  );
};

export default Login;
