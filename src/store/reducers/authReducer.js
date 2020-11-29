import { SIGN_IN_USER, SIGN_OUT_USER } from "../actionTypes";

const initialState = {
  authenticated: false, //this is default
  currentUser: null,
  // authenticated: true,
  // currentUser: {
  //   email: "bob@bob.com",
  //   password: "dkdkddrfrf",
  // },
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_USER:
      return {
        ...state,
        authenticated: true,
        currentUser: {
          email: action.payload.email,
          photoURL: action.payload.photoURL,
          uid: action.payload.uid,
          displayName: action.payload.displayName,
          providerId: action.payload.providerData[0].providerId,
        },
      };

    case SIGN_OUT_USER:
      return {
        ...state,
        authenticated: false,
        currentUser: null,
      };
    default:
      return state;
  }
};

export default authReducer;
