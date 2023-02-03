export type Routes = {
  Root: string;
  Login: string;
  Signup: string;
  Dashboard: string;
  Profile: string;
  Wildcard: string;
};

export const makeRoutes = (): Routes => ({
    Root: '/',
    Login: '/login',
    Signup: '/signup',
    Dashboard: '/dashboard',
    Profile: '/profile',
    Wildcard: '/*',
  }
);