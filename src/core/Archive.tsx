import { Box, Breadcrumbs, CssBaseline, Grid, Link, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocalStorage } from '../applicationState/hooks';
import ArchivedChecklistItem from '../domain/checklists/ArchivedChecklistItem';
import { archiveChecklist, deleteChecklist, fetchArchivedChecklists, unarchiveChecklist } from '../domain/checklists/checklistActions';
import { Checklist } from '../domain/checklists/models';
import { Task } from '../domain/tasks/models';
import AppLayout from '../layout/AppLayout';
import { makeRoutes } from '../navigation/routes';


type FlatChecklist = Omit<Checklist, 'tasks'>;

const Archive: React.FC = () => {
  const routes = makeRoutes();
  const snackbar = useSnackbar();

  const [jwt, _] = useLocalStorage('authToken');

  const [archivedChecklists, setArchivedChecklists] = useState<FlatChecklist[] | undefined>(undefined);
  const [tasks, setTasks] = useState<Task[] | undefined>(undefined);

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
    () => (archivedChecklists ?? []).reduce(
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
    [archivedChecklists, tasksByChecklistId],
  );

  // API callbacks

  const fetchAllArchivedChecklists = useCallback(
    () => fetchArchivedChecklists(jwt)
      .then(res => {
        const archivedChecklists = res.data ?? [];

        const flatChecklists: FlatChecklist[] = archivedChecklists.map(checklist => {
          const { tasks, ...flatChecklist } = checklist;
          return flatChecklist;
        });

        setArchivedChecklists(flatChecklists);

        const tasks = archivedChecklists.map(checklist => checklist.tasks ?? []).flat();

        // Let's never, ever do that again
        setTasks(tasks);
      })
      .catch(() => snackbar.enqueueSnackbar('Archived checklists fetch failed!', { variant: 'error' })),
    [jwt, snackbar],
  );

  const patchArchiveChecklist = useCallback(
    (id: number) => archiveChecklist(jwt, id)
      .then(res => {
        const newChecklist = res.data.checklist;

        setArchivedChecklists((prev) => {
          const oldChecklistIndex = prev.findIndex(p => p.id === newChecklist.id);
          return prev.slice(0, oldChecklistIndex)
            .concat([newChecklist])
            .concat(prev.slice(oldChecklistIndex + 1));
        });
        snackbar.enqueueSnackbar('Checklist archived', { variant: 'success' });
      })
      .catch(() => snackbar.enqueueSnackbar('Checklist archive attempt failed!', { variant: 'error' })),
    [jwt, snackbar],
  );

  const patchUnarchiveChecklist = useCallback(
    (id: number) => unarchiveChecklist(jwt, id)
      .then(res => {
        const newChecklist = res.data.checklist;

        setArchivedChecklists((prev) => {
          const oldChecklistIndex = prev.findIndex(p => p.id === newChecklist.id);
          return prev.slice(0, oldChecklistIndex)
            .concat([newChecklist])
            .concat(prev.slice(oldChecklistIndex + 1));
        });
        snackbar.enqueueSnackbar('Checklist unarchived', { variant: 'success' });
      })
      .catch(() => snackbar.enqueueSnackbar('Checklist unarchive attempt failed!', { variant: 'error' })),
    [jwt, snackbar],
  );

  const deleteChecklistById = useCallback(
    (id: number) => deleteChecklist(jwt, id)
      .then(res => {
        setArchivedChecklists((prev) => prev.filter((newList) => {
          return newList.id !== id;
        }))
        snackbar.enqueueSnackbar('Checklist deleted', { variant: 'success' });
      })
      .catch(() => snackbar.enqueueSnackbar('Checklist deletion failed!', { variant: 'error' })),
    [jwt, snackbar],
  );

  useEffect(
    () => {
      if (!archivedChecklists) {
        fetchAllArchivedChecklists();
      }
    },
    [archivedChecklists, fetchAllArchivedChecklists],
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
          <Typography color="text.primary">Archive</Typography>
        </Breadcrumbs>
      </Box>
      <Box>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ pt: 5, justifyContent: 'center' }}>
          {!!archivedChecklists?.length ? (archivedChecklists.map((checklist) => (
            <ArchivedChecklistItem
              key={`checklist-${checklist.id}`}
              id={checklist.id}
              title={checklist.title}
              description={checklist.description}
              isArchived={checklist.is_archived}
              tasks={tasks}
              removeChecklist={deleteChecklistById}
              tagChecklistArchive={patchArchiveChecklist}
              tagChecklistUnarchive={patchUnarchiveChecklist}
            />
          ))) : "No currently archived checklists!"}
        </Grid>
      </Box>
    </AppLayout>
  )
};

export default Archive;
