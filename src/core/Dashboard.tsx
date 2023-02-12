import AddIcon from '@mui/icons-material/Add';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Breadcrumbs, Button, Checkbox, Divider, Fab, Grid, IconButton, Link, List, ListItem, ListItemText, Paper, TextField, Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip/Tooltip';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useLocalStorage } from '../applicationState/hooks';
import Categories from '../domain/categories/CategoryItem';
import { deleteCategory, fetchCategories, postCategory, PostCategoryParams } from '../domain/categories/categoryActions';
import { Category } from '../domain/categories/models';
import PostCategoryFormDialog from '../domain/categories/PostCategoryFormDialog';
import { postChecklist, PostChecklistParams } from '../domain/checklists/checklistActions';
import { Checklist } from '../domain/checklists/models';
import MoreChecklistContextMenu from '../domain/checklists/MoreChecklistContextMenu';
import PostChecklistFormDialog from '../domain/checklists/PostChecklistFormDialog';
import MoreTaskContextMenu from '../domain/tasks/MoreTaskContextMenu';
import { postTask, PostTaskParams } from '../domain/tasks/taskActions';
import AppLayout from '../layout/AppLayout';
import { makeRoutes } from '../navigation/routes';
import CategoryItem from '../domain/categories/CategoryItem';
import { postUser } from '../domain/users/userActions';


const Dashboard: React.FC = (props) => {
  const routes = makeRoutes();
  const snackbar = useSnackbar();

  const [user, setUser] = useState(undefined);

  const postNewUser = () => postUser(jwt)
    .then(res => setUser(prev => {
      [res.data].concat(prev);
      snackbar.enqueueSnackbar('User successfully created!', { variant: 'success' });
    }))
    .catch(() => snackbar.enqueueSnackbar('User creation failed!', { variant: 'error' }));

  // const [checklists, setChecklists] = useState(undefined);
  // const [tasks, setTasks] = useState(undefined);
  const [habits, setHabits] = useState(undefined);

  const [jwt, _] = useLocalStorage('authToken');

  // Anchors
  // const [checklistAnchorEl, setChecklistAnchorEl] = React.useState<null | HTMLElement>(null);
  // const openChecklist = Boolean(checklistAnchorEl);

  const [taskAnchorEl, setTaskAnchorEl] = React.useState<null | HTMLElement>(null);
  const openTask = Boolean(taskAnchorEl);

  // region Category Bits

  const [categories, setCategories] = useState<Category[] | undefined>(undefined);

  // Params for a category to be posted, if user opens POST form
  const [categoryTitle, setCategoryTitle] = useState<string | undefined>();
  const [categoryDesc, setCategoryDesc] = useState<string | undefined>();

  const [createCategoryOpen, setCreateCategoryOpen] = useState(false);

  const fetchAllCategories = () => fetchCategories(jwt)
    .then(res => setCategories(res.data))
    .catch(() => snackbar.enqueueSnackbar('Categories fetch failed!', { variant: 'error' }));

  const postNewCategory = (params: PostCategoryParams) => postCategory(jwt, params)
    .then(res => {
      setCategories(prev => [res.data.category].concat(prev));
      snackbar.enqueueSnackbar('Category successfully created!', { variant: 'success' });
    })
    .catch(() => snackbar.enqueueSnackbar('Category creation failed!', { variant: 'error' }));

  const deleteCategoryById = (id: number) => deleteCategory(jwt, id)
    .then(res => {
      console.log(res.data);
      snackbar.enqueueSnackbar('Category deleted', { variant: 'success' });
    })
    .catch(() => snackbar.enqueueSnackbar('Category creation failed!', { variant: 'error' }));

  const handleCreateCategoryOpen = () => {
    setCreateCategoryOpen(true);
  };

  const handleCreateCategoryClose = () => {
    setCreateCategoryOpen(false);
  };

  const handleCreateCategorySubmit = () => {
    postNewCategory({ title: categoryTitle ?? '', description: categoryDesc ?? '' });
    setCreateCategoryOpen(false);
  }

  // endregion

  // region Checklist Bits

  // Params for a checklist to be posted, if user opens POST form
  const [checklistTitle, setChecklistTitle] = useState<string | undefined>();
  const [checklistDesc, setChecklistDesc] = useState<string | undefined>();

  const [createChecklistOpen, setCreateChecklistOpen] = useState(false);

  // const postNewChecklist = (params: PostChecklistParams) => postChecklist(jwt, params)
  //   .then(res => {
  //     setChecklists(prev => [res.data.checklist].concat(prev));
  //     snackbar.enqueueSnackbar('Checklist successfully created!', { variant: 'success' });
  //   })
  //   .catch(() => snackbar.enqueueSnackbar('Checklist creation failed!', { variant: 'error' }));

  // const handleChecklistClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //     setChecklistAnchorEl(event.currentTarget);
  // };

  // const handleChecklistClose = () => {
  //     setChecklistAnchorEl(null);
  // };

  // const handleCreateChecklistOpen = () => {
  //   setCreateChecklistOpen(true);
  // };

  // const handleCreateChecklistClose = () => {
  //   setCreateChecklistOpen(false);
  // };

  // const handleCreateChecklistSubmit = () => {
  //   postNewChecklist({title: checklistTitle ?? '', description: checklistDesc ?? '', category_id: undefined});
  //   setCreateChecklistOpen(false);
  // };

  const handleArchiveChecklist = () => { }
  const handleFavoriteChecklist = () => { }

  // endregion

  // region Task Bits

  // Params for a task to be posted, if user opens POST form
  const [taskTitle, setTaskTitle] = useState<string | undefined>();

  const handleMarkTaskInProgress = () => { }
  const handleMarkTaskComplete = () => { }
  const handleAssignTaskDueDate = () => { }

  // Task Bits
  // const postNewTask = (params: PostTaskParams) => postTask(jwt, params)
  //   .then(res => {
  //     setTasks(prev => [res.data.task].concat(prev));
  //     snackbar.enqueueSnackbar('Task successfully created!', { variant: 'success' });
  //   })
  //   .catch(() => snackbar.enqueueSnackbar('Task creation failed!', { variant: 'error' }));

  const handleTaskClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setTaskAnchorEl(event.currentTarget);
  };

  const handleTaskClose = () => {
    setTaskAnchorEl(null);
  };

  // const handleCreateTaskSubmit = () => {
  //   postNewTask({title: taskTitle ?? '', checklist_id: undefined});
  // };

  // endregion

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
      <Box>
        <Breadcrumbs sx={{ pt: 5, pb: 2 }}>
          <Link underline="hover" color="inherit" href={routes.Root}>
            Home
          </Link>
          <Typography color="text.primary">Dashboard</Typography>
        </Breadcrumbs>
      </Box>
      <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={handleCreateCategoryOpen}>Add Category</Button>
      <PostCategoryFormDialog open={createCategoryOpen} onClose={handleCreateCategoryClose} onClickSubmit={handleCreateCategorySubmit} onChangeTitle={setCategoryTitle} onChangeDesc={setCategoryDesc} />
      {!!categories?.length ? (categories.map((category) => (
        <CategoryItem
          key={`category-${category.id}`}
          title={category.title}
          description={category.description}
          checklists={category.checklists}
        />
      ))) : <Box sx={{ justifyContent: 'center' }}><Typography sx={{ textAlign: 'center' }}>No current categories! Please make a context category to house your lists</Typography></Box>}
    </AppLayout>
  );
}

export default Dashboard;
