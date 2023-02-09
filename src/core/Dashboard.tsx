import { Box, Typography } from '@mui/material';
import React from 'react';
import AppLayout from '../layout/AppLayout';

const Dashboard: React.FC = () => {
  return (
    <AppLayout>
      <Box>
        <Typography variant="h5" sx={{pt: 5}}>
          {"Dashboard"}
        </Typography>
      </Box>
    </AppLayout>
  )
};

export default Dashboard;
