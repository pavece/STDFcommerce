import { createTheme } from "@mui/material/styles";
import { red, grey } from "@mui/material/colors";

// Create a theme instance.
const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#ffff",
    },
    secondary: {
      main: "#111111"
    },
    
    error: {
      main: red[500],
    },
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          fontSize: "1rem",
          backgroundColor: "#111111",
          color: "#ffff",
          padding: "10px 40px",
          borderRadius: "40px", 
          textTransform: "none", 
          fontWeight: "300",
          ":hover": {
            backgroundColor: grey[900]
          }
        
        },
      },
    },
  },
});

export default lightTheme;
