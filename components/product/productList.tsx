import React, { FC } from "react";

import { Grid } from "@mui/material";
import { ProductCard } from "./productCard";
import { ProductShort } from "../../interfaces/productShort";

interface Props {
  productList: ProductShort[];
}

export const ProductList: FC<Props> = ({ productList }) => {
  return (
    <Grid
      container
      spacing={4}
      alignItems="center"
      justifyContent="center"
      direction="row"
      sx={{
        marginTop: "5vh",
      }}
    >
      {productList.map((product) => {
        return (
          <Grid item xs={12} md={6} xl={4} key={product.title}>
            <ProductCard
              price={product.price}
              title={product.title}
              imageUrl={product.imageUrl}
              slug={product.slug}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};
