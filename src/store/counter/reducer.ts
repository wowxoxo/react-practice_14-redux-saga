
import { CounterActionType } from "./action-types";
import { CounterAction } from "./actions";

const initState = {
  counter: 0
};

export const counterReducer = (state = initState, action: CounterAction) => {
  switch (action.type) {
    case CounterActionType.INCREMENT:
      return { counter: state.counter + 1 };

    case CounterActionType.DECREMENT:
      return { counter: state.counter - 1 };

    default:
      return state;
  }
};
