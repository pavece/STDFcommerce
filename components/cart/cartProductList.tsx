import React from "react";
import { Container } from "@mui/system";
import { CartProduct } from "./cartProduct";

export const CartProductList = () => {
  return (
    <Container>
      <CartProduct></CartProduct>
      <CartProduct></CartProduct>
      <CartProduct></CartProduct>
    </Container>
  );
};
