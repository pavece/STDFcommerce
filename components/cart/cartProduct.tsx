import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";
import { red } from "@mui/material/colors";
import { Counter } from "../ui/counter";
import { ICartProduct } from "../../interfaces/cartProduct";

export const CartProduct = ({
  showControls,
  product,
}: {
  showControls: boolean;
  product: ICartProduct;
}) => {
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
          src={product.image}
          alt={product.title}
          width={200}
          height={150}
        ></Image>
      </Grid>
      <Grid item xs={6}>
        <Typography>{product.title}</Typography>
        {showControls ? (
          <>
            <Counter
              initialValue={1}
              maxValue={10}
              getValue={(value) => console.log(value)}
            />
            <Typography
              sx={{
                textDecoration: "underline",
                color: red[300],
                cursor: "pointer",
              }}
            >
              Remove
            </Typography>
          </>
        ) : null}
      </Grid>
      <Grid item xs={4}>
        <Typography>${product.price}</Typography>
      </Grid>
    </Grid>
  );
};
