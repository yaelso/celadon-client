import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { makeRoutes } from "./navigation/routes";
import { AppRouter } from './navigation/AppRouter'
import './index.css';
import { SnackbarProvider } from 'notistack';

const routes = makeRoutes();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter basename={routes.Root}>
      <SnackbarProvider
        preventDuplicate
        autoHideDuration={3000}
        maxSnack={3}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}>
        <AppRouter />
      </SnackbarProvider>
    </BrowserRouter>
  </React.StrictMode>
);
