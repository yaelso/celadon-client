import * as React from 'react';
import { ListItemText, Menu, MenuItem, Typography } from '@mui/material';


type Props = {
  anchorEl: Element;
  open: boolean;
  onClose: () => void;
};


const MoreChecklistContextMenu: React.FC<Props> = props => {
    return (
    <Menu
        id="checklist-menu"
        anchorEl={props.anchorEl}
        open={props.open}
        onClose={props.onClose}
      >
        <MenuItem onClick={props.onClose}>
          <ListItemText disableTypography={false}>
            <Typography fontSize="small">Delete Checklist</Typography>
          </ListItemText>
        </MenuItem>
      </Menu>
    );
};

export default MoreChecklistContextMenu;
