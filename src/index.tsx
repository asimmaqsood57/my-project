import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import "./i18n/i18n";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
