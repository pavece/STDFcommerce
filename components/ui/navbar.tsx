import { FC, useContext } from "react";
import NextLink from "next/link";
import Image from "next/image";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { AppBar, Grid, Toolbar, Typography, Link, Badge } from "@mui/material";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { UiContext } from "../../context/uiContext/uiContext";
import { SearchBar } from "./searchBar";
import { CartContext } from "../../context/cartContext/cartContext";

interface Props {
  showSearchBar: boolean;
}

export const NavBar: FC<Props> = ({ showSearchBar }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  const interfaceContext = useContext(UiContext);
  const cartContext = useContext(CartContext);

  return (
    <AppBar
      position="sticky"
      color="secondary"
      elevation={0}
      sx={{
        backgroundColor: trigger ? "rgba(255,255,255, 0.7)" : "white",
        backdropFilter: "blur(20px)",
      }}
    >
      <Toolbar>
        <Grid container>
          <Grid item xs={6} sm={2}>
            <NextLink passHref href="/">
              <Link>
                <Image
                  src="/logo.svg"
                  alt="logo"
                  height={80}
                  width={150}
                ></Image>
              </Link>
            </NextLink>
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
            {showSearchBar ? <SearchBar></SearchBar> : null}
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
            <Link href="/cart">
              <Badge badgeContent={cartContext.cart.length} color="primary">
                <ShoppingCartRoundedIcon
                  color="primary"
                  sx={{
                    width: "30px",
                    height: "30px",
                    cursor: "pointer",
                  }}
                />
              </Badge>
            </Link>
            <Typography
              sx={{
                cursor: "pointer",
                marginLeft: "30px",
              }}
              onClick={() => interfaceContext.uiOpenSideMenu()}
            >
              Menu
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
