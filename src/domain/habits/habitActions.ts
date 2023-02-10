// import axios from 'axios';
// import { Habit } from './models';
// import React from 'react';
// import { SuccessAction, ErrorAction, ResultAction } from '../../applicationState/types';


// const SUCCESS_KEY = 'FetchHabits';
// const ERROR_KEY   = 'FetchHabitsFailed';


// const fetchHabitsSuccessAction = (
//   habits: Habit[],
// ): SuccessAction<Habit[]> => ({
//   type: SUCCESS_KEY,
//   data: habits,
// });

// const fetchHabitsErrorAction = (error: any): ErrorAction => ({
//   type:  ERROR_KEY,
//   error: error,
// });

// const fetchHabits = (jwt: string) => axios.request<any, Habit[]>(
//   {
//     method:  'GET',
//     url:     'http://localhost:5000/habits',
//     headers: {
//       'Authorization': `Bearer ${jwt}`,
//     },
//   },
// );

// export const fetchHabitsHandler = (dispatch: React.Dispatch<ResultAction<Habit[]>>, jwt: string) =>
//   fetchHabits(jwt)
//     .then(result => dispatch(fetchHabitsSuccessAction(result)))
//     .catch(err => dispatch(fetchHabitsErrorAction(err)));

// export const fetchHabitsReducer = (
//   state: Habit[] | undefined,
//   action: ResultAction<Habit[]>,
// ): Habit[] | undefined => {
//   if (action.type === ERROR_KEY) {
//     const errorAction = action as ErrorAction;
//     console.log(errorAction.error);
//     return state;
//   }

//   const successAction = action as SuccessAction;

//   return successAction.data;
// };
