import { Box, Breadcrumbs, Button, Card, Grid, Divider, Link, List, ListItem, ListItemButton, ListItemText, ListItemIcon, IconButton, Checkbox, Typography, Paper } from '@mui/material';
import React from 'react';
import AppLayout from '../layout/AppLayout';
import { makeRoutes } from '../navigation/routes';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

const Dashboard: React.FC = () => {
  const routes = makeRoutes();

  return (
    <AppLayout>
      <Box>
        <Breadcrumbs sx={{pt: 5, pb: 2}}>
          <Link underline="hover" color="inherit" href={routes.Root}>
            Home
          </Link>
          <Typography color="text.primary">Dashboard</Typography>
        </Breadcrumbs>
      </Box>
      <Button variant="contained" startIcon={<AddRoundedIcon />}>Add Category</Button>
      <Box>
        <Typography variant="h5" sx={{pt: 5, pb: 1}}>
          {"Category Name"}
        </Typography>
        <Typography sx={{pb: 2}}>
          {"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "}
        </Typography>
        <Divider />
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12}} sx={{pt: 5, justifyContent: 'center'}}>
          <Grid item>
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
                      <Checkbox size="small"/>
                      <ListItemText primary={"task title 1"} sx={{ pl: 1, pr: 2}}/>
                      <Checkbox icon={<CheckCircleOutlineRoundedIcon/>} checkedIcon={<CheckCircleRoundedIcon/>} size="small"/>
                      <IconButton size="small"><DeleteOutlineRoundedIcon /></IconButton>
                  </ListItem>
                  <ListItem divider={true}>
                      <Checkbox size="small"/>
                      <ListItemText primary={"task title 1"} sx={{ pl: 1, pr: 2}}/>
                      <Checkbox icon={<CheckCircleOutlineRoundedIcon/>} checkedIcon={<CheckCircleRoundedIcon/>} size="small"/>
                      <IconButton size="small"><DeleteOutlineRoundedIcon /></IconButton>
                  </ListItem>
                </List>
                <Box display='flex' justifyContent="space-between" sx={{ pb: 2}}>
                  <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                  <Button variant="outlined">Archive</Button>
                </Box>
              </Paper>
          </Grid>
        </Grid>
      </Box>
    </AppLayout>
  )
};

export default Dashboard;
