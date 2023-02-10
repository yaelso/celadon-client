import axios from 'axios';
import { Category } from './models';
import React from 'react';
import { SuccessAction, ErrorAction, ResultAction } from '../../applicationState/types';
import { API_ROUTES } from '../../api/apiRoutes';


const SUCCESS_KEY = 'PostCategory';
const ERROR_KEY   = 'PostCategoryFailed';

type RequestBody = Pick<Category, 'title' | 'description'>;


const postCategorySuccessAction = (
  category: Category,
): SuccessAction<Category> => ({
  type: SUCCESS_KEY,
  data: category,
});

const postCategoryErrorAction = (error: any): ErrorAction => ({
  type: ERROR_KEY,
  error: error,
});

const postCategory = (jwt: string, requestBody: RequestBody) => axios.request<RequestBody, Category>(
  {
    method: 'POST',
    url: API_ROUTES().Categories,
    headers: {
      'Authorization': `Bearer ${jwt}`,
    },
    data: requestBody,
  },
);

export const postCategoryHandler = (dispatch: React.Dispatch<ResultAction<Category>>, jwt: string, requestBody: RequestBody) =>
  postCategory(jwt, requestBody)
    .then(result => dispatch(postCategorySuccessAction(result)))
    .catch(err => dispatch(postCategoryErrorAction(err)));

export const postCategoryReducer = (
  state: Category | undefined,
  action: ResultAction<Category>,
  onSuccess: () => void,
  onError: () => void,
): Category | undefined => {
  if (action.type === ERROR_KEY) {
    const errorAction = action as ErrorAction;
    console.log(errorAction.error);
    onError();
    return state;
  }

  onSuccess();

  const successAction = action as SuccessAction;

  return successAction.data;
};
