import React from 'react';
import { Box, Divider, Grid, Paper, styled, Switch, Typography } from "@mui/material";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

type Props = {
    id: number;
    name: string;
    exp: number;
};

const UserPokemonItem: React.FC<Props> = (props) => {
    return (
        <Grid item sx={{
            p: 4,
            textAlign: 'center'
        }}
            xs={3}
        >
            <Item>
                <img src={localStorage.getItem("profilePic")} alt="Pokemon" />
                <Typography sx={{ pt: 1, pb: 1 }}>{props.name}</Typography>
                <Box display='flex' justifyContent='center'>
                    <Typography variant="body2" sx={{ pb: 1, p: 2 }}>Grass Type</Typography>
                    <Typography variant="body2" sx={{ pb: 1, p: 2 }}>Poison Type</Typography>
                </Box>
                <Box display='flex' justifyContent='center'>
                    {/* <Typography variant="body2" sx={{ pb: 1, p: 2 }}>Height: {props.height}</Typography>
                    <Typography variant="body2" sx={{ pb: 1, p: 2 }}>Weight: {props.weight}</Typography> */}
                    <Typography variant="body2" sx={{ pb: 1, p: 2 }}>Height: 0</Typography>
                    <Typography variant="body2" sx={{ pb: 1, p: 2 }}>Weight: 0</Typography>
                </Box>
                <Divider />
                <Box display='flex' justifyContent='space-around'>
                    <Typography sx={{ pt: 2, pb: 2, fontSize: 17 }}>Level 0</Typography>
                    <Typography sx={{ pt: 2, pb: 2, fontSize: 17 }}>0 EXP</Typography>
                </Box>
                <Switch />
            </Item>
        </Grid>
    );
};

export default UserPokemonItem;
