import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import React from "react";

import "./index.css";

import { UserProvider } from "./utils/context/UserContext";
import { App } from "./App";
import { PostContextProvider } from "./utils/context/PostContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <UserProvider>
      <PostContextProvider>
        <App />
      </PostContextProvider>
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
