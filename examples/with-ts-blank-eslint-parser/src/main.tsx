import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

const root = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

ReactDOM.createRoot(document.querySelector("#root")!).render(root);
