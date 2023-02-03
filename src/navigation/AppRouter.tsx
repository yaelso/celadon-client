import * as React from 'react';
import { Routes, Route } from "react-router-dom";
import { makeRoutes } from './routes';
import Home from "../Home";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import Profile from "../core/Profile";
import Dashboard from "../core/Dashboard";

/**
 * Controls top-level navigation for the app
 *
 * i.e. when you log in or click a link on the login page, this guy sends you where you need to go
 */

export const AppRouter: React.FC = () => {
  const routes = makeRoutes();

  return (
    <Routes>
      <Route path={routes.Login} element={<Login />} />
      <Route path={routes.Signup} element={<Signup />} />
      <Route path={routes.Dashboard} element={<Dashboard />} />
      <Route path={routes.Profile} element={<Profile />} />
      <Route path={routes.Wildcard} element={<Home />} />
    </Routes>
  );
}
