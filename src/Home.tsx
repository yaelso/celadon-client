import React from "react";
import { Link } from "react-router-dom";
import { Box, Card, CardContent, Container, CssBaseline, Divider, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './themes/forms';

const Home: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Card sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }} elevation={3}>
          <CardContent>
            <Typography sx={ { mb: 1.5 }}>
              Welcome to Celadon! This is filler content for the time being!
            </Typography>
            <Divider />
            <Typography sx={{ mb: 1.5, marginTop: 2 }}>
              This page will be the primary view for users that aren't logged in!
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </ThemeProvider>
  );
};

export default Home;
