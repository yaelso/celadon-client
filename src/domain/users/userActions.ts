import { User } from './models';
import { API_ROUTES } from '../../api/apiRoutes';
import { sendApiRequest } from '../../api/module';

type PostResponseData = { user: User; }

export const postUser = (jwt: string) => {
  return sendApiRequest<undefined, PostResponseData>(
    {
      method:  'POST',
      url: API_ROUTES().User,
      headers: {
        'Authorization': `Bearer ${jwt}`,
      },
    }
  );
};


export const fetchUsers = (jwt: string) => sendApiRequest<undefined, User[]>(
  {
    method:  'GET',
    url:     API_ROUTES().User,
    headers: {
      'Authorization': `Bearer ${jwt}`,
    },
  },
);
