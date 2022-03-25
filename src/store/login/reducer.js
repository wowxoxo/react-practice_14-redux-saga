import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  STOP_LOGIN_LOADING,
  LOGOUT
} from "./actions";

const initState = {
  token: null,
  error: null,
  isLoading: false
};

export const loginReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }

    case LOGIN_ERROR: {
      return { ...state, isLoading: false, error: action.payload.error };
    }

    case LOGIN_SUCCESS: {
      return { ...state, isLoading: false, token: action.payload.token };
    }

    case STOP_LOGIN_LOADING: {
      return { ...state, isLoading: false };
    }

    case LOGOUT: {
      return { ...state, token: null, error: null };
    }

    default:
      return state;
  }
};
