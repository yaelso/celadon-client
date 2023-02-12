import { Category } from './models';
import { API_ROUTES } from '../../api/apiRoutes';
import { sendApiRequest } from '../../api/module';


export const fetchCategories = (jwt: string) => sendApiRequest<undefined, Category[]>(
  {
    method:  'GET',
    url:     API_ROUTES().Categories,
    headers: {
      'Authorization': `Bearer ${jwt}`,
    },
  },
);

type PostRequestData = Pick<Category, 'title' | 'description'>
export type PostCategoryParams = PostRequestData;

export const postCategory = (jwt: string, requestBody: PostRequestData) => sendApiRequest<PostRequestData, Category>(
  {
    method:  'POST',
    url: API_ROUTES().Categories,
    headers: {
      'Authorization': `Bearer ${jwt}`,
    },
    data: requestBody,
  },
);

type DeleteResponseBody = {
  details: string;
}

export const deleteCategory = (jwt: string, id: number) => sendApiRequest<undefined, DeleteResponseBody>(
  {
    method: 'DELETE',
    url: API_ROUTES().Categories_Delete(id),
    headers: {
      'Authorization': `Bearer ${jwt}`,
    }
  }
)
