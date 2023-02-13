import React, { useCallback, useState } from 'react';
import { Box, Button, Checkbox, Grid, IconButton, List, ListItem, ListItemText, Paper, TextField, Tooltip, Typography } from "@mui/material";
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import MoreTaskContextMenu from '../tasks/MoreTaskContextMenu';
import MoreChecklistContextMenu from './MoreChecklistContextMenu';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { Checklist } from './models';
import { Task } from '../tasks/models';
import TaskItem from '../tasks/TaskItem';
import { deleteChecklist } from './checklistActions';
import { PostTaskParams } from '../tasks/taskActions';


type Props = {
    id: number;
    title: string;
    description: string;
    tasks: Task[];
    removeChecklist: (id: number) => void;
    addTask: (params: PostTaskParams) => void;
    removeTask: (id: number) => void;
};


const ChecklistItem: React.FC<Props> = (props) => {
    const { id, removeChecklist, addTask, removeTask } = props;

    // Params for a task to be posted, if user opens POST form
    const [taskTitle, setTaskTitle] = useState<string | undefined>();

    // Anchors
    const [checklistAnchorEl, setChecklistAnchorEl] = React.useState<null | HTMLElement>(null);
    const openChecklist = Boolean(checklistAnchorEl);

    const handleChecklistClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setChecklistAnchorEl(event.currentTarget);
    };

    const handleChecklistClose = () => {
        setChecklistAnchorEl(null);
    };

    // const handleDeleteChecklistClick = useCallback(
    //     () => {
    //         removeChecklist(id);
    //         handleChecklistClose();
    //     },
    //     [deleteChecklist, id]
    // )


    return (
        <Grid item sx={{ minWidth: 300, minHeight: 300 }}>
            <Paper sx={{ pl: 3, pr: 3 }}>
                <Box display="grid" justifyContent="space-between">
                    <Typography sx={{ pt: 2, pb: 1 }} textAlign='left'>
                        {props.title}
                    </Typography>
                    <IconButton sx={{ gridColumn: 3 }} onClick={handleChecklistClick}><MoreHorizRoundedIcon /></IconButton>
                    <MoreChecklistContextMenu
                        id={id}
                        anchorEl={checklistAnchorEl}
                        open={openChecklist}
                        onClose={handleChecklistClose}
                        removeChecklist={removeChecklist}
                    />
                    <Typography sx={{ fontSize: '.9em', pb: 3 }}>
                        {props.description}
                    </Typography>
                </Box>
                <List sx={{
                    pb: 3,
                }}
                >
                    {!!props.tasks?.length ? (props.tasks.map((task) => (
                        <TaskItem
                            key={`task-${task.id}`}
                            id={task.id}
                            title={task.title}
                            removeTask={removeTask}
                        />
                    ))) : "No current tasks!"}
                </List>
                <Box display='flex' justifyContent="space-between" sx={{ pb: 2 }}>
                    <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                    <Button variant="contained">Archive</Button>
                </Box>
            </Paper>
        </Grid>
    );
};

export default ChecklistItem;
