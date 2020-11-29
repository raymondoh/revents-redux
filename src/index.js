import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.min.css";
import "react-calendar/dist/Calendar.css";
import "./style.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

// Store
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";

const store = configureStore();

console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
