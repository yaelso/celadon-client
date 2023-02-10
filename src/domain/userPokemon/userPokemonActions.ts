import axios from 'axios';
import { UserPokemon } from './models';
import { API_ROUTES } from '../../api/apiRoutes';


export const fetchUserPokemon = (jwt: string) => axios.request<any, UserPokemon[]>(
  {
    method:  'GET',
    url:     API_ROUTES().UserPokemon,
    headers: {
      'Authorization': `Bearer ${jwt}`,
    },
  },
);

export const postUserPokemon = (jwt: string) => axios.request<any, UserPokemon>(
  {
    method:  'POST',
    url: API_ROUTES().UserPokemon,
    headers: {
      'Authorization': `Bearer ${jwt}`,
    },
  },
);

type DeletePayload = {
  details: string;
}

export const deleteChecklist = (jwt: string, id: number) => axios.request<any, DeletePayload>(
  {
    method: 'DELETE',
    url: API_ROUTES().Checklists_Delete(id),
    headers: {
      'Authorization': `Bearer ${jwt}`,
    }
  }
)
