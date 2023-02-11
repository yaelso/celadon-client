import { createTheme } from "@mui/material/styles";
import { COLORS } from './colors';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

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
        fontFamily: 'Roboto',
        fontSize: 16,
        button: {
            fontWeight: 700,
        },
    },
});
