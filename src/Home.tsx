import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Card, CardContent, CardMedia, Container, CssBaseline, Divider, Grid, ImageList, ImageListItem, Paper, Typography } from '@mui/material';
import { styled, ThemeProvider } from '@mui/material/styles';
import { theme } from './themes/theme';
import { makeRoutes } from './navigation/routes';
import { signInWithGoogle } from "./firebase";
// import firebase from "assets/firebase.svg";
// import flask from "./assets/flask.svg";
// import google from "./assets/google.svg";
// import mui from "./assets/mui.svg";
// import postgresql from "./assets/postgresql.svg";
// import react from "./assets/react.svg";
// import reactrouter from "./assets/reactrouter.svg";
// import typescript from "./assets/typescript.svg";

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
            {"This will have a little information about Celadon"}
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
              alignItems: "center",
              width: "30%",
              p: 4,
            }}
          >
            <Box sx={{
              p: 2
            }}>
              <Typography variant="h5" component="h6" gutterBottom>
                {"Feature 1"}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {"Description about feature 1"}
              </Typography>
            </Box>
            <Box sx={{
              p: 2
            }}>
              <Typography variant="h5" component="h6" gutterBottom>
                {"Feature 2"}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {"Description about feature 2"}
              </Typography>
            </Box>
            <Box sx={{
              p: 2
            }}>
              <Typography variant="h5" component="h6" gutterBottom>
                {"Feature 3"}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {"Description about feature 3"}
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
          columns={{ xs: 2, sm: 8, md: 12 }}
          sx={{
            p: 4,
            justifyContent: 'center',
            alignItems: 'center',
            display: "flex",
            }}
          direction="column">
            <Grid item sx={{ xs: 1 }}>
              <Typography variant="h5" component="h2" gutterBottom sx={{ alignSelf: 'center'}}>
                {"About the Creator"}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Card>
                <CardMedia
                  sx={{ height: 140 }}
                  src={localStorage.getItem("profilePic")}
                  title="Yael"
                />
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    Yael Echols
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Subtitle
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={1}>
              <Box>
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
          }}
        >
          <Typography variant="h5" component="h2" gutterBottom>
            {"Powered By"}
          </Typography>
          <ImageList
            sx={{
              flexWrap: "wrap",
            }}
            cols={8}
            gap={30}
          >
            {/* <ImageListItem>
              <img src={firebase} alt="Firebase" />
            </ImageListItem>
            <ImageListItem>
              <img src={flask} alt="Flask" />
            </ImageListItem>
            <ImageListItem>
              <img src={google} alt="Google" />
            </ImageListItem>
            <ImageListItem>
              <img src={mui} alt="MUI" />
            </ImageListItem>
            <ImageListItem>
              <img src={postgresql} alt="Postgresql" />
            </ImageListItem>
            <ImageListItem>
              <img src={react} alt="React" />
            </ImageListItem>
            <ImageListItem>
              <img src={reactrouter} alt="React Router" />
            </ImageListItem>
            <ImageListItem>
              <img src={typescript} alt="TypeScript" />
            </ImageListItem> */}
          </ImageList>
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
