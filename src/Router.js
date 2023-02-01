import { Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
// import Profile from './pages/Profile';
import NotFound from "./pages/404";
// import Layout from './components/Layout';

// const MainLayout = () => {
//     <Layout>
//         <Outlet />
//     </Layout>
// }

export const routes = [
  {
    element: <Home />,
    path: "/",
  },
  {
    element: <Login />,
    path: "/login",
  },
  {
    element: <Signup />,
    path: "/signup",
  },
  {
    element: <About />,
    path: "/about",
  },
  {
    path: "/404",
    element: <NotFound />,
  },
  {
    path: "*",
    element: <Navigate to="/404" replace />,
  },
];
