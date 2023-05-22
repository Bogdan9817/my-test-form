import React from "react";
import ReactDOM from "react-dom/client";
import Form from "./form/Form";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./index.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Form />
    </Provider>
  </React.StrictMode>
);
