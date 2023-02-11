import AppNavbar from './AppNavbar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Logout from '@mui/icons-material/Logout';
import { Avatar, Box, Badge, Container, IconButton, InputBase, Menu, MenuItem, Typography, Toolbar, Divider } from '@mui/material/';
import { AppSidebar } from './AppSidebar';
import React, { useState, useCallback } from 'react';
import { ThemeProvider, styled, alpha } from '@mui/material/styles';
import { theme } from '../themes/theme';
import { makeRoutes } from '../navigation/routes';
import { Link } from 'react-router-dom';
import { COLORS } from '../themes/colors';
import { signOutOfCeladon } from '../firebase';


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
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const toggleSidebar = useCallback(
    () => setSidebarOpen(prev => !prev),
    [],
  );

  const toggleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const routes = makeRoutes();


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
              onClick={toggleMenu}
            >
              <AccountCircle />
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { sm: 'block', paddingLeft: 12 } }}>
                {localStorage.getItem("name")}
              </Typography>
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  padding: 1,
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    left: 75,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                }
              }}
            >
              <MenuItem onClick={handleClose}><Avatar alt={localStorage.getItem("name")} src={localStorage.getItem("profilePic")}/><Link to={routes.Profile} style={{ color: COLORS.GREY_TEXT, textDecoration: 'none' }}>Profile</Link></MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}><Logout sx={{marginRight: 1}}/><Link to={routes.Root} style={{ color: COLORS.GREY_TEXT, textDecoration: 'none' }} onClick={signOutOfCeladon}>Signout</Link></MenuItem>
            </Menu>
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
