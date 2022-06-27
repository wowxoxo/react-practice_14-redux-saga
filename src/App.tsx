import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
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
import { AppState } from "./store";
import { getUserPostsSelector } from "./store/selectors";

function App() {
  console.log("RERENDER");
  const dispatch = useDispatch();
  // const posts = useSelector((state: AppState) => state.posts.posts);
  const posts = useSelector(getUserPostsSelector);
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
      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li>{post.title}</li>
        ))}
      </ul>
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
