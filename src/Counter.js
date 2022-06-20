import React from "react";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { INCREMENT, DECREMENT, INCREMENT_ASYNC } from "./store/counter/action-types";

const Counter = () => {
  const counter = useSelector((state) => state.counter.counter);
  const dispatch = useDispatch();

  const onIncrementHandler = () => {
    dispatch({ type: INCREMENT });
  };

  const onIncrementAsyncHandler = () => {
    dispatch({ type: INCREMENT_ASYNC });
  };

  const onDecrementHandler = () => {
    dispatch({ type: DECREMENT });
  };

  return (
    <div>
      {counter}
      <br />
      <Button type="button" variant="primary" onClick={onIncrementHandler}>
        Increment
      </Button>
      <Button type="button" variant="primary" onClick={onIncrementAsyncHandler}>
        Increment async
      </Button>
      <br />
      <Button type="button" variant="primary" onClick={onDecrementHandler}>
        Decrement
      </Button>
    </div>
  );
};

export default Counter;
