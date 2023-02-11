import { Box, Breadcrumbs, Button, Card, Grid, Fab, Divider, Link, List, ListItem, ListItemButton, ListItemText, ListItemIcon,
  IconButton, Checkbox, Typography, Paper, TextField, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import AppLayout from '../layout/AppLayout';
import { makeRoutes } from '../navigation/routes';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip/Tooltip';
import PostChecklistFormDialog from '../domain/checklists/PostChecklistFormDialog';
import PostCategoryFormDialog from '../domain/categories/PostCategoryFormDialog';
import PostTaskFormDialog from '../domain/tasks/PostTaskFormDialog';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoreTaskContextMenu from '../domain/tasks/MoreTaskContextMenu';
import MoreChecklistContextMenu from '../domain/checklists/MoreChecklistContextMenu';

const Dashboard: React.FC = () => {
  const routes = makeRoutes();

  const [createCategoryOpen, setCreateCategoryOpen] = useState(false);
  const [createChecklistOpen, setCreateChecklistOpen] = useState(false);

  const [checklistAnchorEl, setChecklistAnchorEl] = React.useState<null | HTMLElement>(null);
  const openChecklist = Boolean(checklistAnchorEl);
  const handleChecklistClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setChecklistAnchorEl(event.currentTarget);
  };
  const handleChecklistClose = () => {
    setChecklistAnchorEl(null);
  };

  const [taskAnchorEl, setTaskAnchorEl] = React.useState<null | HTMLElement>(null);
  const openTask = Boolean(taskAnchorEl);
  const handleTaskClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setTaskAnchorEl(event.currentTarget);
  };
  const handleTaskClose = () => {
    setTaskAnchorEl(null);
  };


  const handleCreateCategoryOpen = () => {
    setCreateCategoryOpen(true);
  }

  const handleCreateCategoryClose = () => {
    setCreateCategoryOpen(false);
  }

  const handleCreateChecklistOpen = () => {
    setCreateChecklistOpen(true);
  }

  const handleCreateChecklistClose = () => {
    setCreateChecklistOpen(false);
  }


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
      <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={handleCreateCategoryOpen}>Add Category</Button>
      <PostCategoryFormDialog open={createCategoryOpen} onClose={handleCreateCategoryClose} />
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
                    Checklist Title
                  </Typography>
                  <IconButton sx={{ gridColumn: 3}} onClick={handleChecklistClick}><MoreHorizRoundedIcon/></IconButton>
                  <MoreChecklistContextMenu
                      anchorEl={checklistAnchorEl}
                      open={openChecklist}
                      onClose={handleChecklistClose}
                    />
                  <Typography sx={{ fontSize: '.9em', pb: 3}}>
                    List description
                  </Typography>
                </Box>
                <List sx={{
                  pb: 3,
                }}>
                  <ListItem divider={true}>
                    <Tooltip title="mark in progress">
                      <Checkbox size="small"/>
                    </Tooltip>
                    <ListItemText sx={{ pl: 1, pr: 2}} disableTypography={false}>
                      <Typography variant="body2">
                        A sample task title
                      </Typography>
                    </ListItemText>
                    <Tooltip title="mark complete"><Checkbox icon={<CheckCircleOutlineRoundedIcon/>} checkedIcon={<CheckCircleRoundedIcon/>} size="small"/></Tooltip>
                    <IconButton size="small" onClick={handleTaskClick}><MoreVertIcon/></IconButton>
                    <MoreTaskContextMenu
                      anchorEl={taskAnchorEl}
                      open={openTask}
                      onClose={handleTaskClose}
                    />
                  </ListItem>
                  <ListItem divider={true}>
                    <Tooltip title="mark in progress">
                      <Checkbox size="small"/>
                    </Tooltip>
                    <ListItemText sx={{ pl: 1, pr: 2}} disableTypography={false}>
                      <Typography variant="body2">
                        Yet another sample task title
                      </Typography>
                    </ListItemText>
                    <Tooltip title="mark complete"><Checkbox icon={<CheckCircleOutlineRoundedIcon/>} checkedIcon={<CheckCircleRoundedIcon/>} size="small"/></Tooltip>
                    <Tooltip title="more"><IconButton size="small"><MoreVertIcon/></IconButton></Tooltip>
                  </ListItem>
                  <ListItem>
                    <TextField id="filled-basic" label="add task" variant="filled" sx={{ pt: 2, width: "100%"}}/>
                  </ListItem>
                </List>
                <Box display='flex' justifyContent="space-between" sx={{ pb: 2}}>
                  <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                  <Button variant="contained">Archive</Button>
                </Box>
              </Paper>
          </Grid>
          <Grid item>
            <Tooltip title="Add checklist">
              <Fab color="primary" onClick={handleCreateChecklistOpen}>
                <AddIcon />
              </Fab>
            </Tooltip>
            <PostChecklistFormDialog open={createChecklistOpen} onClose={handleCreateChecklistClose}/>
          </Grid>
        </Grid>
      </Box>
    </AppLayout>
  )
};

export default Dashboard;
