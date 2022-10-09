import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";
import { red } from "@mui/material/colors";

export const CartProduct = () => {
  return (
    <Grid
      container
      spacing={1}
      sx={{
        margin: "10px 0",
      }}
    >
      <Grid item xs={2}>
        <Image
          src="https://images.unsplash.com/photo-1665219242102-06b259f21517?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
          alt="product image"
          width={200}
          height={150}
        ></Image>
      </Grid>
      <Grid item xs={6}>
        <Typography>Product title</Typography>
        {/* q selector */}
        <Typography
          sx={{
            textDecoration: "underline",
            color: red[300],
            cursor: "pointer",
          }}
        >
          Remove
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography>$100</Typography>
      </Grid>
    </Grid>
  );
};
