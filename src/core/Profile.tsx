import { Box, Breadcrumbs, CssBaseline, Link, Typography } from "@mui/material";
import React from "react";
import AppLayout from "../layout/AppLayout";
import { makeRoutes } from "../navigation/routes";

const Profile: React.FC = () => {
  const routes = makeRoutes();

  return (
    <AppLayout>
      <CssBaseline />
      <Box>
        <Breadcrumbs sx={{pt: 5}}>
          <Link underline="hover" color="inherit" href={routes.Root}>
            Home
          </Link>
          <Link underline="hover" color="inherit" href={routes.Dashboard}>
            Dashboard
          </Link>
          <Typography color="text.primary">Profile</Typography>
        </Breadcrumbs>
      </Box>
      <Box>
        <Typography variant="h5" sx={{pt: 5}}>
          {"Welcome, "}
          {localStorage.getItem("name")}
          {"!"}
        </Typography>
      </Box>
      <Box>
        <img src={localStorage.getItem("profilePic")} alt="User Google profile picture" />
        <Typography>
          {localStorage.getItem("name")}
        </Typography>
      </Box>
      <Box>
        <Typography>
          {"Habits"}
        </Typography>
      </Box>
      <Box>
        <Typography>
          {"Calendar"}
        </Typography>
      </Box>
      <Box>
        <Typography>
          {"Active Pokemon"}
        </Typography>
      </Box>
      <Box>
        <Typography>
          {"Favorite Checklists"}
        </Typography>
      </Box>
    </AppLayout>
  );
};

export default Profile;
