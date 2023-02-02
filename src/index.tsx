import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { makeRoutes } from "./navigation/routes";
// import './index.css';

const routes = makeRoutes();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter basename={routes.Root} />
  </React.StrictMode>
);
