import * as React from 'react';
import { Routes, Route } from "react-router-dom";
import { makeRoutes } from './routes';
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import About from "../pages/About";
import Profile from "../pages/Profile";
import Dashboard from "../pages/Dashboard";

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
      <Route path={routes.About} element={<About />} />
      <Route path={routes.Dashboard} element={<Dashboard />} />
      <Route path={routes.Profile} element={<Profile />} />
      <Route path={routes.Wildcard} element={<Home />} />
    </Routes>
  );
}
