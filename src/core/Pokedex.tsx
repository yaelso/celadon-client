import { Box, Breadcrumbs, CssBaseline, Divider, Grid, Link, Paper, Switch, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useLocalStorage } from '../applicationState/hooks';
import UserPokemon from '../domain/userPokemon/UserPokemon';
import { fetchUserPokemon } from '../domain/userPokemon/userPokemonActions';
import AppLayout from '../layout/AppLayout';
import { makeRoutes } from '../navigation/routes';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(4),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Pokedex: React.FC = () => {
  const routes = makeRoutes();

  const snackbar = useSnackbar();

  const [userPokemon, setUserPokemon] = useState(undefined);

  const [jwt, _] = useLocalStorage('authToken');

  // API callbacks
  const fetchAllUserPokemon = () => fetchUserPokemon(jwt)
    .then(data => setUserPokemon(data))
    .catch(() => snackbar.enqueueSnackbar('User Pokemon fetch failed!', { variant: 'error' }));

  return (
    <AppLayout>
      <CssBaseline />
      <Box>
        <Breadcrumbs sx={{ pt: 5 }}>
          <Link underline="hover" color="inherit" href={routes.Root}>
            Home
          </Link>
          <Link underline="hover" color="inherit" href={routes.Dashboard}>
            Dashboard
          </Link>
          <Typography color="text.primary">Pokedex</Typography>
        </Breadcrumbs>
      </Box>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ pt: 5, justifyContent: 'center' }}>
        {!!userPokemon?.length ? (userPokemon.map((pokemon) => (
          <UserPokemon
            key={`userPokemon-${userPokemon.id}`}
            name={userPokemon.name}
            weight={userPokemon.weight}
            height={userPokemon.height}
            exp={userPokemon.exp}
            level={userPokemon.level}
          />))) : "No current Pokemon!"}
      </Grid>
    </AppLayout>
  )
};

export default Pokedex;
