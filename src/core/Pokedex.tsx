import { Box, Breadcrumbs, Card, Divider, Grid, Link, Paper, Switch, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import AppLayout from '../layout/AppLayout';
import { makeRoutes } from '../navigation/routes';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(4),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Pokedex: React.FC = () => {
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
          <Typography color="text.primary">Pokedex</Typography>
        </Breadcrumbs>
      </Box>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12}} sx={{pt: 5, justifyContent: 'center'}}>
        <Grid item sx={{
          p: 4,
          textAlign: 'center'
        }}
        xs={3}
        >
          <Item>
            <img src={localStorage.getItem("profilePic")} alt="Pokemon"/>
            <Typography sx={{ pt: 1, pb: 1 }}>Bulbasaur</Typography>
            <Divider />
            <Typography sx={{ pt: 1, pb: 2, fontSize: 17 }}>10 EXP</Typography>
            <Switch />
          </Item>
        </Grid>
        <Grid item sx={{
          p: 4,
          textAlign: 'center'
        }}
        xs={3}
        >
          <Item>
            <img src={localStorage.getItem("profilePic")} alt="Pokemon"/>
            <Typography sx={{pt: 1, pb: 1}}>Charmander</Typography>
            <Divider />
            <Typography sx={{ pt: 1, pb: 2, fontSize: 17 }}>30 EXP</Typography>
            <Switch />
          </Item>
        </Grid>
        <Grid item sx={{
          p: 4,
          textAlign: 'center'
        }}
        xs={3}
        >
          <Item>
            <img src={localStorage.getItem("profilePic")} alt="Pokemon"/>
            <Typography sx={{ pt: 1, pb: 1 }}>Squirtle</Typography>
            <Divider />
            <Typography sx={{ pt: 1, pb: 2, fontSize: 17 }}>50 EXP</Typography>
            <Switch defaultChecked />
          </Item>
        </Grid>
      </Grid>
    </AppLayout>
  )
};

export default Pokedex;
