import { Box, Breadcrumbs, Button, CssBaseline, Grid, Link, List, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { Pokemon, PokemonClient } from "pokenode-ts";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "../applicationState/hooks";
import UserCalendar from "../domain/calendar/Calendar";
import { deleteChecklist, fetchFavorites } from "../domain/checklists/checklistActions";
import FavoritedChecklistItem from "../domain/checklists/FavoritedChecklistItem";
import { Checklist } from "../domain/checklists/models";
import { fetchHabits, patchHabitReps, PatchHabitRequestParams, postHabit, PostHabitParams } from "../domain/habits/habitActions";
import HabitItem from "../domain/habits/HabitItem";
import { Habit } from "../domain/habits/models";
import PostHabitFormDialog from "../domain/habits/PostHabitFormDialog";
import { Task } from "../domain/tasks/models";
import ScheduledTaskItem from "../domain/tasks/ScheduledTaskItem";
import { clearTaskDueDate, deleteTask, fetchTasksWithDueDate, markTaskComplete, markTaskIncomplete, markTaskInProgress, markTaskNotInProgress, PatchDueDateRequestParams, setTaskDueDate, TaskWithDueDateFetchParams } from "../domain/tasks/taskActions";
import { PokemonViewModel, UserPokemon } from "../domain/userPokemon/models";
import { fetchUserPokemon } from "../domain/userPokemon/userPokemonActions";
import UserPokemonItem from "../domain/userPokemon/UserPokemonItem";
import { PatchActivePokemonRequestParams, updateActivePokemon } from "../domain/users/userActions";
import AppLayout from "../layout/AppLayout";
import { makeRoutes } from "../navigation/routes";


type FlatChecklist = Omit<Checklist, 'tasks'>;

const Profile: React.FC = () => {
  const routes = makeRoutes();
  const snackbar = useSnackbar();

  const [jwt, _] = useLocalStorage('authToken');

  const [habits, setHabits] = useState<Habit[] | undefined>(undefined);
  const [favoriteChecklists, setFavoriteChecklists] = useState<FlatChecklist[] | undefined>(undefined);
  const [tasks, setTasks] = useState<Task[] | undefined>(undefined);
  const [scheduledTasks, setScheduledTasks] = useState<Task[] | undefined>(undefined);

  const [pokeNodePokemon, setPokenodePokemon] = useState<Pokemon[] | undefined>(undefined);
  const [activePokemonId, setActivePokemonId] = useState<number | undefined>(undefined);
  const [activePokemon, setActivePokemon] = useState<UserPokemon | undefined>(undefined);

  // Params for a checklist to be posted if user opens POST form
  const [habitTitle, setHabitTitle] = useState<string | undefined>();

  // Post checklist form dialog toggle
  const [createHabitOpen, setCreateHabitOpen] = useState(false);

  const [habitAnchorEl, setHabitAnchorEl] = React.useState<null | HTMLElement>(null);
  const openHabit = Boolean(habitAnchorEl);

  const today = new Date().toJSON().slice(0, 10);


  // region Habits API callbacks and handlers
  const fetchAllHabits = () => fetchHabits(jwt)
    .then(res => setHabits(res.data))
    .catch(() => snackbar.enqueueSnackbar('Habits fetch failed!', { variant: 'error' }));

  const fetchAllFavoriteLists = useCallback(
    () => fetchFavorites(jwt)
      .then(res => {
        const favoriteChecklists = res.data ?? [];

        const flatChecklists: FlatChecklist[] = favoriteChecklists.map(checklist => {
          const { tasks, ...flatChecklist } = checklist;
          return flatChecklist;
        });

        setFavoriteChecklists(flatChecklists);

        const tasks = favoriteChecklists.map(checklist => checklist.tasks ?? []).flat();

        // Let's never, ever do that again
        setTasks(tasks);
      })
      .catch(() => snackbar.enqueueSnackbar('Favorite checklists fetch failed!', { variant: 'error' })),
    [jwt, snackbar],
  );

  const postNewHabit = useCallback(
    (params: PostHabitParams) => {
      postHabit(jwt, params)
        .then(res => {
          const newHabits = [...habits, res.data]
          setHabits(newHabits)
          fetchAllHabits();
          snackbar.enqueueSnackbar('Habit successfully created!', { variant: 'success' });
        })
        .catch(() => snackbar.enqueueSnackbar('Habit creation failed!', { variant: 'error' }));
    },
    [jwt, snackbar],
  );

  const updateHabitReps = useCallback(
    (id: number, params: PatchHabitRequestParams) => patchHabitReps(jwt, id, params)
      .then(res => {
        const newHabit = res.data.habit;

        setHabits((prev) => {
          const oldHabitIndex = prev.findIndex(p => p.id === newHabit.id);
          return prev.slice(0, oldHabitIndex)
            .concat([newHabit])
            .concat(prev.slice(oldHabitIndex + 1));
        });
        snackbar.enqueueSnackbar('Habit reps updated!', { variant: 'success' });
      })
      .catch(() => snackbar.enqueueSnackbar('Habit reps update attempt failed!', { variant: 'error' })),
    [jwt, snackbar],
  );

  const handleCreateHabitOpen = useCallback(
    () => {
      setCreateHabitOpen(true);
    },
    [setCreateHabitOpen],
  );

  const handleCreateHabitClose = useCallback(
    () => {
      setCreateHabitOpen(false);
    },
    [setCreateHabitOpen],
  );

  const handleCreateHabitSubmit = useCallback(
    () => {
      postNewHabit({ title: habitTitle });
      setCreateHabitOpen(false);
    },
    [postNewHabit, habitTitle, setCreateHabitOpen],
  );

  // region scheduled tasks
  const fetchAllScheduledTasks = (params: TaskWithDueDateFetchParams) => fetchTasksWithDueDate(jwt, params)
    .then(res => setScheduledTasks(res.data))
    .catch(() => snackbar.enqueueSnackbar('Habits fetch failed!', { variant: 'error' }));

  // end region

  useEffect(
    () => {
      if (!habits) {
        fetchAllHabits();
      }
    },
    [],
  );

  useEffect(
    () => {
      if (!favoriteChecklists) {
        fetchAllFavoriteLists();
      }
    },
    [],
  );

  // useEffect(
  //   () => {
  //     if (!scheduledTasks) {
  //       fetchAllScheduledTasks();
  //     }
  //   },
  //   [],
  // );

  // useEffect(
  //   () => {
  //     if (!activeUserPokemon) {
  //       fetchActiveUserPokemon();
  //     }
  //   },
  //   [],
  // );

  const [userPokemon, setUserPokemon] = useState<UserPokemon[] | undefined>(undefined);

  const fetchAllUserPokemon = useCallback(
    () => {
      fetchUserPokemon(jwt)
        .then(res => {
          const userPokeObjs = res.data;

          setUserPokemon(userPokeObjs);
        })
        .catch(() => snackbar.enqueueSnackbar('User Pokemon fetch failed!', { variant: 'error' }));
    },
    [jwt, snackbar],
  );

  useEffect(fetchAllUserPokemon, []);

  const deleteChecklistById = useCallback(
    (id: number) => deleteChecklist(jwt, id)
      .then(res => {
        setFavoriteChecklists((prev) => prev.filter((newList) => {
          return newList.id !== id;
        }))
        snackbar.enqueueSnackbar('Checklist deleted', { variant: 'success' });
      })
      .catch(() => snackbar.enqueueSnackbar('Checklist deletion failed!', { variant: 'error' })),
    [jwt, snackbar],
  );

  const patchTaskInProgress = useCallback(
    (id: number) => markTaskInProgress(jwt, id)
      .then(res => {
        const progress = res.data.task.in_progress;

        const newTasks = tasks.map(task => {
          if (task.id === id) {
            return { ...task, in_progress: progress }
          }
        })

        setTasks(newTasks);
        snackbar.enqueueSnackbar('Task marked in-progress', { variant: 'success' });
      })
      .catch(() => snackbar.enqueueSnackbar('Task progress update attempt failed!', { variant: 'error' })),
    [jwt, snackbar],
  );

  const patchTaskNotInProgress = useCallback(
    (id: number) => markTaskNotInProgress(jwt, id)
      .then(res => {
        const progress = res.data.task.in_progress;

        const newTasks = tasks.map(task => {
          if (task.id === id) {
            return { ...task, in_progress: progress }
          }
        })

        setTasks(newTasks);
        snackbar.enqueueSnackbar('Task marked not in-progress', { variant: 'success' });
      })
      .catch(() => snackbar.enqueueSnackbar('Task progress update attempt failed!', { variant: 'error' })),
    [jwt, snackbar],
  );

  const patchTaskComplete = useCallback(
    (id: number) => markTaskComplete(jwt, id)
      .then(res => {
        const completion_status = res.data.task.is_complete;

        const newTasks = tasks.map(task => {
          if (task.id === id) {
            return { ...task, is_complete: completion_status }
          }
        })

        setTasks(newTasks);
        snackbar.enqueueSnackbar('Task marked complete', { variant: 'success' });
      })
      .catch(() => snackbar.enqueueSnackbar('Task progress update attempt failed!', { variant: 'error' })),
    [jwt, snackbar],
  );

  const patchTaskIncomplete = useCallback(
    (id: number) => markTaskIncomplete(jwt, id)
      .then(res => {
        const completion_status = res.data.task.is_complete;

        const newTasks = tasks.map(task => {
          if (task.id === id) {
            return { ...task, is_complete: completion_status }
          }
        })

        setTasks(newTasks);
        snackbar.enqueueSnackbar('Task marked in-progress', { variant: 'success' });
      })
      .catch(() => snackbar.enqueueSnackbar('Task progress update attempt failed!', { variant: 'error' })),
    [jwt, snackbar],
  );

  const patchTaskDueDate = useCallback(
    (id: number, params: PatchDueDateRequestParams) => setTaskDueDate(jwt, id, params)
      .then(res => {
        const deadline = res.data.task.due_date;

        const newTasks = tasks.map(task => {
          if (task.id === id) {
            return { ...task, due_date: deadline }
          }
        })

        setTasks(newTasks);
        snackbar.enqueueSnackbar('Task due date set', { variant: 'success' });
      })
      .catch(() => snackbar.enqueueSnackbar('Task due date update attempt failed!', { variant: 'error' })),
    [jwt, snackbar],
  );

  const removeDueDate = useCallback(
    (id: number) => clearTaskDueDate(jwt, id)
      .then(res => {
        const deadline = res.data.task.due_date;

        const newTasks = tasks.map(task => {
          if (task.id === id) {
            return { ...task, due_date: deadline }
          }
        })

        setTasks(newTasks);
        snackbar.enqueueSnackbar('Task due date cleared', { variant: 'success' });
      })
      .catch(() => snackbar.enqueueSnackbar('Task due date update attempt failed!', { variant: 'error' })),
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

  const addPokenodePokemon = useCallback(
    (pk: Pokemon) => setPokenodePokemon(prev => (prev ?? []).concat([pk])),
    [setPokenodePokemon],
  );

  const pokemonViewModels: PokemonViewModel[] = useMemo(
    () => (userPokemon ?? []).map(pk => {
      const pokeNodeObj = (pokeNodePokemon ?? []).find(p => p.name == pk.pokemon.name.toLowerCase());

      return {
        id: pk.pokemon_id,
        exp: pk.exp,
        name: pokeNodeObj?.name ?? '',
        weight: pokeNodeObj?.weight ?? 0,
        height: pokeNodeObj?.height ?? 0,
        sprite: pokeNodeObj?.sprites?.front_default ?? '',
        types: pokeNodeObj?.types ?? [],
      };
    }),
    [pokeNodePokemon, userPokemon],
  );
  console.log(pokemonViewModels);

  const pokeNodeApi = useMemo(() => new PokemonClient(), []);

  // API callbacks

  const fetchPokeNodeData = useCallback(
    (pokemonName: string) => {
      pokeNodeApi.getPokemonByName(pokemonName.toLowerCase())
        .then(pk => addPokenodePokemon(pk))
        .catch(
          err => snackbar
            .enqueueSnackbar(
              'An error occurred while fetching your Pokemon data - please try again later!',
              { variant: 'error' },
            ),
        );
    },
    [addPokenodePokemon, pokeNodeApi, snackbar],
  );

  const designateActivePokemon = useCallback(
    (params: PatchActivePokemonRequestParams) => updateActivePokemon(jwt, params)
      .then(res => {
        const newActivePokemonId = res.data.user.active_pokemon_id;
        setActivePokemonId(newActivePokemonId);
        snackbar.enqueueSnackbar('New Pokemon active!', { variant: 'success' });
      })
      .catch(() => snackbar.enqueueSnackbar('Active Pokemon update attempt failed!', { variant: 'error' })),
    [jwt, snackbar],
  );

  useEffect(fetchAllUserPokemon, []);

  useEffect(
    () => {
      const pokemonNames = (userPokemon ?? []).map(p => p.pokemon.name);
      pokemonNames.forEach((name) => fetchPokeNodeData(name));
    },
    [userPokemon],
  );

  return (
    <AppLayout>
      <CssBaseline />
      <Box>
        <Breadcrumbs sx={{ pt: 5 }}>
          <Link underline="hover" color="inherit" href={routes.Root}>
            Home
          </Link>
          <Link underline="hover" color="inherit" href={routes.Dashboard}>
            Dashboard
          </Link>
          <Typography color="text.primary">Profile</Typography>
        </Breadcrumbs>
      </Box>
      <Box>
        <Typography variant="h5" sx={{ pt: 5, pb: 2 }}>
          {"Welcome, "}
          {localStorage.getItem("name")}
          {"!"}
        </Typography>
      </Box>
      <Box>
        <img src={localStorage.getItem("profilePic")} alt="User" />
        <Typography>
          {localStorage.getItem("name")}
        </Typography>
      </Box>
      <Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
          <Typography variant="h5" sx={{ pt: 7, pr: 3 }}>
            {"Habits"}
          </Typography>
          <Button variant="contained" size="small" onClick={handleCreateHabitOpen}>Add a Habit</Button>
          <PostHabitFormDialog
            open={createHabitOpen}
            onClose={handleCreateHabitClose}
            onClickSubmit={handleCreateHabitSubmit}
            onChangeTitle={setHabitTitle}
          />
        </Box>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ pt: 5, justifyContent: 'flex-start' }}>
          <Grid item sx={{ minWidth: 300, minHeight: 300 }}>
            <Paper sx={{ pl: 3, pr: 3 }}>
              <Box display="grid" justifyContent="space-between">
                <List sx={{
                  pb: 3,
                }}
                >
                  {!!habits?.length ? (habits.map((habit) => (
                    <HabitItem
                      key={`habit-${habit.id}`}
                      id={habit.id}
                      title={habit.title}
                      reps={habit.reps}
                      updateReps={updateHabitReps}
                    />
                  ))) : "No current habits!"}
                </List>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ pb: 5 }}>
        <Typography variant="h5" sx={{ pt: 2 }}>
          {"Schedule"}
        </Typography>
        {!!scheduledTasks?.length ? (scheduledTasks.map((task) => (
          <ScheduledTaskItem
            title={task.title}
          />
        ))) : "No currently scheduled tasks!"}
      </Box>
      <Box sx={{ pb: 5 }}>
        <Typography variant="h5" sx={{ pt: 2 }}>
          {"Calendar"}
        </Typography>
        <UserCalendar />
      </Box>
      <Box sx={{ pb: 4 }}>
        <Typography variant="h5" sx={{ pt: 2 }}>
          {"Active Pokemon"}
        </Typography>
        {
          !!pokemonViewModels?.length
            ? (pokemonViewModels.map(
              (pokemon) => (
                <UserPokemonItem
                  key={`userPokemon-${pokemon.id}`}
                  {...pokemon}
                />))
            )
            : <span>'No current Pokemon!'</span>
        }
      </Box>
      <Box sx={{ pb: 5 }}>
        <Typography variant="h5" sx={{ pt: 2 }}>
          {"Favorite Checklists"}
        </Typography>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ pt: 5, pb: 20, justifyContent: 'center' }}>
          {!!favoriteChecklists?.length ? (favoriteChecklists.map((checklist) => (
            <FavoritedChecklistItem
              key={`favchecklist-${checklist.id}`}
              id={checklist.id}
              title={checklist.title}
              description={checklist.description}
              tasks={tasks}
              removeChecklist={deleteChecklistById}
              removeTask={deleteTaskById}
              tagTaskInProgress={patchTaskInProgress}
              tagTaskNotInProgress={patchTaskNotInProgress}
              tagTaskComplete={patchTaskComplete}
              tagTaskIncomplete={patchTaskIncomplete}
              assignDueDate={patchTaskDueDate}
              removeDueDate={removeDueDate}
            />
          ))) : "No current favorites!"}
        </Grid>
      </Box>
    </AppLayout>
  );
};

export default Profile;
