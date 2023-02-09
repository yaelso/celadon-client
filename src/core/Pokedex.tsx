import { Box, Breadcrumbs, Link, Typography } from '@mui/material';
import React from 'react';
import AppLayout from '../layout/AppLayout';

const Pokedex: React.FC = () => {
  return (
    <AppLayout>
      <Box>
        <Breadcrumbs sx={{pt: 5}}>
          <Link underline="hover" color="inherit" href="/">
            Dashboard
          </Link>
          <Typography color="text.primary">Pokedex</Typography>
        </Breadcrumbs>
      </Box>
    </AppLayout>
  )
};

export default Pokedex;
