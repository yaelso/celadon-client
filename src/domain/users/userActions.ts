import { User } from './models';
import { API_ROUTES } from '../../api/apiRoutes';
import { sendApiRequest } from '../../api/module';


type PostResponseSuccessData = { user: User; }
type PostResponseFailureData = { details: string; }
type PostResponseData = PostResponseSuccessData | PostResponseFailureData;

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


type FetchResponseSuccessData = { user: User }
type FetchResponseFailureData = { details: string; }
type FetchResponseData = FetchResponseSuccessData | FetchResponseFailureData;

export const fetchCurrentUser = (jwt: string) => sendApiRequest<undefined, FetchResponseData>(
  {
    method:  'GET',
    url:     API_ROUTES().User_Current,
    headers: {
      'Authorization': `Bearer ${jwt}`,
    },
  },
);
