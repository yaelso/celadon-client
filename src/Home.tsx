import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Card, CardContent, CardMedia, Container, CssBaseline, Divider, Grid, ImageList, ImageListItem, Paper, Typography } from '@mui/material';
import { styled, ThemeProvider } from '@mui/material/styles';
import { theme } from './themes/theme';
import { makeRoutes } from './navigation/routes';
import { signInWithGoogle } from "./firebase";
import { ReactComponent as FirebaseIcon } from './assets/firebase.svg';
import { ReactComponent as FlaskIcon } from './assets/flask.svg';
import { ReactComponent as GoogleIcon } from './assets/google.svg';
import { ReactComponent as MuiIcon } from './assets/mui.svg';
import { ReactComponent as PostgresIcon } from './assets/postgresql.svg';
import { ReactComponent as ReactIcon } from './assets/react.svg';
import { ReactComponent as ReactRouter } from './assets/reactrouter.svg';
import { ReactComponent as TypeScriptIcon } from './assets/typescript.svg';
import YaelOnTheBeach from './assets/yael.png';

const Home: React.FC = () => {
  const routes = makeRoutes();

  const Copyright = () => {
    return (
      <Typography variant="body2" color="text.secondary">
        {"Copyright © "}
        {"Celadon"} {" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          width: "100vw",
          // backgroundColor: "lightyellow",
        }}
      >
        <Container
          component="main"
          sx={{ backgroundColor: "#B7CFB7", color: "white", minWidth: "100vw", py: 5 }}
        >
          <Typography variant="h2" component="h1" gutterBottom sx={{ml: 5}}>
            Celadon
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom sx={{ml: 5}}>
            {"A gamified productivity app for busy students and lifelong learners"}
          </Typography>
          <Button variant="contained" onClick={signInWithGoogle} sx={{mt: 2, ml: 5}}>Log in with Google</Button>
        </Container>
        <Grid container
          sx={{
            p: 4,
            justifyContent: 'center',
            alignItems: 'center',
            display: "flex",
            flexDirection: "row",
            }}
          direction="column">
          <Grid item
            sx={{
              display: "flex",
              flexDirection: "row",
              // backgroundColor: "pink",
              alignItems: "flex-start",
              p: 4,
            }}
            xs={4}
          >
            <Box sx={{
              p: 2,
            }}>
              <Typography variant="h6" component="h6" gutterBottom>
                {"Contextual Organization"}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {"Create checklists and tasks in groups of categories to cleanly divide them"}
              </Typography>
            </Box>
            <Box sx={{
              p: 2,
            }}>
              <Typography variant="h6" component="h6" gutterBottom>
                {"Archive, Schedule, & Favorite"}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {"Archive and favorite checklists at any time for later reflection and schedule tasks for easy access"}
              </Typography>
            </Box>
            <Box sx={{
              p: 2
            }}>
              <Typography variant="h6" component="h6" gutterBottom>
                {"Collect Pokemon"}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {"Collect and level Pokemon with every task and habit you complete"}
              </Typography>
            </Box>
          </Grid>
          <Grid item
            sx={{
              textAlign: 'left',
              p: 2
            }}
          >
            <Typography variant="h5" component="h6" gutterBottom>
              {"More Text About Celadon"}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {"This will be the description section below the above heading"}
            </Typography>
          </Grid>
        </Grid>
        <Grid container
          spacing={{ xs: 2, md: 3 }}
          sx={{
            p: 4,
            justifyContent: 'center',
            alignItems: 'center',
            }}
          direction="column">
            <Grid item xs={1}>
              <Typography variant="h5" component="h2" gutterBottom sx={{ alignSelf: 'center'}}>
                {"About the Creator"}
              </Typography>
            </Grid>
            <Grid item
              sx={{
              display: "flex",
              flexDirection: "row",
            }}>
              <Card>
                <CardMedia
                  component="img"
                  height="160"
                  image={YaelOnTheBeach}
                  alt="Yael"
                />
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h5" component="div" gutterBottom>
                    Yael Echols
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Ada D18
                  </Typography>
                  <Button size="small">Github</Button>
                  <Button size="small">LinkedIn</Button>
                </CardContent>
              </Card>
              <Box sx={{
                pl: 4
              }}>
                <Typography variant="body1" gutterBottom>
                  This will be some text about me and my background before and leading up to Ada!
                </Typography>
              </Box>
            </Grid>
          </Grid>
        <Box
          sx={{
            // backgroundColor: "lightblue",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pb: 3,
          }}
        >
          <Typography variant="h5" component="h2" gutterBottom sx={{ pb: 2 }}>
            {"Powered By"}
          </Typography>
          <Grid container spacing={4} xs={10} justifyContent="center" sx={{ p: 2 }}>
            <Grid item xs={2} sm={6} md={1}>
              <FirebaseIcon />
            </Grid>
            <Grid item xs={2} sm={6} md={1}>
              <FlaskIcon />
            </Grid>
            <Grid item xs={2} sm={6} md={1}>
              <GoogleIcon />
            </Grid>
            <Grid item xs={2} sm={6} md={1}>
              <MuiIcon />
            </Grid>
            <Grid item xs={2} sm={6} md={1}>
              <PostgresIcon />
            </Grid>
            <Grid item xs={2} sm={6} md={1}>
              <ReactIcon />
            </Grid>
            <Grid item xs={2} sm={6} md={1}>
              <ReactRouter />
            </Grid>
            <Grid item xs={2} sm={6} md={1}>
              <TypeScriptIcon />
            </Grid>
          </Grid>
        </Box>
        <Box
          component="footer"
          sx={{
            py: 3,
            mt: "auto",
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
          }}
        >
          <Container maxWidth="sm" sx={{ textAlign: "center" }}>
            <Typography variant="body1">Made in Seattle with ❤️</Typography>
            <Copyright />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Home;
