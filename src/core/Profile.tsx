import { Box, Breadcrumbs, Button, CssBaseline, Fab, Grid, Link, List, Paper, Tooltip, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useCallback, useEffect, useState } from "react";
import { useLocalStorage } from "../applicationState/hooks";
import { deleteChecklist, fetchFavorites } from "../domain/checklists/checklistActions";
import FavoritedChecklistItem from "../domain/checklists/FavoritedChecklistItem";
import { Checklist } from "../domain/checklists/models";
import { deleteHabit, fetchHabits, postHabit, PostHabitParams } from "../domain/habits/habitActions";
import HabitItem from "../domain/habits/HabitItem";
import { Task } from "../domain/tasks/models";
import AppLayout from "../layout/AppLayout";
import { makeRoutes } from "../navigation/routes";
import { UserPokemon } from "../domain/userPokemon/models";
import { clearTaskDueDate, deleteTask, markTaskComplete, markTaskIncomplete, markTaskInProgress, markTaskNotInProgress, PatchDueDateRequestParams, setTaskDueDate } from "../domain/tasks/taskActions";
import UserCalendar from "../domain/calendar/Calendar";
import PostHabitFormDialog from "../domain/habits/PostHabitFormDialog";


type FlatChecklist = Omit<Checklist, 'tasks'>;

const Profile: React.FC = () => {
  const routes = makeRoutes();
  const snackbar = useSnackbar();

  const [jwt, _] = useLocalStorage('authToken');

  const [habits, setHabits] = useState(undefined);
  const [favoriteChecklists, setFavoriteChecklists] = useState<FlatChecklist[] | undefined>(undefined);
  const [tasks, setTasks] = useState<Task[] | undefined>(undefined);
  const [scheduledTasks, setScheduledTasks] = useState<Task[] | undefined>(undefined);
  const [calendar, setCalendar] = useState<undefined | undefined>(undefined);
  const [activeUserPokemon, setactiveUserPokemon] = useState<UserPokemon[] | undefined>(undefined);

  // Params for a checklist to be posted if user opens POST form
  const [habitTitle, setHabitTitle] = useState<string | undefined>();

  // Post checklist form dialog toggle
  const [createHabitOpen, setCreateHabitOpen] = useState(false);

  const [habitAnchorEl, setHabitAnchorEl] = React.useState<null | HTMLElement>(null);
  const openHabit = Boolean(habitAnchorEl);

  const today = new Date().toJSON().slice(0, 10);


  // // API callbacks
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
          setTasks(newHabits)
          fetchAllHabits();
          snackbar.enqueueSnackbar('Habit successfully created!', { variant: 'success' });
        })
        .catch(() => snackbar.enqueueSnackbar('Habit creation failed!', { variant: 'error' }));
    },
    [jwt, snackbar],
  );


  // const deleteHabitById = (id: number) => deleteHabit(jwt, id)
  //   .then(data => {
  //     console.log(data);
  //     snackbar.enqueueSnackbar('Habit deleted', { variant: 'success' });
  //   })
  //   .catch(() => snackbar.enqueueSnackbar('Habit creation failed!', { variant: 'error' }));

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
          <Typography variant="h5" sx={{ pt: 2, pr: 3 }}>
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
                      title={habit.title}
                    />
                  ))) : "No current habits!"}
                </List>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Typography variant="h5" sx={{ pt: 2 }}>
          {"Schedule"}
        </Typography>
        {/* {!!favoriteChecklists?.length ? (favoriteChecklists.map((checklist) => (
          <FavoritedChecklistItem
              title={checklist.title}
              description={checklist.description}
              tasks={checklist.tasks}
          />
          ))) : "No currently scheduled tasks!"} */}
      </Box>
      <Box>
        <Typography variant="h5" sx={{ pt: 2 }}>
          {"Calendar"}
        </Typography>
        <UserCalendar />
      </Box>
      <Box>
        <Typography variant="h5" sx={{ pt: 2 }}>
          {"Active Pokemon"}
        </Typography>
      </Box>
      <Box>
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
