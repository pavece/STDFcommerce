import { Button, Grid, Typography, Chip } from "@mui/material";
import React from "react";
import Image from "next/image";
import { red } from "@mui/material/colors";
import { Counter } from "../ui/counter";
import { ICartProduct } from "../../interfaces/cartProduct";
import { useContext } from "react";
import { CartContext } from "../../context/cartContext/cartContext";

export const CartProduct = ({
  showControls,
  product,
}: {
  showControls: boolean;
  product: ICartProduct;
}) => {
  const cartContext = useContext(CartContext);

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
              initialValue={product.quantity}
              maxValue={10}
              getValue={(value) =>
                cartContext.updateProductCount(value, product.slug)
              }
            />
            <Typography
              onClick={() => {
                cartContext.removeProductFromCart(product);
              }}
              sx={{
                textDecoration: "underline",
                color: red[300],
                cursor: "pointer",
              }}
            >
              Remove
            </Typography>
          </>
        ) : (
          <>
            <Chip label={`Quantity: ${product.quantity}`} sx={{ mt:"10px" }} />
          </>
        )}
      </Grid>
      <Grid item xs={4}>
        <Typography>${product.price}</Typography>
      </Grid>
    </Grid>
  );
};
