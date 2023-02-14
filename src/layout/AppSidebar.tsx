import React from 'react';
import { Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemButton, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import Home from '@mui/icons-material/Home';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Dashboard from '@mui/icons-material/Dashboard';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ViewCozy from '@mui/icons-material/ViewCozy';
import Archive from '@mui/icons-material/Archive';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { makeRoutes } from '../navigation/routes';
import { Link, useNavigate } from 'react-router-dom';
import { COLORS } from '../themes/colors';
import { signOutOfCeladon } from '../firebase';


type Props = {
  isOpen: boolean;
  toggleDrawer: () => void;
}

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export const AppSidebar: React.FC<Props> = props => {
  const routes = makeRoutes();

  return (
    <Drawer
      anchor='left'
      variant='persistent'
      open={props.isOpen}
      onClose={props.toggleDrawer}
      sx={{
        zIndex: 2,
        flexShrink: 0,
      }}
    >
      <DrawerHeader>
        <IconButton onClick={props.toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
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
              <Dashboard />
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
        <Divider />
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <ViewCozy />
            </ListItemIcon>
            <ListItemText primary={<Link to={routes.Pokedex} style={{ color: COLORS.GREEN_DARKER, textDecoration: 'none' }}>Pokedex</Link>} />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <Archive />
            </ListItemIcon>
            <ListItemText primary={<Link to={routes.Archive} style={{ color: COLORS.GREEN_DARKER, textDecoration: 'none' }}>Archive</Link>} />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <LogoutRoundedIcon />
            </ListItemIcon>
            <ListItemText primary={<Link to={routes.Root} style={{ color: COLORS.GREEN_DARKER, textDecoration: 'none' }} onClick={signOutOfCeladon}>Sign Out</Link>} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};
