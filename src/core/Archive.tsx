import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { Box, Breadcrumbs, Button, Checkbox, Grid, IconButton, Link, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useLocalStorage } from '../applicationState/hooks';
import { fetchArchivedChecklists } from '../domain/checklists/checklistActions';
import AppLayout from '../layout/AppLayout';
import { makeRoutes } from '../navigation/routes';

const Archive: React.FC = () => {
  const snackbar = useSnackbar();

  const [archivedChecklists, setArchivedChecklists] = useState(undefined);

  const [jwt, _] = useLocalStorage('authToken');

  // API callbacks
  const fetchAllArchivedChecklists = () => fetchArchivedChecklists(jwt)
    .then(data => setArchivedChecklists(data))
    .catch(() => snackbar.enqueueSnackbar('Archive fetch failed!', { variant: 'error' }));

  const routes = makeRoutes();

  return (
    <AppLayout>
      <Box>
        <Breadcrumbs sx={{pt: 5}}>
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
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12}} sx={{pt: 5, justifyContent: 'center'}}>
        <Grid item >
          <Paper sx={{ pl: 3, pr: 3 }}>
            <Box display="grid" justifyContent="space-between">
              <Typography sx={{pt: 2, pb: 1}} textAlign='left'>
                List Title
              </Typography>
              <IconButton sx={{ gridColumn: 3}}><MoreHorizRoundedIcon/></IconButton>
              <Typography sx={{ fontSize: '.9em', pb: 3}}>
                List description
              </Typography>
            </Box>
              <List sx={{
                pb: 3,
              }}>
                <ListItem divider={true}>
                  <Checkbox size="small" disabled />
                  <ListItemText sx={{ pl: 1, pr: 2}} disableTypography={false}>
                      <Typography variant="body2">
                        A sample task title
                      </Typography>
                  </ListItemText>
                  <Checkbox icon={<CheckCircleOutlineRoundedIcon/>} checkedIcon={<CheckCircleRoundedIcon/>} size="small" disabled/>
                </ListItem>
                <ListItem divider={true}>
                  <Checkbox size="small" disabled />
                  <ListItemText sx={{ pl: 1, pr: 2}} disableTypography={false}>
                      <Typography variant="body2">
                        A sample task title
                      </Typography>
                  </ListItemText>
                  <Checkbox icon={<CheckCircleOutlineRoundedIcon/>} checkedIcon={<CheckCircleRoundedIcon/>} size="small" disabled/>
                </ListItem>
              </List>
              <Box display='flex' justifyContent="center" sx={{ pb: 2}}>
                <Button variant="contained">Unarchive</Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </AppLayout>
  )
};

export default Archive;
