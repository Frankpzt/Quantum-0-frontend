import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            main: "#3E8BFF",
        },
        secondary: {
            main: "#97BDFF",
        },
        error: {
            main: red.A400,
        },
    },
});

export default theme;
