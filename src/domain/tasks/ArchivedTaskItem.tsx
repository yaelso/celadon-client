import React from 'react';
import { Box, Checkbox, ListItem, ListItemText, Typography } from "@mui/material";
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

type Props = {
    id: number;
    title: string;
};

const ArchivedTaskItem: React.FC<Props> = (props) => {
    return (
        <ListItem divider={true}>
            <Checkbox size="small" edge="start" disabled />
            <ListItemText sx={{ pl: 1, pr: 2 }} disableTypography={false}>
                <Typography variant="body2">
                    {props.title}
                </Typography>
            </ListItemText>
            <Checkbox icon={<CheckCircleOutlineRoundedIcon />} checkedIcon={<CheckCircleRoundedIcon />} size="small" disabled />
        </ListItem>
    );
};

export default ArchivedTaskItem;
