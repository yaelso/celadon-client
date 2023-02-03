import { AppBar } from '@mui/material';
import React from 'react';
import { COLORS } from '../themes/colors';


interface Props extends React.PropsWithChildren {}


const AppNavbar: React.FC<Props> = props => {
  return (
    <AppBar position='relative' sx={{ zIndex: 5, height: '32px', display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '4px', backgroundColor: COLORS.GREEN_DARKER }}>
      {props.children}
    </AppBar>
  );
};

export default AppNavbar;
