import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { Box, Breadcrumbs, Button, Checkbox, CssBaseline, Grid, IconButton, Link, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useCallback, useState } from 'react';
import { useLocalStorage } from '../applicationState/hooks';
import { Category } from '../domain/categories/models';
import ArchivedChecklistItem from '../domain/checklists/ArchivedChecklistItem';
import { fetchArchivedChecklists } from '../domain/checklists/checklistActions';
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


  //   const handleUnarchiveSubmit = useCallback(
  //     () => {
  //         tagChecklistArchive(id);
  //     },
  //     [unarchiveChecklist, id],
  // );

  // tagChecklistUnarchive: (id: number) => void;

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
              title={checklist.title}
              description={checklist.description}
            // tasks={checklist.tasks}
            />
          ))) : "No currently archived checklists!"}
        </Grid>
      </Box>
    </AppLayout>
  )
};

export default Archive;
