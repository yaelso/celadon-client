import { Box, Breadcrumbs, CssBaseline, Grid, Link, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useLocalStorage } from '../applicationState/hooks';
import { UserPokemon, PokemonViewModel } from '../domain/userPokemon/models';
import UserPokemonItem from '../domain/userPokemon/UserPokemonItem';
import { fetchUserPokemon, postUserPokemon } from '../domain/userPokemon/userPokemonActions';
import AppLayout from '../layout/AppLayout';
import { makeRoutes } from '../navigation/routes';
import { PokemonClient, Pokemon } from 'pokenode-ts';
import { PatchActivePokemonRequestParams, updateActivePokemon } from '../domain/users/userActions';


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
  const [jwt, _] = useLocalStorage('authToken');

  const [userPokemon, setUserPokemon] = useState<UserPokemon[] | undefined>(undefined);
  const [pokeNodePokemon, setPokenodePokemon] = useState<Pokemon[] | undefined>(undefined);
  const [activePokemonId, setActivePokemonId] = useState<number | undefined>(undefined);

  const addPokenodePokemon = useCallback(
    (pk: Pokemon) => setPokenodePokemon(prev => (prev ?? []).concat([pk])),
    [setPokenodePokemon],
  );

  const pokemonViewModels: PokemonViewModel[] = useMemo(
    () => (userPokemon ?? []).map(pk => {
      const pokeNodeObj = (pokeNodePokemon ?? []).find(p => p.name == pk.pokemon.name.toLowerCase());

      return {
        id: pk.pokemon_id,
        exp: pk.exp,
        name: pokeNodeObj?.name ?? '',
        weight: pokeNodeObj?.weight ?? 0,
        height: pokeNodeObj?.height ?? 0,
        sprite: pokeNodeObj?.sprites?.front_default ?? '',
        types: pokeNodeObj?.types ?? [],
      };
    }),
    [pokeNodePokemon, userPokemon],
  );
  console.log(pokemonViewModels);

  const pokeNodeApi = useMemo(() => new PokemonClient(), []);

  // API callbacks
  const fetchAllUserPokemon = useCallback(
    () => {
      fetchUserPokemon(jwt)
        .then(res => {
          const userPokeObjs = res.data;

          setUserPokemon(userPokeObjs);
        })
        .catch(() => snackbar.enqueueSnackbar('User Pokemon fetch failed!', { variant: 'error' }));
    },
    [jwt, snackbar],
  );

  const fetchPokeNodeData = useCallback(
    (pokemonName: string) => {
      pokeNodeApi.getPokemonByName(pokemonName.toLowerCase())
        .then(pk => addPokenodePokemon(pk))
        .catch(
          err => snackbar
            .enqueueSnackbar(
              'An error occurred while fetching your Pokemon data - please try again later!',
              { variant: 'error' },
            ),
        );
    },
    [addPokenodePokemon, pokeNodeApi, snackbar],
  );

  const designateActivePokemon = useCallback(
    (params: PatchActivePokemonRequestParams) => updateActivePokemon(jwt, params)
      .then(res => {
        const newActivePokemon = res.data.user.active_pokemon_id;

        setActivePokemonId(newActivePokemon);
        snackbar.enqueueSnackbar('New Pokemon active!', { variant: 'success' });
      })
      .catch(() => snackbar.enqueueSnackbar('Active Pokemon update attempt failed!', { variant: 'error' })),
    [jwt, snackbar],
  );

  useEffect(fetchAllUserPokemon, []);

  useEffect(
    () => {
      const pokemonNames = (userPokemon ?? []).map(p => p.pokemon.name);
      pokemonNames.forEach((name) => fetchPokeNodeData(name));
    },
    [userPokemon],
  );

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
        {
          !!pokemonViewModels?.length
            ? (pokemonViewModels.map(
              (pokemon) => (
                <UserPokemonItem
                  key={`userPokemon-${pokemon.id}`}
                  {...pokemon}
                />))
            )
            : <span>'No current Pokemon!'</span>
        }
      </Grid>
    </AppLayout>
  )
};

export default Pokedex;
