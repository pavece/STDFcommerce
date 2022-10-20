import { createTheme } from "@mui/material/styles";
import { red, grey } from "@mui/material/colors";

// Create a theme instance.
const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#111111",
    },
    secondary: {
      main: "#ffff",
    },

    error: {
      main: red[500],
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
          backgroundColor: "#111111",
          color: "#ffff",
          padding: "5px 30px",
          borderRadius: "40px",
          textTransform: "none",
          fontWeight: "300",
          ":hover": {
            backgroundColor: grey[900],
          },
        },
      },
    },
  },
});

export default lightTheme;
