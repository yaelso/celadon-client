import axios from 'axios';
import { Habit } from './models';
import { API_ROUTES } from '../../api/apiRoutes';


export const fetchHabits = (jwt: string) => axios.request<any, Habit[]>(
  {
    method:  'GET',
    url:     API_ROUTES().Habits,
    headers: {
      'Authorization': `Bearer ${jwt}`,
    },
  },
);

export const postHabit = (jwt: string) => axios.request<any, Habit>(
  {
    method:  'POST',
    url: API_ROUTES().Habits,
    headers: {
      'Authorization': `Bearer ${jwt}`,
    },
  },
);

type DeletePayload = {
  details: string;
}

export const deleteHabit = (jwt: string, id: number) => axios.request<any, DeletePayload>(
  {
    method: 'DELETE',
    url: API_ROUTES().Habits_Delete(id),
    headers: {
      'Authorization': `Bearer ${jwt}`,
    }
  }
);
