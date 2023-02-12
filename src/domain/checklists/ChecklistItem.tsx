import React from 'react';
import { Box, Button, Checkbox, Grid, IconButton, List, ListItem, ListItemText, Paper, TextField, Tooltip, Typography } from "@mui/material";
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import MoreTaskContextMenu from '../tasks/MoreTaskContextMenu';
import MoreChecklistContextMenu from './MoreChecklistContextMenu';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { Checklist } from './models';
import { Task } from '../tasks/models';
import TaskItem from '../tasks/TaskItem';

// // const makeChecklistComponents = (checklists: Checklist[]) => {
// //     checklists.map(c => <Checklists />);
// //   }

// //   const makeTaskComponents = (tasks: Task[]) => {
// //     tasks.map(c => <Tasks />);
// //   }

type Props = {
    title: string;
    description: string;
    tasks: Task[];
};


const ChecklistItem: React.FC<Props> = (props) => {
    return (
        <Grid item>
            <Paper sx={{ pl: 3, pr: 3 }}>
                <Box display="grid" justifyContent="space-between">
                    <Typography sx={{pt: 2, pb: 1}} textAlign='left'>
                        {props.title}
                    </Typography>
                    <IconButton sx={{ gridColumn: 3}}><MoreHorizRoundedIcon/></IconButton>
                    {/* <IconButton sx={{ gridColumn: 3}} onClick={handleChecklistClick}><MoreHorizRoundedIcon/></IconButton>
                    <MoreChecklistContextMenu
                        anchorEl={checklistAnchorEl}
                        open={openChecklist}
                        onClose={handleChecklistClose}
                    /> */}
                    <Typography sx={{ fontSize: '.9em', pb: 3}}>
                        {props.description}
                    </Typography>
                </Box>
                <List sx={{
                    pb: 3,
                }}
                >
                    {props.tasks ? (props.tasks.map((task) => (
                        <TaskItem
                            title={task.title}
                        />
                    ))) : "No current tasks!"}
                </List>
                <Box display='flex' justifyContent="space-between" sx={{ pb: 2}}>
                    <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                    <Button variant="contained">Archive</Button>
                </Box>
            </Paper>
        </Grid>
    );
};

export default ChecklistItem;
