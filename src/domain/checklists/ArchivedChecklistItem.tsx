import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { Box, Button, Grid, IconButton, List, Paper, Typography } from "@mui/material";
import React, { useCallback } from 'react';
import ArchivedTaskItem from '../tasks/ArchivedTaskItem';
import { Task } from '../tasks/models';
import { archiveChecklist, unarchiveChecklist } from './checklistActions';
import MoreChecklistContextMenu from './MoreChecklistContextMenu';

type Props = {
  id: number;
  title: string;
  description: string;
  isArchived: boolean;
  tasks: Task[];
  removeChecklist: (id: number) => void;
  tagChecklistArchive: (id: number) => void;
  tagChecklistUnarchive: (id: number) => void;
};

const ArchivedChecklistItem: React.FC<Props> = (props) => {
  const { id, isArchived, removeChecklist, tagChecklistArchive, tagChecklistUnarchive } = props;

  const [checklistAnchorEl, setChecklistAnchorEl] = React.useState<null | HTMLElement>(null);
  const openChecklist = Boolean(checklistAnchorEl);

  const handleChecklistClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setChecklistAnchorEl(event.currentTarget);
  };

  const handleChecklistClose = () => {
    setChecklistAnchorEl(null);
  };

  const handleArchiveSubmit = useCallback(
    () => {
      tagChecklistArchive(id);
    },
    [archiveChecklist, id],
  );

  const handleUnarchiveSubmit = useCallback(
    () => {
      tagChecklistArchive(id);
    },
    [unarchiveChecklist, id],
  );

  return (
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
        <List
          sx={{
            pb: 3,
          }}>
          {props.tasks ? (props.tasks.map((task) => (
            <ArchivedTaskItem
              key={`archivedtask-${task.id}`}
              id={task.id}
              title={task.title}
            />
          ))) : "No tasks in this archived list!"}
        </List>
        <Box display='flex' justifyContent="center" sx={{ pb: 2 }}>
          {props.isArchived === true ?
            <Button variant="contained" onClick={handleUnarchiveSubmit}>Unarchive</Button>
            : <Button variant="contained" onClick={handleArchiveSubmit}>Archive</Button>}
        </Box>
      </Paper>
    </Grid>
  );
};

export default ArchivedChecklistItem;
