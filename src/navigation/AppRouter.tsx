import * as React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { makeRoutes } from './routes';
import Home from "../Home";
import Profile from "../core/Profile";
import Dashboard from "../core/Dashboard";
import Pokedex from '../core/Pokedex';
import Archive from '../core/Archive';

/**
 * Controls top-level navigation for the app
 *
 * i.e. when you log in or click a link on the login page, this guy sends you where you need to go
 */

export const AppRouter: React.FC = () => {
  const routes = makeRoutes();

  return (
    <Routes>
      <Route path={routes.Dashboard} element={<Dashboard />} />
      <Route path={routes.Profile} element={<Profile />} />
      <Route path={routes.Pokedex} element={<Pokedex />} />
      <Route path={routes.Archive} element={<Archive />} />
      <Route path={routes.Root} element={<Home />} />
      <Route path={routes.Wildcard} element={<Navigate to={routes.Root} replace />} />
    </Routes>
  );
}
