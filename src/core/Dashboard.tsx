import AddIcon from '@mui/icons-material/Add';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Breadcrumbs, Button, Checkbox, CssBaseline, Divider, Fab, Grid, IconButton, Link, List, ListItem, ListItemText, Paper, TextField, Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip/Tooltip';
import { useSnackbar } from 'notistack';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocalStorage } from '../applicationState/hooks';
import Categories from '../domain/categories/CategoryItem';
import { deleteCategory, fetchCategories, postCategory, PostCategoryParams } from '../domain/categories/categoryActions';
import { Category } from '../domain/categories/models';
import PostCategoryFormDialog from '../domain/categories/PostCategoryFormDialog';
import { deleteChecklist, favoriteChecklist, postChecklist, PostChecklistParams, unfavoriteChecklist } from '../domain/checklists/checklistActions';
import { Checklist } from '../domain/checklists/models';
import MoreChecklistContextMenu from '../domain/checklists/MoreChecklistContextMenu';
import PostChecklistFormDialog from '../domain/checklists/PostChecklistFormDialog';
import MoreTaskContextMenu from '../domain/tasks/MoreTaskContextMenu';
import { deleteTask, postTask, PostTaskParams } from '../domain/tasks/taskActions';
import AppLayout from '../layout/AppLayout';
import { makeRoutes } from '../navigation/routes';
import CategoryItem from '../domain/categories/CategoryItem';
import { postUser } from '../domain/users/userActions';
import { Task } from '../domain/tasks/models';
import { addExpToPokemon } from '../domain/userPokemon/userPokemonActions';
import { User } from '../domain/users/models';


type FlatCategory = Omit<Category, 'checklists'>;
type FlatChecklist = Omit<Checklist, 'tasks'>;

const BASE_POKEMON_EXP_AWARD = 5;

const Dashboard: React.FC = (props) => {
  const routes = makeRoutes();
  const snackbar = useSnackbar();

  const [user, setUser] = useState<User | undefined>(undefined);

  const [jwt, _] = useLocalStorage('authToken');

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

  const postNewCategory = useCallback((params: PostCategoryParams) => {
    postCategory(jwt, params)
      .then(res => {
        const category = res.data.category;
        const { checklists, ...flatCategory } = category;

        setCategories(prev => [flatCategory].concat(prev));
        snackbar.enqueueSnackbar('Category successfully created!', { variant: 'success' });
      })
      // .then(addActivePokemonExp)
      .catch(() => snackbar.enqueueSnackbar('Category creation failed!', { variant: 'error' }));
  },
    // [addActivePokemonExp, jwt, snackbar],
    [jwt, snackbar],
  );

  const deleteCategoryById = useCallback(
    (id: number) => deleteCategory(jwt, id)
      .then(res => {
        setCategories((prev) => prev.filter((newCat) => {
          return newCat.id !== id;
        }))
        snackbar.enqueueSnackbar('Category deleted', { variant: 'success' });
      })
      .catch(() => snackbar.enqueueSnackbar('Category deletion failed!', { variant: 'error' })),
    [jwt, snackbar],
  );

  const handleCreateCategoryOpen = useCallback(
    () => {
      setCreateCategoryOpen(true);
    },
    [setCreateCategoryOpen],
  );

  const handleCreateCategoryClose = useCallback(
    () => {
      setCreateCategoryOpen(false);
    },
    [setCreateCategoryOpen],
  );

  const handleCreateCategorySubmit = useCallback(
    () => {
      postNewCategory({ title: categoryTitle ?? '', description: categoryDesc ?? '' });
      setCreateCategoryOpen(false);
    },
    [categoryDesc, categoryTitle, postNewCategory, setCreateCategoryOpen],
  );

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

  const patchFavoriteChecklist = useCallback(
    (id: number) => favoriteChecklist(jwt, id)
      .then(res => {
        const favorited_status = res.data.checklist.is_favorited;

        const newChecklists = checklists.map(checklist => {
          if (checklist.id === id) {
            return { ...checklist, is_favorited: favorited_status };
          }
        })

        setChecklists(newChecklists);
        snackbar.enqueueSnackbar('Checklist favorited', { variant: 'success' });
      })
      .catch(() => snackbar.enqueueSnackbar('Checklist favorite failed!', { variant: 'error' })),
    [jwt, snackbar],
  );

  const patchUnfavoriteChecklist = useCallback(
    (id: number) => unfavoriteChecklist(jwt, id)
      .then(res => {
        const favorited_status = res.data.checklist.is_favorited;

        const newChecklists = checklists.map(checklist => {
          if (checklist.id === id) {
            return { ...checklist, is_favorited: favorited_status };
          }
        })

        setChecklists(newChecklists);
        snackbar.enqueueSnackbar('Checklist unfavorited', { variant: 'success' });
      })
      .catch(() => snackbar.enqueueSnackbar('Checklist unfavorite failed!', { variant: 'error' })),
    [jwt, snackbar],
  );

  const deleteChecklistById = useCallback(
    (id: number) => deleteChecklist(jwt, id)
      .then(res => {
        setChecklists((prev) => prev.filter((newList) => {
          return newList.id !== id;
        }))
        snackbar.enqueueSnackbar('Checklist deleted', { variant: 'success' });
      })
      .catch(() => snackbar.enqueueSnackbar('Checklist deletion failed!', { variant: 'error' })),
    [jwt, snackbar],
  );


  // end region

  // region Task API calls

  const postNewTask = useCallback(
    (params: PostTaskParams) => {
      postTask(jwt, params)
        .then(res => {
          const newTasks = [...tasks, res.data.task]
          setTasks(newTasks)
          fetchAllCategories();
          snackbar.enqueueSnackbar('Task successfully created!', { variant: 'success' });
        })
        .catch(() => snackbar.enqueueSnackbar('Task creation failed!', { variant: 'error' }));
    },
    [jwt, snackbar],
  );

  const deleteTaskById = useCallback(
    (id: number) => deleteTask(jwt, id)
      .then(res => {
        setTasks((prev) => prev.filter((newTask) => {
          return newTask.id !== id;
        }))
        snackbar.enqueueSnackbar('Task deleted', { variant: 'success' });
      })
      .catch(() => snackbar.enqueueSnackbar('Task deletion failed!', { variant: 'error' })),
    [jwt, snackbar],
  );

  // end region

  // region Pokemon API calls


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
      <CssBaseline />
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
          removeCategory={deleteCategoryById}
          checklists={category.checklists}
          addChecklist={postNewChecklist}
          removeChecklist={deleteChecklistById}
          tagChecklistFavorite={patchFavoriteChecklist}
          tagChecklistUnfavorite={patchUnfavoriteChecklist}
          // tagChecklistArchive={}
          addTask={postNewTask}
          removeTask={deleteTaskById}
        // tagTaskInProgress={ }
        // tagTaskComplete={ }
        // tagScheduleTask={ }
        />
      ))) : <Box sx={{ justifyContent: 'center' }}><Typography sx={{ textAlign: 'center' }}>No current categories! Please make a context category to house your lists</Typography></Box>}
    </AppLayout>
  );
}

export default Dashboard;
