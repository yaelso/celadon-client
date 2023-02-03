import AppNavbar from './AppNavbar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Box, Badge, IconButton, Container, Typography, Toolbar } from '@mui/material/';
import { AppSidebar } from './AppSidebar';
import React, { useState, useCallback } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../themes/forms';


interface Props extends React.PropsWithChildren {}


const AppLayout: React.FC<Props> = props => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const toggleSidebar = useCallback(
    () => setSidebarOpen(prev => !prev),
    [],
  );

  return (
    <ThemeProvider theme={theme}>
      <AppNavbar>
        <Toolbar sx={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            sx={{ mr: 2 }}
          >
            <MenuIcon onClick={toggleSidebar} />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { sm: 'block', fontWeight: 600, } }}>
            CELADON
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0 16px' }}>
            <IconButton
              size='large'
              color='inherit'
            >
              <Badge badgeContent={13} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size='large'
              edge='end'
              color='inherit'
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppNavbar>
      <Container component='main'>
        <AppSidebar isOpen={sidebarOpen} toggleDrawer={toggleSidebar} />
        <div>
          {props.children}
        </div>
      </Container>
    </ThemeProvider>
  );
};

export default AppLayout;
