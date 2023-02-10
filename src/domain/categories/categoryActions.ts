import axios from 'axios';
import { Category } from './models';
import { API_ROUTES } from '../../api/apiRoutes';


export const fetchCategories = (jwt: string) => axios.request<any, Category[]>(
  {
    method:  'GET',
    url:     API_ROUTES().Categories,
    headers: {
      'Authorization': `Bearer ${jwt}`,
    },
  },
);

export const postCategory = (jwt: string) => axios.request<any, Category>(
  {
    method:  'POST',
    url: API_ROUTES().Categories,
    headers: {
      'Authorization': `Bearer ${jwt}`,
    },
  },
);

type DeletePayload = {
  details: string;
}

export const deleteCategory = (jwt: string, id: number) => axios.request<any, DeletePayload>(
  {
    method: 'DELETE',
    url: API_ROUTES().Categories_Delete(id),
    headers: {
      'Authorization': `Bearer ${jwt}`,
    }
  }
)
