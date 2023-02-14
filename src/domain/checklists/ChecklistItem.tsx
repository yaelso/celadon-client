import React, { useCallback, useState } from 'react';
import { Box, Button, Checkbox, Grid, IconButton, List, ListItem, ListItemText, Paper, TextField, Tooltip, Typography } from "@mui/material";
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import MoreTaskContextMenu from '../tasks/MoreTaskContextMenu';
import MoreChecklistContextMenu from './MoreChecklistContextMenu';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { Checklist } from './models';
import { Task } from '../tasks/models';
import TaskItem from '../tasks/TaskItem';
import { archiveChecklist, deleteChecklist, favoriteChecklist, unarchiveChecklist, unfavoriteChecklist } from './checklistActions';
import { PatchDueDateRequestParams, PostTaskParams } from '../tasks/taskActions';


type Props = {
    id: number;
    title: string;
    description: string;
    isFavorited: boolean;
    tasks: Task[];
    removeChecklist: (id: number) => void;
    tagChecklistFavorite: (id: number) => void;
    tagChecklistUnfavorite: (id: number) => void;
    tagChecklistArchive: (id: number) => void;
    addTask: (params: PostTaskParams) => void;
    removeTask: (id: number) => void;
    tagTaskInProgress: (id: number) => void;
    tagTaskNotInProgress: (id: number) => void;
    tagTaskComplete: (id: number) => void;
    tagTaskIncomplete: (id: number) => void;
    assignDueDate: (id: number, params: PatchDueDateRequestParams) => void;
    removeDueDate: (id: number) => void;
};


const ChecklistItem: React.FC<Props> = (props) => {
    const { id, removeChecklist, tagChecklistFavorite, tagChecklistUnfavorite, tagChecklistArchive, addTask, removeTask,
        tagTaskInProgress, tagTaskNotInProgress, tagTaskComplete, tagTaskIncomplete, assignDueDate, removeDueDate
    } = props;

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

    const handleChangeTaskTitle = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const titleText = event.target.value;
        setTaskTitle(titleText);
    }

    // event.preventDefault();

    const handleCreateTaskSubmit = useCallback(
        () => {
            addTask({ title: taskTitle, checklist_id: id });
        },
        [addTask, taskTitle, id],
    );

    const handleFavoriteSubmit = useCallback(
        () => {
            tagChecklistFavorite(id);
        },
        [favoriteChecklist, id],
    );

    const handleUnfavoriteSubmit = useCallback(
        () => {
            tagChecklistUnfavorite(id);
        },
        [unfavoriteChecklist, id],
    );

    const handleArchiveSubmit = useCallback(
        () => {
            tagChecklistArchive(id);
        },
        [archiveChecklist, id],
    );

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
                            isComplete={task.is_complete}
                            isInProgress={task.in_progress}
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
                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', pb: 3 }}>
                    <TextField
                        required
                        focused
                        id="submit-task-textfield"
                        label="Task"
                        variant="outlined"
                        sx={{ pb: 2 }}
                        size="small"
                        onBlur={handleChangeTaskTitle}
                    />
                    <Button onClick={handleCreateTaskSubmit}>Add a Task</Button>
                </Box>
                <Box display='flex' justifyContent="space-between" sx={{ pb: 2 }}>
                    {props.isFavorited == true ?
                        <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} onClick={handleUnfavoriteSubmit} defaultChecked={true} />
                        : <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} onClick={handleFavoriteSubmit} />}
                    <Button variant="contained" onClick={handleArchiveSubmit}>Archive</Button>
                </Box>
            </Paper>
        </Grid>
    );
};

export default ChecklistItem;
