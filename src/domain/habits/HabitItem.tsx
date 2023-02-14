import React, { useCallback, useState } from 'react';
import { Box, Grid, IconButton, ListItem, ListItemText, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { patchHabitReps, PatchHabitRequestParams } from './habitActions';

type Props = {
    id: number;
    title: string;
    reps: number;
    updateReps: (id: number, params: PatchHabitRequestParams) => void;
};

const HabitItem: React.FC<Props> = (props) => {
    const { id, title, reps, updateReps } = props;
    const [repCount, setRepCount] = useState<number | undefined>(undefined);

    const handleUpdateRepsClick = useCallback(
        () => {
            updateReps(id, { reps: 1 });
            const newRepCount = repCount + 1
            setRepCount(newRepCount);
        },
        [patchHabitReps],
    );

    return (
        <ListItem divider={true} sx={{ display: 'flex', justifyContent: 'space-between', minWidth: 250 }}>
            <ListItemText sx={{ pl: 1, pr: 2 }} disableTypography={false}>
                <Typography variant="body2">
                    {props.title}
                </Typography>
                <Typography variant="body2">
                    {props.reps}
                </Typography>
            </ListItemText>
            <IconButton color="primary" onClick={handleUpdateRepsClick}><AddIcon /></IconButton>
        </ListItem>
    );
};

export default HabitItem;
