import { OPEN_MODAL, CLOSE_MODAL } from "../actionTypes";

export const openModal = (payload) => {
  return {
    type: OPEN_MODAL,
    payload: payload,
  };
};

export const closeModal = (payload) => {
  return {
    type: CLOSE_MODAL,
    payload: payload,
  };
};
