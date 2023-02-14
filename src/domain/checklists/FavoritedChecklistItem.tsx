import React from 'react';
import { Box, Button, Checkbox, Grid, IconButton, List, Paper, Typography } from "@mui/material";
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import TaskItem from '../tasks/TaskItem';
import MoreTaskContextMenu from '../tasks/MoreTaskContextMenu';
import MoreChecklistContextMenu from './MoreChecklistContextMenu';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { Task } from '../tasks/models';
import { PatchDueDateRequestParams } from '../tasks/taskActions';

type Props = {
    id: number;
    title: string;
    description: string;
    tasks: Task[];
    removeChecklist: (id: number) => void;
    removeTask: (id: number) => void;
    tagTaskInProgress: (id: number) => void;
    tagTaskNotInProgress: (id: number) => void;
    tagTaskComplete: (id: number) => void;
    tagTaskIncomplete: (id: number) => void;
    assignDueDate: (id: number, params: PatchDueDateRequestParams) => void;
    removeDueDate: (id: number) => void;
};

const FavoritedChecklistItem: React.FC<Props> = (props) => {
    const { id, removeChecklist, removeTask, tagTaskInProgress, tagTaskNotInProgress, tagTaskComplete, tagTaskIncomplete, assignDueDate, removeDueDate } = props;

    // Anchors
    const [checklistAnchorEl, setChecklistAnchorEl] = React.useState<null | HTMLElement>(null);
    const openChecklist = Boolean(checklistAnchorEl);

    const handleChecklistClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setChecklistAnchorEl(event.currentTarget);
    };

    const handleChecklistClose = () => {
        setChecklistAnchorEl(null);
    };

    return (
        <Box>
            <Grid item>
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
                                key={`favtask-${task.id}`}
                                id={task.id}
                                title={task.title}
                                removeTask={removeTask}
                                tagTaskInProgress={tagTaskInProgress}
                                tagTaskNotInProgress={tagTaskNotInProgress}
                                tagTaskComplete={tagTaskComplete}
                                tagTaskIncomplete={tagTaskIncomplete}
                                assignDueDate={assignDueDate}
                                removeDueDate={removeDueDate}
                            />
                        ))) : "No current tasks!"}
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
