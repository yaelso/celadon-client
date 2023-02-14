import { Habit } from './models';
import { API_ROUTES } from '../../api/apiRoutes';
import { sendApiRequest } from '../../api/module';


export const fetchHabits = (jwt: string) => sendApiRequest<undefined, Habit[]>(
  {
    method:  'GET',
    url:     API_ROUTES().Habits,
    headers: {
      'Authorization': `Bearer ${jwt}`,
    },
  },
);

type PostRequestData = Pick<Habit, 'title'>;
export type PostHabitParams = PostRequestData;

export const postHabit = (jwt: string, requestBody: PostRequestData) => sendApiRequest<PostRequestData, Habit>(
  {
    method:  'POST',
    url: API_ROUTES().Habits,
    headers: {
      'Authorization': `Bearer ${jwt}`,
    },
    data: requestBody
  },
);


type PatchHabitRequestData = Pick<Habit, 'reps'>;
export type PatchHabitRequestParams = PatchHabitRequestData;

type PatchResponseBody = {
  habit: Habit;
}

export const patchHabitReps = (jwt: string, id: number, requestData: PatchHabitRequestData) => sendApiRequest<PatchHabitRequestData, PatchResponseBody>(
  {
    method: 'PATCH',
    url: API_ROUTES().Habits_UpdateReps(id),
    headers: {
      'Authorization': `Bearer ${jwt}`,
    },
    data: requestData
  }
)

type DeleteResponseBody = {
  details: string;
}

export const deleteHabit = (jwt: string, id: number) => sendApiRequest<undefined, DeleteResponseBody>(
  {
    method: 'DELETE',
    url: API_ROUTES().Habits_Delete(id),
    headers: {
      'Authorization': `Bearer ${jwt}`,
    }
  }
);
