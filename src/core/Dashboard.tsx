import { Box, Breadcrumbs, Divider, Link, Typography } from '@mui/material';
import React from 'react';
import AppLayout from '../layout/AppLayout';
import { makeRoutes } from '../navigation/routes';

const Dashboard: React.FC = () => {
  const routes = makeRoutes();

  return (
    <AppLayout>
      <Box>
        <Breadcrumbs sx={{pt: 5}}>
          <Link underline="hover" color="inherit" href={routes.Root}>
            Home
          </Link>
          <Typography color="text.primary">Dashboard</Typography>
        </Breadcrumbs>
      </Box>
      <Box>
        <Typography variant="h5" sx={{pt: 5, pb: 1}}>
          {"Category Name"}
        </Typography>
        <Divider />
      </Box>
    </AppLayout>
  )
};

export default Dashboard;
