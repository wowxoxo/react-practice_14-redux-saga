import { INCREMENT, DECREMENT } from "./actions";

const initState = {
  counter: 0
};

export const counterReducer = (state = initState, action) => {
  switch (action.type) {
    case INCREMENT:
      return { counter: state.counter + 1 };

    case DECREMENT:
      return { counter: state.counter - 1 };

    default:
      return state;
  }
};
