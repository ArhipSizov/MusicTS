import { BrowserRouter } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
import { Provider } from "react-redux";

import React from "react";
import ReactDOM from "react-dom/client";
import store from "./Services/store";
import firebase from "firebase/compat/app";
import App from "./App/App";
import firebaseConfig from "../firebaseConfig";

import "./Style/index.scss";
import "./Style/_vars.scss";

firebase.initializeApp(firebaseConfig);
initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
