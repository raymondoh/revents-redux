import { INCREMENT, DECREMENT } from "../actionTypes";

const initialState = {
  data: 42,
};


const testReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case INCREMENT:
      return {
        ...state,
        data: state.data + payload,
      };

    case DECREMENT:
      return {
        ...state,
        data: state.data - payload,
      };
    default:
      return state;
  }
};

export default testReducer;
