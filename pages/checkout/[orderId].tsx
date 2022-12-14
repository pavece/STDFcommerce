import { Grid, Typography } from "@mui/material";
import React from "react";
import { CartProductList } from "../../components/cart/cartProductList";
import { CheckoutSummary } from "../../components/checkout/checkoutSummary";
import { MainLayout } from "../../components/layouts/mainLayout";
import { getOrder } from "../../db/functions/getOrder";
import { GetServerSideProps } from "next";
import { ICartProduct } from "../../interfaces/cartProduct";

const Index = ({
  cart,
  finalPrice,
  orderId,
  noTaxPrice,
}: {
  cart: ICartProduct[];
  finalPrice: number;
  orderId: string;
  noTaxPrice: number;
}) => {
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
          <CartProductList showControls={false} products={cart} />
        </Grid>
        <Grid item xs={12} md={5}>
          <CheckoutSummary
            cart={cart}
            price={finalPrice}
            orderId={orderId}
            noTaxPrice={noTaxPrice}
          />
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { orderId = "" } = params as { orderId: string };

  try {
    const order = JSON.parse(await getOrder(orderId));

    return {
      props: {
        orderId,
        cart: order.orderContent,
        finalPrice: order.orderTaxedPrice,
        noTaxPrice: order.orderTotalPrice,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};
