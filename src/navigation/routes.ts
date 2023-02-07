export type Routes = {
  Root: string;
  Dashboard: string;
  Profile: string;
  Pokedex: string;
  Archive: string;
  Wildcard: string;
};

export const makeRoutes = (): Routes => ({
    Root: '/',
    Dashboard: '/dashboard',
    Profile: '/profile',
    Pokedex: '/pokedex',
    Archive: '/archive',
    Wildcard: '/*',
  }
);
