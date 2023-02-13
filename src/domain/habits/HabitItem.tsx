import React from 'react';
import { Box, Grid, IconButton, ListItem, ListItemText, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

type Props = {
    title: string;
};

const HabitItem: React.FC<Props> = (props) => {
    return (
        <ListItem divider={true} sx={{ display: 'flex', justifyContent: 'space-between', minWidth: 250 }}>
            <ListItemText sx={{ pl: 1, pr: 2 }} disableTypography={false}>
                <Typography variant="body2">
                    {props.title}
                </Typography>
            </ListItemText>
            <IconButton color="primary"><AddIcon /></IconButton>
        </ListItem>
    );
};

export default HabitItem;
