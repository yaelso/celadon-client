export type Routes = {
  Root: string;
  Login: string;
  Signup: string;
  About: string;
  Dashboard: string;
  Profile: string;
  Wildcard: string;
};

export const makeRoutes = (): Routes => ({
    Root: '/',
    Login: '/login',
    Signup: '/signup',
    About: '/about',
    Dashboard: '/dashboard',
    Profile: '/profile',
    Wildcard: '/*',
  }
);
