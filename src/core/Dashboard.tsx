import React, { useEffect, useState } from 'react';
import AppLayout from '../layout/AppLayout';
import { fetchCategories, postCategory, deleteCategory } from '../domain/categories/categoryActions';
import { useLocalStorage } from '../applicationState/hooks';
import { useSnackbar } from 'notistack';


const Dashboard: React.FC = (props) => {
  const snackbar = useSnackbar();

  const [categories, setCategories] = useState(undefined);

  const [jwt, _] = useLocalStorage('authToken');

  // API callbacks
  const fetchAllCategories = () => fetchCategories(jwt)
    .then(data => setCategories(data))
    .catch(() => snackbar.enqueueSnackbar('Categories fetch failed!', { variant: 'error' }));

  const postNewCategory = () => postCategory(jwt)
    .then(data => setCategories(prev => {
      [data].concat(prev);
      snackbar.enqueueSnackbar('Category successfully created!', { variant: 'success' });
    }))
    .catch(() => snackbar.enqueueSnackbar('Category creation failed!', { variant: 'error' }));

  const deleteCategoryById = (id: number) => deleteCategory(jwt, id)
    .then(data => {
      console.log(data);
      snackbar.enqueueSnackbar('Category deleted', { variant: 'success' });
    })
    .catch(() => snackbar.enqueueSnackbar('Category creation failed!', { variant: 'error' }));

  useEffect(
    () => {
      if (!categories) {
        fetchAllCategories();
      }
    },
    [],
  );

  return (
    <AppLayout>
      <div>Dashboard</div>
    </AppLayout>
  );
};

export default Dashboard;
