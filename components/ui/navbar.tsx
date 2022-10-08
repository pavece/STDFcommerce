import Link from "next/link";
import Image from "next/image";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import {
  AppBar,
  Grid,
  TextField,
  Toolbar,
  InputAdornment,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";

export const NavBar = () => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window,
  });
  return (
    <AppBar
      position="sticky"
      color="primary"
      elevation={0}
      sx={{
        backgroundColor: trigger ? "rgba(255,255,255, 0.7)" : "white",
        backdropFilter: "blur(20px)",
      }}
    >
      <Toolbar>
        <Grid container>
          <Grid item xs={6} sm={2}>
            <Image src="/logo.svg" alt="logo" height={80} width={150}></Image>
          </Grid>
          <Grid
            item
            xs={0}
            sm={8}
            sx={{
              display: {
                xs: "none",
                sm: "flex",
                padding: "0 2vw",
              },
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextField
              placeholder="Search Products"
              fullWidth={true}
              sx={{
                maxWidth: "600px",
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon></SearchIcon>
                  </InputAdornment>
                ),
              }}
            ></TextField>
          </Grid>
          <Grid
            item
            xs={6}
            sm={2}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            <Link href="">
              <ShoppingCartRoundedIcon
                sx={{
                  width: "30px",
                  height: "30px",
                  mr: "1rem",
                  cursor: "pointer",
                }}
              />
            </Link>
            <Typography
              sx={{
                cursor: "pointer",
              }}
            >
              Menu
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
