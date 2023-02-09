import { Box, Breadcrumbs, Link, Typography } from '@mui/material';
import React from 'react';
import AppLayout from '../layout/AppLayout';
import { makeRoutes } from '../navigation/routes';

const Archive: React.FC = () => {
  const routes = makeRoutes();

  return (
    <AppLayout>
      <Box>
        <Breadcrumbs sx={{pt: 5}}>
          <Link underline="hover" color="inherit" href={routes.Root}>
            Home
          </Link>
          <Link underline="hover" color="inherit" href={routes.Dashboard}>
            Dashboard
          </Link>
          <Typography color="text.primary">Archive</Typography>
        </Breadcrumbs>
      </Box>
    </AppLayout>
  )
};

export default Archive;
