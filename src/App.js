import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { USER_POSTS_FETCH_REQUESTED } from "./store/posts/actions";
import Counter from "./Counter";
import Login from "./Login";

function App() {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch({ type: USER_POSTS_FETCH_REQUESTED, payload: { userId: 1 } });
    dispatch({ type: USER_POSTS_FETCH_REQUESTED, payload: { userId: 1 } });
    dispatch({ type: USER_POSTS_FETCH_REQUESTED, payload: { userId: 1 } });
    dispatch({ type: USER_POSTS_FETCH_REQUESTED, payload: { userId: 1 } });
    dispatch({ type: USER_POSTS_FETCH_REQUESTED, payload: { userId: 1 } });
  };

  return (
    <div className="app container">
      <Counter />
      <Login />
      <Button type="button" variant="primary" onClick={handleClick}>
        Click
      </Button>
    </div>
  );
}

export default App;
