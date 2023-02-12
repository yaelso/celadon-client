import React, { useState } from 'react';
import { Box, Divider, Fab, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { useSnackbar } from 'notistack';
import { PostChecklistParams, postChecklist } from '../checklists/checklistActions';
import { Checklist } from '../checklists/models';
import ChecklistItem from '../checklists/ChecklistItem';
import PostChecklistFormDialog from '../checklists/PostChecklistFormDialog';
import AddIcon from '@mui/icons-material/Add';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';


// const makeChecklistComponents = (checklists: Checklist[]) => {
//     checklists.map(c => <Checklists />);
//   }

//   const makeTaskComponents = (tasks: Task[]) => {
//     tasks.map(c => <Tasks />);
//   }

// const makeChecklistComponents = (checklists: Checklist[]) => {
//     checklists.map(c =>
//     <Checklist
//         anchorEl={checklistAnchorEl}
//         open={openChecklist}
//         onClose={handleChecklistClose}
//     />);
// }

type Props = {
    title: string;
    description: string;
    checklists: Checklist[];
};

const CategoryItem: React.FC<Props> = (props) => {
    // const snackbar = useSnackbar();

    // const [checklists, setChecklists] = useState(undefined);

    // const [checklistTitle, setChecklistTitle] = useState<string | undefined>();
    // const [checklistDesc, setChecklistDesc] = useState<string | undefined>();

    // const [createChecklistOpen, setCreateChecklistOpen] = useState(false);

    // const [checklistAnchorEl, setChecklistAnchorEl] = React.useState<null | HTMLElement>(null);
    // const openChecklist = Boolean(checklistAnchorEl);

    // Checklist Bits
    // const postNewChecklist = (params: PostChecklistParams) => postChecklist(jwt, params)
    //     .then(res => setChecklists(prev => {
    //         [res.data].concat(prev);
    //         snackbar.enqueueSnackbar('Checklist successfully created!', { variant: 'success' });
    //     }))
    //     .catch(() => snackbar.enqueueSnackbar('Checklist creation failed!', { variant: 'error' }));

    // const handleChecklistClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    //     setChecklistAnchorEl(event.currentTarget);
    // };

    // const handleChecklistClose = () => {
    //     setChecklistAnchorEl(null);
    // };

    // const handleCreateChecklistOpen = () => {
    //     setCreateChecklistOpen(true);
    // };

    // const handleCreateChecklistClose = () => {
    //     setCreateChecklistOpen(false);
    // };

    // const handleCreateChecklistSubmit = () => {
    // postNewChecklist({title: checklistTitle ?? '', description: checklistDesc ?? '', category_id: undefined});
    // setCreateChecklistOpen(false);
    // };

    return (
        <Box sx={{
            pb: 10
        }}>
            <Box sx={{ display: 'flex', alignItems: 'baseline'}}>
                <Typography variant="h5" sx={{pt: 5, pb: 1}}>
                    {props.title}
                </Typography>
                <IconButton><DeleteRoundedIcon /></IconButton>
            </Box>
            <Typography sx={{pb: 2}}>
                {props.description}
            </Typography>
            <Divider />
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12}} sx={{pt: 5, justifyContent: 'center'}}>
                {!!props.checklists?.length ? (props.checklists.map((checklist) => (
                    <ChecklistItem
                        key={`checklist-${checklist.id}`}
                        title={checklist.title}
                        description={checklist.description}
                        tasks={checklist.tasks}
                    />
                ))) : "No current checklists!"}
            </Grid>
            <Grid item>
                <Tooltip title="Add checklist">
                    {/* <Fab color="primary" onClick={handleCreateChecklistOpen}> */}
                    <Fab color="primary">
                        <AddIcon />
                    </Fab>
                </Tooltip>
                {/* <PostChecklistFormDialog open={createChecklistOpen} onClose={handleCreateChecklistClose} onClickSubmit={handleCreateChecklistSubmit} onChangeTitle={setChecklistTitle} onChangeDesc={setCategoryDesc} /> */}
            </Grid>
        </Box>
    );
};

export default CategoryItem;
