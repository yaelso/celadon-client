import * as React from 'react';
import { ListItemText, Menu, MenuItem, Typography } from '@mui/material';
import { useCallback } from 'react';
import { deleteChecklist } from './checklistActions';


type Props = {
  id: number;
  anchorEl: Element;
  open: boolean;
  onClose: () => void;
  removeChecklist: (id: number) => void;
};


const MoreChecklistContextMenu: React.FC<Props> = props => {
  const { id, removeChecklist, onClose } = props;

  const handleDeleteChecklistClick = useCallback(
    () => {
      removeChecklist(id);
      onClose();
    },
    [deleteChecklist, id]
  )

  return (
    <Menu
      id="checklist-menu"
      anchorEl={props.anchorEl}
      open={props.open}
      onClose={props.onClose}
    >
      {/* <MenuItem onClick={() => removeChecklist}> */}
      <MenuItem onClick={handleDeleteChecklistClick}>
        <ListItemText disableTypography={false}>
          <Typography fontSize="small">Delete Checklist</Typography>
        </ListItemText>
      </MenuItem>
    </Menu>
  );
};

export default MoreChecklistContextMenu;
