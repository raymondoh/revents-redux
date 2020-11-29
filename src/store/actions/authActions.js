import { APP_LOADED, SIGN_IN_USER, SIGN_OUT_USER } from "../actionTypes";
import firebase from "../../config/firebaseConfig";
import {
  dataFromSnapshot,
  getUserProfile,
} from "../../firestore/firestoreService";
import { listenToCuurentUserProfile } from "./profileActions";

export const signInUser = (user) => {
  return {
    type: SIGN_IN_USER,
    payload: user,
  };
};

// export const signInUser = (creds) => async (dispatch) => {
//   try {
//     const response = await firebase
//       .auth()
//       .signInWithEmailAndPassword(creds.email, creds.password);
//     dispatch({ type: SIGN_IN_USER, payload: response.user });
//   } catch (error) {
//     throw error;
//   }
// };

export const signOutUser = () => {
  return {
    type: SIGN_OUT_USER,
    payload: null,
  };
};

export const verifyAuth = (formvalues) => {
  return (dispatch) => {
    return firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //dispatch({ type: SIGN_IN_USER, payload: user });
        dispatch(signInUser(user));
        const profileRef = getUserProfile(user.uid);
        profileRef.onSnapshot((snapshot) => {
          dispatch(listenToCuurentUserProfile(dataFromSnapshot(snapshot)));
          dispatch({ type: APP_LOADED });
        });
      } else {
        //dispatch(signOutUser())
        dispatch({ type: SIGN_OUT_USER });
        dispatch({ type: APP_LOADED });
      }
    });
  };
};
