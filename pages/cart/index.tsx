import React, { useContext } from "react";
import { MainLayout } from "../../components/layouts/mainLayout";
import { CartProductList } from "../../components/cart/cartProductList";
import { Grid, Typography } from "@mui/material";
import { CartSummary } from "../../components/cart/cartSummary";
import { CartContext } from "../../context/cartContext/cartContext";
import { useEffect } from "react";
import { useRouter } from "next/router";

const CartPage = () => {
  const cartContext = useContext(CartContext);
  const router = useRouter();

  useEffect(() => {
    if (cartContext.cart.length === 0 && cartContext.isLoaded) {
      router.replace("/cart/empty");
    }
  }, [cartContext.cart]);

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
          <CartSummary totalPrice={cartContext.totalPrice} />
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default CartPage;
