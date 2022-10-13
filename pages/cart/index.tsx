import React, { useContext } from "react";
import { MainLayout } from "../../components/layouts/mainLayout";
import { CartProductList } from "../../components/cart/cartProductList";
import { Grid, Typography } from "@mui/material";
import { CartSummary } from "../../components/cart/cartSummary";
import { CartContext } from "../../context/cartContext/cartContext";

const CartPage = () => {
  const cartContext = useContext(CartContext);

  return (
    <MainLayout
      title="STDF - Cart"
      description="View your cart"
      showSearchBar={false}
    >
      <Typography
        component="h1"
        variant="h3"
        sx={{
          mb: "30px",
        }}
      >
        Cart
      </Typography>
      <Grid container>
        <Grid item xs={12} md={8}>
          <CartProductList showControls products={cartContext.cart} />
        </Grid>
        <Grid item xs={12} md={4}>
          <CartSummary />
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default CartPage;
