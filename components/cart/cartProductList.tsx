import React from "react";
import { Container } from "@mui/system";
import { CartProduct } from "./cartProduct";
import { ICartProduct } from "../../interfaces/cartProduct";

export const CartProductList = ({
  showControls,
  products,
}: {
  showControls: boolean;
  products: ICartProduct[];
}) => {
  return (
    <Container>
      {products.map((product) => (
        <CartProduct
          showControls={showControls}
          key={product.title}
          product={product}
        ></CartProduct>
      ))}
    </Container>
  );
};
