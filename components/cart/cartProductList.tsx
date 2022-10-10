import React from "react";
import { Container } from "@mui/system";
import { CartProduct } from "./cartProduct";

export const CartProductList = ({
  showControls,
}: {
  showControls: boolean;
}) => {
  return (
    <Container>
      <CartProduct showControls={showControls}></CartProduct>
      <CartProduct showControls={showControls}></CartProduct>
    </Container>
  );
};
