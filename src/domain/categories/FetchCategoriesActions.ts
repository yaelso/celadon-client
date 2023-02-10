import axios from 'axios';
import { Category } from './models';
import React from 'react';
import { SuccessAction, ErrorAction, ResultAction } from '../../applicationState/types';


const SUCCESS_KEY = 'FetchCategories';
const ERROR_KEY   = 'FetchCategoriesFailed';


const fetchCategoriesSuccessAction = (
  categories: Category[],
): SuccessAction<Category[]> => ({
  type: SUCCESS_KEY,
  data: categories,
});

const fetchCategoriesErrorAction = (error: any): ErrorAction => ({
  type:  ERROR_KEY,
  error: error,
});

const fetchCategories = (jwt: string) => axios.request<any, Category[]>(
  {
    method:  'GET',
    url:     'http://localhost:5000/categories',
    headers: {
      'Authorization': `Bearer ${jwt}`,
    },
  },
);

export const fetchCategoriesHandler = (dispatch: React.Dispatch<ResultAction<Category[]>>, jwt: string) =>
  fetchCategories(jwt)
    .then(result => dispatch(fetchCategoriesSuccessAction(result)))
    .catch(err => dispatch(fetchCategoriesErrorAction(err)));

export const fetchCategoriesReducer = (
  state: Category[] | undefined,
  action: ResultAction<Category[]>,
): Category[] | undefined => {
  if (action.type === ERROR_KEY) {
    const errorAction = action as ErrorAction;
    console.log(errorAction.error);
    return state;
  }

  const successAction = action as SuccessAction;

  return successAction.data;
};
