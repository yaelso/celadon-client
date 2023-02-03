import React from 'react';
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemButton, ListItemText } from '@mui/material';
import Home from '@mui/icons-material/Home';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Analytics from '@mui/icons-material/Analytics';
import { makeRoutes } from '../navigation/routes';
import { Link } from 'react-router-dom';
import { COLORS } from '../themes/colors';


type Props = {
  isOpen: boolean;
  toggleDrawer: () => void;
}

export const AppSidebar: React.FC<Props> = props => {
  const routes = makeRoutes();

  return (
    <Drawer
      anchor='left'
      open={props.isOpen}
      onClose={props.toggleDrawer}
      sx={{ zIndex: 2 }}
    >
      <Divider />
      <List>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary={<Link to={routes.Root} style={{ color: COLORS.GREEN_DARKER, textDecoration: 'none' }}>Home</Link>} />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <Analytics />
            </ListItemIcon>
            <ListItemText primary={<Link to={routes.Dashboard} style={{ color: COLORS.GREEN_DARKER, textDecoration: 'none' }}>Dashboard</Link>} />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary={<Link to={routes.Profile} style={{ color: COLORS.GREEN_DARKER, textDecoration: 'none' }}>Profile</Link>} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};
