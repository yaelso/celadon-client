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
    .catch(() => snackbar.enqueueSnackbar('Habits fetch failed!'));

  const postNewHabit = () => postHabit(jwt)
    .then(data => setHabits(prev => {
      [data].concat(prev);
      snackbar.enqueueSnackbar('Habit successfully created!');
    }))
    .catch(() => snackbar.enqueueSnackbar('Habit creation failed!'));

  const deleteHabitById = (id: number) => deleteHabit(jwt, id)
    .then(data => {
      console.log(data);
      snackbar.enqueueSnackbar('Habit deleted');
    })
    .catch(() => snackbar.enqueueSnackbar('Habit creation failed!'));

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
