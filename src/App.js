import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { USER_POSTS_FETCH_REQUESTED } from "./store/actions";

function App() {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch({ type: USER_POSTS_FETCH_REQUESTED, payload: 1 });
  };

  return (
    <div className="app">
      <Button type="button" variant="primary" onClick={handleClick}>
        Click
      </Button>
    </div>
  );
}

export default App;
