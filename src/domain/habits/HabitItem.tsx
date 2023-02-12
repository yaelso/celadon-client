import React from 'react';
import { Box, Grid, ListItem, ListItemText, Typography } from "@mui/material";

type Props = {
    title: string;
};

const HabitItem: React.FC<Props> = (props) => {
    return (
        <ListItem divider={true}>
            <ListItemText sx={{ pl: 1, pr: 2}} disableTypography={false}>
                <Typography variant="body2">
                    {props.title}
                </Typography>
            </ListItemText>
        </ListItem>
    );
};

export default HabitItem;
