import React from 'react';
import { Box, Checkbox, IconButton, ListItem, ListItemText, Tooltip, Typography } from "@mui/material";
import MoreTaskContextMenu from './MoreTaskContextMenu';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';

type Props = {
    title: string;
};

const ScheduledTaskItem: React.FC<Props> = (props) => {
    return (
        <ListItem divider={true}>
            <Tooltip title="mark in progress">
                <Checkbox size="small" />
            </Tooltip>
            <ListItemText sx={{ pl: 1, pr: 2 }} disableTypography={false}>
                <Typography variant="body2">
                    {props.title}
                </Typography>
            </ListItemText>
            <Tooltip title="mark complete"><Checkbox icon={<CheckCircleOutlineRoundedIcon />} checkedIcon={<CheckCircleRoundedIcon />} size="small" /></Tooltip>
            {/* <IconButton size="small" onClick={props.handleTaskClick}><MoreVertIcon/></IconButton> */}
            {/* <MoreTaskContextMenu
                anchorEl={props.taskAnchorEl}
                open={props.openTask}
                onClose={props.handleTaskClose}
            /> */}
        </ListItem>
    );
};

export default ScheduledTaskItem;
