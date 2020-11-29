import {
  ASYNC_ACTION_START,
  ASYNC_ACTION_FINISH,
  ASYNC_ACTION_ERROR,
  APP_LOADED,
} from "../actionTypes";

const initialState = {
  loading: false,
  error: null,
  initialised: false,
};

const asyncReducer = (state = initialState, action) => {
  switch (action.type) {
    case ASYNC_ACTION_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ASYNC_ACTION_FINISH:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case ASYNC_ACTION_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case APP_LOADED:
      return {
        ...state,
        initialised: true,
      };

    default:
      return state;
  }
};

export default asyncReducer;
