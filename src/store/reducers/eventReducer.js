import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT, FETCH_EVENTS } from "../actionTypes";


const initialState = {
  events: []
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVENTS: 
    return {
      ...state,
      events: action.payload
      //events: [...action.payload]
    }
    case CREATE_EVENT:
      return {
        ...state,
        events: [...state.events, action.payload],
      };

    case UPDATE_EVENT:
      return {
        ...state,
        events: [
          ...state.events.filter((evt) => evt.id !== action.payload.id),
          action.payload,
        ],
      };
    case DELETE_EVENT:
      return {
        ...state,
        events: [...state.events.filter((evt) => evt.id !== action.payload)],
      };
    default:
      return state;
  }
};

export default eventReducer;
