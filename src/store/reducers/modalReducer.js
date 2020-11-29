import { OPEN_MODAL, CLOSE_MODAL } from "../actionTypes";

const initialState = null;

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      const { modalType, modalProps } = action.payload;
      return {
        modalType,
        modalProps,
      };
    case CLOSE_MODAL:
      return null;
    default:
      return state;
  }
};

export default modalReducer;
