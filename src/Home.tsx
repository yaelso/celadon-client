import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Card, CardContent, Container, CssBaseline, Divider, ImageList, ImageListItem, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
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
          backgroundColor: "lightyellow",
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
        <Box
          sx={{
            backgroundColor: "grey",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                backgroundColor: "pink",
                alignSelf: "center",
                width: "30%"
              }}
            >
              <Box>
                <Typography variant="h5" component="h6" gutterBottom>
                  {"Feature 1"}
                </Typography>
                <Typography variant="h6" component="h6" gutterBottom>
                  {"Description about feature 1"}
                </Typography>
              </Box>
              <Box>
                <Typography variant="h5" component="h6" gutterBottom>
                  {"Feature 2"}
                </Typography>
                <Typography variant="h6" component="h6" gutterBottom>
                  {"Description about feature 2"}
                </Typography>
              </Box>
              <Box>
                <Typography variant="h5" component="h6" gutterBottom>
                  {"Feature 3"}
                </Typography>
                <Typography variant="h6" component="h6" gutterBottom>
                  {"Description about feature 3"}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                backgroundColor: "lightyellow",
              }}
            >
              <Typography variant="h5" component="h6" gutterBottom>
                {"More Text About Celadon"}
              </Typography>
              <Typography variant="h6" component="h6" gutterBottom>
                {"This will be the description section below the above heading"}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: "lightgrey",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Typography variant="h5" component="h2" gutterBottom>
            {"About the Creator"}
          </Typography>
          <Card
            sx={{
              backgroundColor: "pink",
              alignSelf: "center",
            }}
          >
            <Typography variant="h5" component="h2" gutterBottom>
              {"Yael Echols"}
            </Typography>
            <Typography variant="h6" component="h2" gutterBottom>
              {"Subtitle"}
            </Typography>
          </Card>
          <Card
            sx={{
              backgroundColor: "pink",
              alignSelf: "center",
            }}
          >
            <Typography variant="h6" component="h2" gutterBottom>
              {"This will be a description section detailing a little bit about me"}
            </Typography>
          </Card>
        </Box>
        <Box
          sx={{
            backgroundColor: "lightblue",
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
