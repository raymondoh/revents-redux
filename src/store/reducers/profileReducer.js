import {
  LISTEN_TO_CURRENT_USER_PROFILE,
  LISTEN_TO_SELECTED_USER_PROFILE,
} from "../actionTypes";

const initialState = {
  currentUserProfile: null,
  selectedUserProfile: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case LISTEN_TO_CURRENT_USER_PROFILE:
      return {
        ...state,
        currentUserProfile: action.payload,
      };
    case LISTEN_TO_SELECTED_USER_PROFILE:
      return {
        ...state,
        selectedUserProfile: action.payload,
      };

    default:
      return state;
  }
};

export default profileReducer;
