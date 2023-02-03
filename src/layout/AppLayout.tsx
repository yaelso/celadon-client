import AppNavbar from './AppNavbar';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import { AppSidebar } from './AppSidebar';
import React, { useState, useCallback } from 'react';


interface Props extends React.PropsWithChildren {}


const AppLayout: React.FC<Props> = props => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = useCallback(
    () => setSidebarOpen(prev => !prev),
    [],
  );

  return (
    <>
      <AppNavbar>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <MenuIcon onClick={toggleSidebar} />
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0 16px' }}>
            <span style={{ fontWeight: 600 }}>Celadon</span>
          </div>
        </div>
      </AppNavbar>
      <Container component='main'>
        <AppSidebar isOpen={sidebarOpen} toggleDrawer={toggleSidebar} />
        <div>
          {props.children}
        </div>
      </Container>
    </>
  );
};

export default AppLayout;
