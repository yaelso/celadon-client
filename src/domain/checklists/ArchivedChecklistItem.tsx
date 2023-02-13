import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { Box, Button, Grid, IconButton, List, Paper, Typography } from "@mui/material";
import React from 'react';
import ArchivedTaskItem from '../tasks/ArchivedTaskItem';
import { Task } from '../tasks/models';

type Props = {
  title: string;
  description: string;
  // tasks: Task[];
};

const ArchivedChecklistItem: React.FC<Props> = (props) => {
  return (
    <Grid item>
      <Paper sx={{ pl: 3, pr: 3 }}>
        <Box display="grid" justifyContent="space-between">
          <Typography sx={{ pt: 2, pb: 1 }} textAlign='left'>
            {props.title}
          </Typography>
          <IconButton sx={{ gridColumn: 3 }}><MoreHorizRoundedIcon /></IconButton>
          <Typography sx={{ fontSize: '.9em', pb: 3 }}>
            {props.description}
          </Typography>
        </Box>
        <List
          sx={{
            pb: 3,
          }}>
          {/* {props.tasks ? (props.tasks.map((task) => (
                    <ArchivedTaskItem
                      key={`archivedtask-${task.id}`}
                      title={task.title}
                    />
                ))) : "No tasks in this archived list!"} */}
        </List>
        <Box display='flex' justifyContent="center" sx={{ pb: 2 }}>
          <Button variant="contained">Unarchive</Button>
        </Box>
      </Paper>
    </Grid>
  );
};

export default ArchivedChecklistItem;
