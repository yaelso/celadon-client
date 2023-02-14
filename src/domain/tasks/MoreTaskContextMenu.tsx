import * as React from 'react';
import { ListItemText, Menu, MenuItem, Typography } from '@mui/material';
import { deleteTask } from './taskActions';
import { useCallback } from 'react';


type Props = {
  id: number;
  anchorEl: Element;
  open: boolean;
  onClose: () => void;
  removeTask: (id: number) => void;
};


const MoreTaskContextMenu: React.FC<Props> = props => {
  const { id, removeTask, onClose } = props;

  const handleDeleteTaskClick = useCallback(
    () => {
      removeTask(id);
      onClose();
    },
    [deleteTask, id]
  )

  return (
    <Menu
      id="task-menu"
      anchorEl={props.anchorEl}
      open={props.open}
      onClose={props.onClose}
    >
      <MenuItem onClick={props.onClose}>
        <ListItemText disableTypography={false}>
          <Typography fontSize="small">Schedule Task</Typography>
        </ListItemText>
      </MenuItem>
      <MenuItem onClick={handleDeleteTaskClick}>
        <ListItemText disableTypography={false}>
          <Typography fontSize="small">Delete Task</Typography>
        </ListItemText>
      </MenuItem>
    </Menu>
  );
};

export default MoreTaskContextMenu;
