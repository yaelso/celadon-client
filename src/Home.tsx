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

const iconList = [<FirebaseIcon/>, <FlaskIcon/>, <GoogleIcon/>,  <MuiIcon/>,  <PostgresIcon/>, <ReactIcon/>, <ReactRouter/>, <TypeScriptIcon/>]

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
            xs={3}
          >
            <Typography variant="h5" component="h6" gutterBottom>
              {"More Text About Celadon"}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {"This will be the description section below the above heading! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
              <Button href="https://github.com/yaelso/celadon-client" target="_blank" size="small">Frontend Repository</Button>
              <Button href="https://github.com/yaelso/CeladonApi" target="_blank" size="small">Backend Repository</Button>
            </Box>
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
            }}
            >
              <Card sx={{ width: 300, minWidth: 300 }} >
                <CardMedia
                  component="img"
                  height="300"
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
                  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Button href="https://github.com/yaelso" size="small">Github</Button>
                    <Button href="https://www.linkedin.com/in/yael-echols/" size="small">LinkedIn</Button>
                  </Box>
                </CardContent>
              </Card>
              <Box sx={{
                pl: 4
              }}
              >
                <Typography variant="body1" gutterBottom>
                  This will be some text about me and my background before and leading up to Ada!
                </Typography>
              </Box>
            </Grid>
          </Grid>
        <Box
          sx={{
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
            {iconList.map(icon => <Grid item xs={2} sm={6} md={1}>{icon}</Grid>)}
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
