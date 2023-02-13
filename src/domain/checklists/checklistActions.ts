import { Checklist } from './models';
import { API_ROUTES } from '../../api/apiRoutes';
import { sendApiRequest } from '../../api/module';


export const fetchChecklists = (jwt: string, categoryId: number) => sendApiRequest<undefined, Checklist[]>(
  {
    method:  'GET',
    url:     API_ROUTES().Checklists,
    headers: {
      'Authorization': `Bearer ${jwt}`,
    },
    params: {
      "category_id": categoryId,
    }
  },
);

export const fetchArchivedChecklists = (jwt: string) => sendApiRequest<undefined, Checklist[]>(
  {
    method:  'GET',
    url:     API_ROUTES().Checklists_GetArchived,
    headers: {
      'Authorization': `Bearer ${jwt}`,
    }
  },
);

export const fetchFavorites = (jwt: string) => sendApiRequest<undefined, Checklist[]>(
  {
    method:  'GET',
    url:     API_ROUTES().Checklists_GetFavorites,
    headers: {
      'Authorization': `Bearer ${jwt}`,
    }
  },
);

/**
 * The object containing all the data params necessary to complete the POST request...
 */

type PostRequestData = Pick<Checklist, 'title' | 'description' | 'category_id'>;
export type PostChecklistParams = PostRequestData;

/**
 * ...and just the part that's going into the JSON body
 */

type PostRequestBody = Omit<PostRequestData, 'category_id'>;
type PostResponseData = { checklist: Checklist; };

export const postChecklist = (jwt: string, requestData: PostRequestData) => {
  const { category_id, ...requestBody } = requestData;

  return sendApiRequest<PostRequestBody, PostResponseData>(
    {
      method:  'POST',
      url: API_ROUTES().Checklists,
      headers: {
        'Authorization': `Bearer ${jwt}`,
      },
      data: requestBody,
      params: {
        "category_id": category_id,
      },
    }
  );
};

// TODO: patch checklist (archive/unarchive)
// TODO: patch checklist (favorite/unfavorite)


type DeleteResponseBody = {
  details: string;
}

export const deleteChecklist = (jwt: string, id: number) => sendApiRequest<undefined, DeleteResponseBody>(
  {
    method: 'DELETE',
    url: API_ROUTES().Checklists_Delete(id),
    headers: {
      'Authorization': `Bearer ${jwt}`,
    }
  }
)
