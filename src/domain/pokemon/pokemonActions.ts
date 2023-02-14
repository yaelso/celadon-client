import { Pokemon } from 'pokenode-ts';
import { API_ROUTES } from '../../api/apiRoutes';
import { sendApiRequest } from '../../api/module';
import { CeladonPokemon } from './models';


export const fetchCeladonPokemon = (jwt: string) => sendApiRequest<undefined, CeladonPokemon[]>(
    {
      method:  'GET',
      url:     API_ROUTES().UserPokemon,
      headers: {
        'Authorization': `Bearer ${jwt}`,
      },
    },
);

export const fetchApiPokemon = (jwt: string) => sendApiRequest<undefined, Pokemon[]>(
    {
        method:  'GET',
        url:     API_ROUTES().UserPokemon,
        headers: {
        'Authorization': `Bearer ${jwt}`,
        },
    },
);
