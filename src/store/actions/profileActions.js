import {
  LISTEN_TO_CURRENT_USER_PROFILE,
  LISTEN_TO_SELECTED_USER_PROFILE,
  LISTEN_TO_USER_PHOTOS,
} from "../actionTypes";

export const listenToCuurentUserProfile = (profile) => {
  return {
    type: LISTEN_TO_CURRENT_USER_PROFILE,
    payload: profile,
  };
};
export const listenToSelectedtUserProfile = (profile) => {
  return {
    type: LISTEN_TO_SELECTED_USER_PROFILE,
    payload: profile,
  };
};

export const listenToUserPhotos = (photos) => {
  return {
    type: LISTEN_TO_USER_PHOTOS,
    payload: photos,
  };
};
