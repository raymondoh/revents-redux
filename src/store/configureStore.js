import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "./reducers";
import { verifyAuth } from "./actions/authActions";

const configureStore = () => {
  const middleware = [thunk, logger];
  const composedEnhancer = composeWithDevTools(applyMiddleware(...middleware));
  const store = createStore(rootReducer, composedEnhancer);
  store.dispatch(verifyAuth());

  return store;
};

export default configureStore;
