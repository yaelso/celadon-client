import { Box, Breadcrumbs, Button, CssBaseline, Fab, Grid, Link, List, Paper, Tooltip, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useCallback, useEffect, useState } from "react";
import { useLocalStorage } from "../applicationState/hooks";
import { fetchFavorites } from "../domain/checklists/checklistActions";
import FavoritedChecklistItem from "../domain/checklists/FavoritedChecklistItem";
import { Checklist } from "../domain/checklists/models";
import { deleteHabit, fetchHabits, postHabit } from "../domain/habits/habitActions";
import HabitItem from "../domain/habits/HabitItem";
import { Task } from "../domain/tasks/models";
import AppLayout from "../layout/AppLayout";
import { makeRoutes } from "../navigation/routes";
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import AddIcon from '@mui/icons-material/Add';
import PostChecklistFormDialog from "../domain/checklists/PostChecklistFormDialog";
import { UserPokemon } from "../domain/userPokemon/models";


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

  // const postNewHabit = () => postHabit(jwt)
  //   .then(res => {
  //     setHabits(prev => [res.data.habit].concat(prev));
  //     snackbar.enqueueSnackbar('Habit successfully created!', { variant: 'success' });
  //   })
  //   .catch(() => snackbar.enqueueSnackbar('Habit creation failed!', { variant: 'error' }));

  // const deleteHabitById = (id: number) => deleteHabit(jwt, id)
  //   .then(data => {
  //     console.log(data);
  //     snackbar.enqueueSnackbar('Habit deleted', { variant: 'success' });
  //   })
  //   .catch(() => snackbar.enqueueSnackbar('Habit creation failed!', { variant: 'error' }));

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
  //     if (!calendar) {
  //       fetchCalendar();
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
          <Button variant="contained" size="small">Add a Habit</Button>
          {/* <PostHabitFormDialog
                open={createChecklistOpen}
                onClose={handleCreateChecklistClose}
                onClickSubmit={handleCreateChecklistSubmit}
                onChangeTitle={setChecklistTitle}
                onChangeDesc={setChecklistDesc}
            /> */}
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
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ pt: 5, justifyContent: 'center' }}>
          {!!favoriteChecklists?.length ? (favoriteChecklists.map((checklist) => (
            <FavoritedChecklistItem
              key={`favchecklist-${checklist.id}`}
              title={checklist.title}
              description={checklist.description}
            // tasks={checklist.tasks}
            />
          ))) : "No current favorites!"}
        </Grid>
      </Box>
    </AppLayout>
  );
};

export default Profile;
