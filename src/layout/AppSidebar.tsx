import { Drawer } from '@mui/material';
import React from 'react';
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
      sx={{ zIndex: 2, backgroundColor: COLORS.GREEN_LIGHT }}
    >
      <div style={{ padding: '16px' }}>
      <div style={{ height: '48px' }} />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{padding: '8px' }}>
          <Link to={routes.Dashboard} style={{ color: COLORS.GREEN_DARKER, textDecoration: 'none' }}>Dashboard</Link>
        </div>
        <div style={{ height: '16px' }} />
        <div style={{padding: '8px' }}>
          <Link to={routes.Profile} style={{ color: COLORS.GREEN_DARKER, textDecoration: 'none' }}>Profile</Link>
        </div>
        <div style={{ height: '16px' }} />
        <div style={{padding: '8px' }}>
          <Link to={routes.Root} style={{ color: COLORS.GREEN_DARKER, textDecoration: 'none' }}>Home</Link>
        </div>
      </div>
      </div>
    </Drawer>
  );
};
