import axios from 'axios';
import { Task } from './models';
import { API_ROUTES } from '../../api/apiRoutes';


export const fetchTasks = (jwt: string) => axios.request<any, Task[]>(
  {
    method:  'GET',
    url:     API_ROUTES().Tasks,
    headers: {
      'Authorization': `Bearer ${jwt}`,
    },
    params: {

    }
  },
);

export const postTask = (jwt: string) => axios.request<any, Task>(
  {
    method:  'POST',
    url: API_ROUTES().Tasks,
    headers: {
      'Authorization': `Bearer ${jwt}`,
    },
    params: {

    }
  },
);

type DeletePayload = {
  details: string;
}

export const deleteTask = (jwt: string, id: number) => axios.request<any, DeletePayload>(
  {
    method: 'DELETE',
    url: API_ROUTES().Tasks_Delete(id),
    headers: {
      'Authorization': `Bearer ${jwt}`,
    },
    params: {

    }
  }
)
