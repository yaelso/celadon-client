import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useLocalStorage } from '../applicationState/hooks';
import { fetchUserPokemon } from '../domain/userPokemon/userPokemonActions';
import AppLayout from '../layout/AppLayout';

const Pokedex: React.FC = () => {
  const snackbar = useSnackbar();

  const [userPokemon, setUserPokemon] = useState(undefined);

  const [jwt, _] = useLocalStorage('authToken');

  // API callbacks
  const fetchAllUserPokemon = () => fetchUserPokemon(jwt)
    .then(data => setUserPokemon(data))
    .catch(() => snackbar.enqueueSnackbar('User Pokemon fetch failed!', { variant: 'error' }));

  return (
    <AppLayout>
      <div>Pokedex</div>
    </AppLayout>
  )
};

export default Pokedex;
