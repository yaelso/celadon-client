import React, { useCallback, useState } from 'react';
import { Box, Checkbox, IconButton, ListItem, ListItemText, Tooltip, Typography } from "@mui/material";
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import MoreTaskContextMenu from './MoreTaskContextMenu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { markTaskComplete, markTaskIncomplete, markTaskInProgress, markTaskNotInProgress, PatchDueDateRequestParams } from './taskActions';

type Props = {
    id: number;
    title: string;
    isComplete: boolean;
    isInProgress: boolean;
    removeTask: (id: number) => void;
    tagTaskInProgress: (id: number) => void;
    tagTaskNotInProgress: (id: number) => void;
    tagTaskComplete: (id: number) => void;
    tagTaskIncomplete: (id: number) => void;
    assignDueDate: (id: number, params: PatchDueDateRequestParams) => void;
    removeDueDate: (id: number) => void;
};

const TaskItem: React.FC<Props> = (props) => {
    const { id, isComplete, isInProgress, removeTask, tagTaskInProgress, tagTaskNotInProgress,
        tagTaskComplete, tagTaskIncomplete, assignDueDate, removeDueDate } = props;

    // Anchors
    const [taskAnchorEl, setTaskAnchorEl] = React.useState<null | HTMLElement>(null);
    const openTask = Boolean(taskAnchorEl);

    const handleTaskClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setTaskAnchorEl(event.currentTarget);
    };

    const handleTaskClose = () => {
        setTaskAnchorEl(null);
    };

    const handleInProgressClick = useCallback(
        () => {
            tagTaskInProgress(id);
        },
        [markTaskInProgress, id],
    );

    const handleNotInProgressClick = useCallback(
        () => {
            tagTaskNotInProgress(id);
        },
        [markTaskNotInProgress, id],
    );

    const handleCompleteClick = useCallback(
        () => {
            tagTaskComplete(id);
        },
        [markTaskComplete, id],
    );

    const handleIncompleteClick = useCallback(
        () => {
            tagTaskIncomplete(id);
        },
        [markTaskIncomplete, id],
    );

    return (
        <ListItem divider={true}>
            {isInProgress === true ?
                <Tooltip title="mark in progress">
                    <Checkbox size="small" edge="start" onClick={handleNotInProgressClick} defaultChecked />
                </Tooltip> :
                <Tooltip title="mark in progress">
                    <Checkbox size="small" edge="start" onClick={handleInProgressClick} />
                </Tooltip>
            }
            <ListItemText sx={{ pl: 1, pr: 2 }} disableTypography={false}>
                <Typography variant="body2">
                    {props.title}
                </Typography>
            </ListItemText>
            {isComplete === true ?
                <Tooltip title="mark complete"><Checkbox icon={<CheckCircleOutlineRoundedIcon />} checkedIcon={<CheckCircleRoundedIcon />} size="small" onClick={handleIncompleteClick} defaultChecked /></Tooltip> :
                <Tooltip title="mark complete"><Checkbox icon={<CheckCircleOutlineRoundedIcon />} checkedIcon={<CheckCircleRoundedIcon />} size="small" onClick={handleCompleteClick} /></Tooltip>}
            <IconButton size="small" onClick={handleTaskClick}><MoreVertIcon /></IconButton>
            <MoreTaskContextMenu
                id={id}
                anchorEl={taskAnchorEl}
                open={openTask}
                onClose={handleTaskClose}
                removeTask={removeTask}
            />
        </ListItem >
    );
};

export default TaskItem;
