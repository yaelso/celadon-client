import { createTheme } from "@mui/material/styles";
import { COLORS } from './colors';

export const theme = createTheme({
    palette: {
        primary: {
            main: COLORS.GREEN_DARK,
            dark: COLORS.GREEN_DARKER,
            light: COLORS.GREEN_LIGHT,
            contrastText: 'rgba(255,255,255,0.87)',
        },
        secondary: {
            main: COLORS.RED,
        },
    },
    typography: {
        fontSize: 16,
        fontFamily: 'Source Sans Pro',
        button: {
            fontWeight: 600,
        },
    },
});
