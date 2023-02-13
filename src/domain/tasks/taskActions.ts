import { Task } from './models';
import { API_ROUTES } from '../../api/apiRoutes';
import { sendApiRequest } from '../../api/module';


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

type DueDateFetchRequestData = Pick<Task, 'due_date'>;
export type TaskWithDueDateFetchParams = DueDateFetchRequestData;

export const fetchTasksWithDueDate = (jwt: string, dueDate: DueDateFetchRequestData) => sendApiRequest<undefined, Task[]>(
  {
    method:  'GET',
    url:     API_ROUTES().Tasks_DueDate,
    headers: {
      'Authorization': `Bearer ${jwt}`,
    },
    params: {
      "due_date": dueDate,
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
type PostResponseBody = { task: Task; };

export const postTask = (jwt: string, requestData: PostRequestData) => {
  const { checklist_id, ...requestBody } = requestData;

  return sendApiRequest<PostRequestBody, PostResponseBody>(
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

type PatchResponseBody = {
  task: Task;
}

export const markTaskInProgress = (jwt: string, id: number) => sendApiRequest<undefined, PatchResponseBody>(
  {
    method: 'PATCH',
    url: API_ROUTES().Tasks_MarkInProgress(id),
    headers: {
      'Authorization': `Bearer ${jwt}`,
    }
  }
)

export const markTaskNotInProgress = (jwt: string, id: number) => sendApiRequest<undefined, PatchResponseBody>(
  {
    method: 'PATCH',
    url: API_ROUTES().Tasks_MarkNotInProgress(id),
    headers: {
      'Authorization': `Bearer ${jwt}`,
    }
  }
)

export const markTaskComplete = (jwt: string, id: number) => sendApiRequest<undefined, PatchResponseBody>(
  {
    method: 'PATCH',
    url: API_ROUTES().Tasks_MarkComplete(id),
    headers: {
      'Authorization': `Bearer ${jwt}`,
    }
  }
)

export const markTaskIncomplete = (jwt: string, id: number) => sendApiRequest<undefined, PatchResponseBody>(
  {
    method: 'PATCH',
    url: API_ROUTES().Tasks_MarkIncomplete(id),
    headers: {
      'Authorization': `Bearer ${jwt}`,
    }
  }
)

type PatchDueDateRequestData = Pick<Task, 'due_date'>;
export type PatchDueDateRequestParams = PatchDueDateRequestData;

export const setTaskDueDate = (jwt: string, id: number, requestData: PatchDueDateRequestData) => sendApiRequest<PatchDueDateRequestData, PatchResponseBody>(
  {
    method: 'PATCH',
    url: API_ROUTES().Tasks_SetDueDate(id),
    headers: {
      'Authorization': `Bearer ${jwt}`,
    },
    data: requestData,
  }
)

export const clearTaskDueDate = (jwt: string, id: number) => sendApiRequest<undefined, PatchResponseBody>(
  {
    method: 'PATCH',
    url: API_ROUTES().Tasks_ClearDueDate(id),
    headers: {
      'Authorization': `Bearer ${jwt}`,
    }
  }
)

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
