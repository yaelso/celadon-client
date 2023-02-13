import React from 'react';
import { Box, Button, Checkbox, Grid, IconButton, List, Paper, Typography } from "@mui/material";
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import TaskItem from '../tasks/TaskItem';
import MoreTaskContextMenu from '../tasks/MoreTaskContextMenu';
import MoreChecklistContextMenu from './MoreChecklistContextMenu';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { Task } from '../tasks/models';

type Props = {
    title: string;
    description: string;
    // tasks: Task[];
};

const FavoritedChecklistItem: React.FC<Props> = (props) => {
    return (
        <Box>
            <Grid item>
                <Paper sx={{ pl: 3, pr: 3 }}>
                    <Box display="grid" justifyContent="space-between">
                        <Typography sx={{ pt: 2, pb: 1 }} textAlign='left'>
                            {props.title}
                        </Typography>
                        <IconButton sx={{ gridColumn: 3 }}><MoreHorizRoundedIcon /></IconButton>
                        {/* <IconButton sx={{ gridColumn: 3}} onClick={handleChecklistClick}><MoreHorizRoundedIcon/></IconButton>
                        <MoreChecklistContextMenu
                            anchorEl={checklistAnchorEl}
                            open={openChecklist}
                            onClose={handleChecklistClose}
                        /> */}
                        <Typography sx={{ fontSize: '.9em', pb: 3 }}>
                            {props.description}
                        </Typography>
                    </Box>
                    <List sx={{
                        pb: 3,
                    }}
                    >
                        {/* {props.tasks ? (props.tasks.map((task) => (
                            <TaskItem
                                title={task.title}
                            />
                        ))) : "No current tasks!"} */}
                    </List>
                    <Box display='flex' justifyContent="space-between" sx={{ pb: 2 }}>
                        <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} defaultChecked />
                        <Button variant="contained">Archive</Button>
                    </Box>
                </Paper>
            </Grid>
        </Box>
    );
};

export default FavoritedChecklistItem;
