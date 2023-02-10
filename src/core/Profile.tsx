import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../applicationState/hooks";
import { deleteHabit, fetchHabits, postHabit } from "../domain/habits/habitActions";
import AppLayout from "../layout/AppLayout";

const Profile: React.FC = () => {
  const snackbar = useSnackbar();

  const [habits, setHabits] = useState(undefined);

  const [jwt, _] = useLocalStorage('authToken');

  // API callbacks
  const fetchAllHabits = () => fetchHabits(jwt)
    .then(data => setHabits(data))
    .catch(() => snackbar.enqueueSnackbar('Habits fetch failed!', { variant: 'error' }));

  const postNewHabit = () => postHabit(jwt)
    .then(data => setHabits(prev => {
      [data].concat(prev);
      snackbar.enqueueSnackbar('Habit successfully created!', { variant: 'success' });
    }))
    .catch(() => snackbar.enqueueSnackbar('Habit creation failed!', { variant: 'error' }));

  const deleteHabitById = (id: number) => deleteHabit(jwt, id)
    .then(data => {
      console.log(data);
      snackbar.enqueueSnackbar('Habit deleted', { variant: 'success' });
    })
    .catch(() => snackbar.enqueueSnackbar('Habit creation failed!', { variant: 'error' }));

  useEffect(
    () => {
      if (!habits) {
        fetchAllHabits();
      }
    },
    [],
  );

  return (
    <AppLayout>
      <div>Profile</div>
    </AppLayout>
  );
};

export default Profile;
