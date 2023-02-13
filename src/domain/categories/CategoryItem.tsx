import React, { useCallback, useState } from 'react';
import { Box, Divider, Fab, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { useSnackbar } from 'notistack';
import { PostChecklistParams, postChecklist } from '../checklists/checklistActions';
import { Checklist } from '../checklists/models';
import ChecklistItem from '../checklists/ChecklistItem';
import PostChecklistFormDialog from '../checklists/PostChecklistFormDialog';
import AddIcon from '@mui/icons-material/Add';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { useLocalStorage } from '../../applicationState/hooks';
import { deleteCategory, fetchCategories } from './categoryActions';
import { PostTaskParams } from '../tasks/taskActions';

type Props = {
    id: number;
    title: string;
    description: string;
    removeCategory: (id: number) => void;
    checklists: Checklist[];
    addChecklist: (params: PostChecklistParams) => void;
    removeChecklist: (id: number) => void;
    addTask: (params: PostTaskParams) => void;
    removeTask: (id: number) => void;
};

const CategoryItem: React.FC<Props> = (props) => {
    const { id, addChecklist, removeCategory, removeChecklist, addTask, removeTask } = props;

    // Params for a checklist to be posted if user opens POST form
    const [checklistTitle, setChecklistTitle] = useState<string | undefined>();
    const [checklistDesc, setChecklistDesc] = useState<string | undefined>();

    // Post checklist form dialog toggle
    const [createChecklistOpen, setCreateChecklistOpen] = useState(false);

    const [checklistAnchorEl, setChecklistAnchorEl] = React.useState<null | HTMLElement>(null);
    const openChecklist = Boolean(checklistAnchorEl);

    const handleCreateChecklistOpen = useCallback(
        () => {
            setCreateChecklistOpen(true);
        },
        [setCreateChecklistOpen],
    );

    const handleCreateChecklistClose = useCallback(() => {
        setCreateChecklistOpen(false);
    },
        [setCreateChecklistOpen],
    );

    const handleCreateChecklistSubmit = useCallback(
        () => {
            addChecklist({ title: checklistTitle ?? '', description: checklistDesc ?? '', category_id: id });
            setCreateChecklistOpen(false);
        },
        [addChecklist, checklistDesc, checklistTitle, id, setCreateChecklistOpen],
    );

    const handleDeleteCategoryClick = useCallback(
        () => {
            removeCategory(id);
        },
        [deleteCategory, id]
    )

    return (
        <Box sx={{
            pb: 10
        }}>
            <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                <Typography variant="h5" sx={{ pt: 5, pb: 1 }}>
                    {props.title}
                </Typography>
                <IconButton onClick={handleDeleteCategoryClick}><DeleteRoundedIcon /></IconButton>
            </Box>
            <Typography sx={{ pb: 2 }}>
                {props.description}
            </Typography>
            <Divider />
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ pt: 5, justifyContent: 'center' }}>
                {!!props.checklists?.length ? (props.checklists.map((checklist) => (
                    <ChecklistItem
                        key={`checklist-${checklist.id}`}
                        id={checklist.id}
                        title={checklist.title}
                        description={checklist.description}
                        tasks={checklist.tasks}
                        removeChecklist={removeChecklist}
                        addTask={addTask}
                        removeTask={removeTask}
                    />
                ))) : "No current checklists!"}
            </Grid>
            <Grid item>
                <Tooltip title="Add checklist">
                    <Fab color="primary" onClick={handleCreateChecklistOpen}>
                        <AddIcon />
                    </Fab>
                </Tooltip>
                <PostChecklistFormDialog
                    open={createChecklistOpen}
                    onClose={handleCreateChecklistClose}
                    onClickSubmit={handleCreateChecklistSubmit}
                    onChangeTitle={setChecklistTitle}
                    onChangeDesc={setChecklistDesc}
                />
            </Grid>
        </Box>
    );
};

export default CategoryItem;
