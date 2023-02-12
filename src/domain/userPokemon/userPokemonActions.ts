import { UserPokemon } from './models';
import { API_ROUTES } from '../../api/apiRoutes';
import { sendApiRequest } from '../../api/module';


export const fetchUserPokemon = (jwt: string) => sendApiRequest<undefined, UserPokemon[]>(
  {
    method:  'GET',
    url:     API_ROUTES().UserPokemon,
    headers: {
      'Authorization': `Bearer ${jwt}`,
    },
  },
);

export const postUserPokemon = (jwt: string, pokemonId: number) => sendApiRequest<undefined, UserPokemon>(
  {
    method:  'POST',
    url: API_ROUTES().UserPokemon,
    headers: {
      'Authorization': `Bearer ${jwt}`,
    },
    params: {
      'pokemon_id': pokemonId
    }
  },
);
