import AppNavbar from './AppNavbar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Box, Badge, Container, IconButton, InputBase, Typography, Toolbar } from '@mui/material/';
import { AppSidebar } from './AppSidebar';
import React, { useState, useCallback } from 'react';
import { ThemeProvider, styled, alpha } from '@mui/material/styles';
import { theme } from '../themes/forms';


interface Props extends React.PropsWithChildren {}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

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
            variant="h5"
            noWrap
            component="div"
            sx={{ display: { sm: 'block', fontWeight: 600, } }}>
            CELADON
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search..."
            />
          </Search>
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
