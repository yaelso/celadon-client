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
    .catch(() => snackbar.enqueueSnackbar('Categories fetch failed!'));

  const postNewCategory = () => postCategory(jwt)
    .then(data => setCategories(prev => {
      [data].concat(prev);
      snackbar.enqueueSnackbar('Category successfully created!');
    }))
    .catch(() => snackbar.enqueueSnackbar('Category creation failed!'));

  const deleteCategoryById = (id: number) => deleteCategory(jwt, id)
    .then(data => {
      console.log(data);
      snackbar.enqueueSnackbar('Category deleted');
    })
    .catch(() => snackbar.enqueueSnackbar('Category creation failed!'));

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
