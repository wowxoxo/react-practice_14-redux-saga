import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import {
  CHANGE_USERNAME,
  USER_POSTS_FETCH_CANCEL,
  USER_POSTS_FETCH_REQUESTED
} from "./store/posts/action-types";
import Counter from "./Counter";
import Login from "./Login";
import Uploader from "./Uploader";
import { Form } from "react-bootstrap";
import React from "react";
import { requestUserPosts } from "./store/posts/actions-creators";

function App() {
  const dispatch = useDispatch();
  const handleClick = () => {
    try {
      for (let dispatchId = 1; dispatchId <= 5; dispatchId++) {
        // dispatch({
        //   type: USER_POSTS_FETCH_REQUESTED,
        //   payload: { userId: 1, id: dispatchId }
        // });
        dispatch(requestUserPosts({ userId: 1, id: dispatchId }));
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleCancelClick = () => {
    dispatch({ type: USER_POSTS_FETCH_CANCEL });
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: CHANGE_USERNAME,
      payload: { username: event.target.value }
    });
  };

  return (
    <div className="app container">
      <Counter />
      <hr />
      <Login />
      <hr />
      <Button type="button" variant="primary" onClick={handleClick}>
        Click
      </Button>
      <Button type="button" variant="danger" onClick={handleCancelClick}>
        Cancel
      </Button>
      <hr />
      <Uploader />
      <hr />
      <Form.Control
        type="text"
        placeholder="Username"
        onChange={handleUsernameChange}
      />
    </div>
  );
}

export default App;
