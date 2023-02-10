import axios from 'axios';
import { Checklist } from './models';
import { API_ROUTES } from '../../api/apiRoutes';


export const fetchChecklists = (jwt: string) => axios.request<any, Checklist[]>(
  {
    method:  'GET',
    url:     API_ROUTES().Checklists,
    headers: {
      'Authorization': `Bearer ${jwt}`,
    },
    params: {

    }
  },
);

export const fetchArchivedChecklists = (jwt: string) => axios.request<any, Checklist[]>(
  {
    method:  'GET',
    url:     API_ROUTES().Checklists_GetArchived,
    headers: {
      'Authorization': `Bearer ${jwt}`,
    }
  },
);

export const postChecklist = (jwt: string) => axios.request<any, Checklist>(
  {
    method:  'POST',
    url: API_ROUTES().Checklists,
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

export const deleteChecklist = (jwt: string, id: number) => axios.request<any, DeletePayload>(
  {
    method: 'DELETE',
    url: API_ROUTES().Checklists_Delete(id),
    headers: {
      'Authorization': `Bearer ${jwt}`,
    }
  }
)
