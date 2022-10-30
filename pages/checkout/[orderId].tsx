import { Grid, Typography } from "@mui/material";
import React from "react";
import { CartProductList } from "../../components/cart/cartProductList";
import { CheckoutSummary } from "../../components/checkout/checkoutSummary";
import { MainLayout } from "../../components/layouts/mainLayout";
import { useContext } from "react";
import { CartContext } from "../../context/cartContext/cartContext";

const Index = () => {
  const cartContext = useContext(CartContext);
  return (
    <MainLayout
      title="STDF - Checkout"
      description="Review yor order"
      showSearchBar={false}
    >
      <Typography variant="h2" component="h1" fontSize={35} sx={{ mb: "20px" }}>
        Review order
      </Typography>
      <Grid container>
        <Grid item xs={12} md={7}>
          <CartProductList showControls={false} products={cartContext.cart} />
        </Grid>
        <Grid item xs={12} md={5}>
          <CheckoutSummary />
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default Index;
