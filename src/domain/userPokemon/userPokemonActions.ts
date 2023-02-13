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

type PatchExpRequestData = { exp: number, pokemon_id: number };
export type PatchPokmeonExpRequestParams = PatchExpRequestData;

type PatchExpRequestBody = Pick<PatchExpRequestData, 'exp'>;
type PatchExpResponseBody = { 'user pokemon': UserPokemon };

export const addExpToPokemon = (
  jwt: string,
  params: PatchExpRequestData,
) => {
  const { pokemon_id, ...requestBody } = params;

  return sendApiRequest<PatchExpRequestBody, PatchExpResponseBody>(
    {
      method:  'PATCH',
      url:     API_ROUTES().UserPokemon_AddExp(pokemon_id),
      headers: {
        'Authorization': `Bearer ${jwt}`,
      },
      data: requestBody,
    },
  );
};
