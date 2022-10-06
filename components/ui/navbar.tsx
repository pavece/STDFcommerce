import {
  AppBar,
  Grid,
  TextField,
  Toolbar,
  InputAdornment,
} from "@mui/material";
import { Container } from "@mui/system";
import Image from "next/image";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { Typography } from "@mui/material";

export const NavBar = () => {
  return (
    <AppBar position="static" color="primary" elevation={0}>
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
