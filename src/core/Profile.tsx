import { Box, Breadcrumbs, CssBaseline, Link, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../applicationState/hooks";
import { deleteHabit, fetchHabits, postHabit } from "../domain/habits/habitActions";
import AppLayout from "../layout/AppLayout";
import { makeRoutes } from "../navigation/routes";

const Profile: React.FC = () => {
  const routes = makeRoutes();

  const snackbar = useSnackbar();

  // const [habits, setHabits] = useState(undefined);

  // const [jwt, _] = useLocalStorage('authToken');

  // // API callbacks
  // const fetchAllHabits = () => fetchHabits(jwt)
  //   .then(data => setHabits(data))
  //   .catch(() => snackbar.enqueueSnackbar('Habits fetch failed!', { variant: 'error' }));

  // const postNewHabit = () => postHabit(jwt)
  //   .then(data => setHabits(prev => {
  //     [data].concat(prev);
  //     snackbar.enqueueSnackbar('Habit successfully created!', { variant: 'success' });
  //   }))
  //   .catch(() => snackbar.enqueueSnackbar('Habit creation failed!', { variant: 'error' }));

  // const deleteHabitById = (id: number) => deleteHabit(jwt, id)
  //   .then(data => {
  //     console.log(data);
  //     snackbar.enqueueSnackbar('Habit deleted', { variant: 'success' });
  //   })
  //   .catch(() => snackbar.enqueueSnackbar('Habit creation failed!', { variant: 'error' }));

  // useEffect(
  //   () => {
  //     if (!habits) {
  //       fetchAllHabits();
  //     }
  //   },
  //   [],
  // );

  return (
    <AppLayout>
      <CssBaseline />
      <Box>
        <Breadcrumbs sx={{pt: 5}}>
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
        <Typography variant="h5" sx={{pt: 5}}>
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
        <Typography>
          {"Habits"}
        </Typography>
      </Box>
      <Box>
        <Typography>
          {"Schedule"}
        </Typography>
      </Box>
      <Box>
        <Typography>
          {"Calendar"}
        </Typography>
      </Box>
      <Box>
        <Typography>
          {"Active Pokemon"}
        </Typography>
      </Box>
      <Box>
        <Typography>
          {"Favorite Checklists"}
        </Typography>
      </Box>
    </AppLayout>
  );
};

export default Profile;
