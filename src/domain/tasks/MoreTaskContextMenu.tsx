import * as React from 'react';
import { ListItemText, Menu, MenuItem, Typography } from '@mui/material';


type Props = {
  anchorEl: Element;
  open: boolean;
  onClose: () => void;
};


const MoreTaskContextMenu: React.FC<Props> = props => {
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
        <MenuItem onClick={props.onClose}>
          <ListItemText disableTypography={false}>
            <Typography fontSize="small">Delete Task</Typography>
          </ListItemText>
        </MenuItem>
      </Menu>
    );
};

export default MoreTaskContextMenu;
