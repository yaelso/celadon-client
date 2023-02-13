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
import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import { Task } from '../domain/tasks/models';


type FlatCategory = Omit<Category, 'checklists'>;
type FlatChecklist = Omit<Checklist, 'tasks'>;

const Dashboard: React.FC = (props) => {
  const routes = makeRoutes();
  const snackbar = useSnackbar();

  const [user, setUser] = useState(undefined);

  const [jwt, _] = useLocalStorage('authToken');

  const postNewUser = () => postUser(jwt)
    .then(res => setUser(prev => {
      [res.data].concat(prev);
      snackbar.enqueueSnackbar('User successfully created!', { variant: 'success' });
    }))
    .catch(() => snackbar.enqueueSnackbar('User creation failed!', { variant: 'error' }));

  const [categories, setCategories] = useState<FlatCategory[] | undefined>(undefined);
  const [checklists, setChecklists] = useState<FlatChecklist[] | undefined>(undefined);
  const [tasks, setTasks] = useState<Task[] | undefined>(undefined);

  // Params for a category to be posted if user opens POST form
  const [categoryTitle, setCategoryTitle] = useState<string | undefined>();
  const [categoryDesc, setCategoryDesc] = useState<string | undefined>();

  // Post category form dialog toggle
  const [createCategoryOpen, setCreateCategoryOpen] = useState(false);
  const [createChecklistOpen, setCreateChecklistOpen] = useState(false);

  const tasksByChecklistId = useMemo(
    () => (tasks ?? []).reduce(
      (acc, task) => {
        const tasksForChecklist = acc[`${task.checklist_id}`] ?? [];
        return { ...acc, [`${task.checklist_id}`]: tasksForChecklist.concat([task]) };
      },
      {},
    ), [tasks],
  );

  const checklistsByCategoryId = useMemo(
    () => (checklists ?? []).reduce(
      (acc, checklist) => {
        const checklistsForCategory = acc[`${checklist.category_id}`] ?? [];
        return {
          ...acc,
          [`${checklist.category_id}`]: checklistsForCategory.concat([
            {
              ...checklist,
              tasks: (tasksByChecklistId[`${checklist.id}`] ?? []),
            },
          ]),
        };
      },
      {},
    ),
    [checklists, tasksByChecklistId],
  );

  const fullCategoryObjs = useMemo(
    () => (categories ?? []).reduce(
      (acc, category) => acc.concat([{ ...category, checklists: (checklistsByCategoryId[`${category.id}`] ?? []) }]),
      [],
    ), [categories, checklistsByCategoryId]
  );

  // region Category API calls & handlers

  const fetchAllCategories = useCallback(
    () => fetchCategories(jwt)
      .then(res => {
        const categories = res.data ?? [];

        const flatCategories: FlatCategory[] = categories.map(category => {
          const { checklists, ...flatCategory } = category;
          return flatCategory;
        });

        setCategories(flatCategories);

        const checklists = categories.map(category => category.checklists ?? []).flat();
        const flatChecklists = checklists.map(
          checklist => {
            const { tasks, ...flatChecklist } = checklist;
            return flatChecklist;
          })

        setChecklists(flatChecklists);

        const tasks = checklists.map(checklist => checklist.tasks ?? []).flat();

        // Let's never, ever do that again
        setTasks(tasks);
      })
      .catch(() => snackbar.enqueueSnackbar('Categories fetch failed!', { variant: 'error' })),
    [jwt, snackbar],
  );

  const postNewCategory = (params: PostCategoryParams) => postCategory(jwt, params)
    .then(res => {
      const category = res.data.category;
      const { checklists, ...flatCategory } = category;

      setCategories(prev => [flatCategory].concat(prev));
      snackbar.enqueueSnackbar('Category successfully created!', { variant: 'success' });
    })
    .catch(() => snackbar.enqueueSnackbar('Category creation failed!', { variant: 'error' }));

  const deleteCategoryById = (id: number) => deleteCategory(jwt, id)
    .then(res => {
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

  const handleDeleteCategoryClick = (id: number) => {
    deleteCategoryById(id)
    fetchAllCategories()
  }

  // end region

  // region Checklist API calls & handlers
  const postNewChecklist = useCallback(
    (params: PostChecklistParams) => {
      postChecklist(jwt, params)
        .then(res => {
          const checklist = res.data.checklist;
          const { tasks, ...flatChecklist } = checklist;

          setChecklists(prev => [flatChecklist].concat(prev));
          snackbar.enqueueSnackbar('Checklist successfully created!', { variant: 'success' });
        })
        .catch(() => snackbar.enqueueSnackbar('Checklist creation failed!', { variant: 'error' }));
    },
    [jwt, snackbar],
  );


  // end region

  // region Task API calls

  // end region


  useEffect(
    () => {
      if (!categories) {
        fetchAllCategories();
      }
    },
    [categories, fetchAllCategories],
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
      {!!fullCategoryObjs.length ? (fullCategoryObjs.map((category) => (
        <CategoryItem
          key={`category-${category.id}`}
          id={category.id}
          title={category.title}
          description={category.description}
          checklists={category.checklists}
          addChecklist={postNewChecklist}
        />
      ))) : <Box sx={{ justifyContent: 'center' }}><Typography sx={{ textAlign: 'center' }}>No current categories! Please make a context category to house your lists</Typography></Box>}
    </AppLayout>
  );
}

export default Dashboard;
