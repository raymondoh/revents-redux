import { combineReducers } from "redux";
import testReducer from "./testreducer";

import eventReducer from "./eventReducer";
import modalReducer from "./modalReducer";
import authReducer from "./authReducer";
import asyncReducer from "./asyncReducer";
import profileReducer from "./profileReducer";

const rootReducer = combineReducers({
  test: testReducer,
  events: eventReducer, // plural!
  modals: modalReducer,
  auth: authReducer,
  async: asyncReducer,
  profile: profileReducer,
});

export default rootReducer;
