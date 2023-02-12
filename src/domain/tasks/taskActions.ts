import { Task } from './models';
import { API_ROUTES } from '../../api/apiRoutes';
import { sendApiRequest } from '../../api/types';


export const fetchTasks = (jwt: string, checklistId: number) => sendApiRequest<undefined, Task[]>(
  {
    method:  'GET',
    url:     API_ROUTES().Tasks,
    headers: {
      'Authorization': `Bearer ${jwt}`,
    },
    params: {
      "checklist_id": checklistId,
    }
  },
);


/**
 * The object containing all the data params necessary to complete the POST request...
 */

type PostRequestData = Pick<Task, 'title' | 'checklist_id'>;
export type PostTaskParams = PostRequestData;

/**
 * ...and just the part that's going into the JSON body
 */

type PostRequestBody = Omit<PostRequestData, 'checklist_id'>;

export const postTask = (jwt: string, requestData: PostRequestData) => {
  const { checklist_id, ...requestBody } = requestData;

  return sendApiRequest<PostRequestBody, Task>(
    {
      method:  'POST',
      url: API_ROUTES().Tasks,
      headers: {
        'Authorization': `Bearer ${jwt}`,
      },
      data: requestBody,
      params: {
        "checklist_id": checklist_id,
      },
    },
  )
};

type DeleteResponseBody = {
  details: string;
}

export const deleteTask = (jwt: string, id: number) => sendApiRequest<undefined, DeleteResponseBody>(
  {
    method: 'DELETE',
    url: API_ROUTES().Tasks_Delete(id),
    headers: {
      'Authorization': `Bearer ${jwt}`,
    },
  }
)
