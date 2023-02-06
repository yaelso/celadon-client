import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Card, CardContent, Container, CssBaseline, Divider, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './themes/theme';
import { makeRoutes } from './navigation/routes';
import { COLORS } from './themes/colors';
import { signInWithGoogle } from "./firebase/firebase";

const Home: React.FC = () => {
  const routes = makeRoutes();

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
            <Typography sx={{ textAlign: 'center'}}>
              {/* <Link to={routes.Login} style={{ color: COLORS.GREY_TEXT, textDecoration: 'none', paddingRight: 50 }}>Login</Link> */}
              {/* <Link to={routes.Signup} style={{ color: COLORS.GREY_TEXT, textDecoration: 'none' }}>Signup</Link> */}
              <Button onClick={signInWithGoogle}>Log in with Google</Button>
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </ThemeProvider>
  );
};

export default Home;
