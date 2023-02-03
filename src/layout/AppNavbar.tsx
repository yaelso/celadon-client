import { AppBar } from '@mui/material';
import React from 'react';
import { COLORS } from '../themes/colors';


interface Props extends React.PropsWithChildren {}


const AppNavbar: React.FC<Props> = props => {
  return (
    <AppBar position='relative'
      sx={{ zIndex: 5, height: '50px', display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '35px', backgroundColor: COLORS.GREEN_DARK
    }}>
      {props.children}
    </AppBar>
  );
};

export default AppNavbar;
