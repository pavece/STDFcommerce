import { Grid, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import React from "react";
import { CartProductList } from "../../components/cart/cartProductList";
import { MainLayout } from "../../components/layouts/mainLayout";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import { verifyUserOrder } from "../../db/functions/userOrders";
import { getOrder } from "../../db/functions/getOrder";
import { IOrder } from "../../interfaces/orderInterface";
import { OrderDetailsSummary } from "../../components/order/orderDetailsSummary";

//TODO: implement a cancel order button if the user havent paid the order
const Order = ({ order }: { order: IOrder }) => {
  return (
    <MainLayout
      title="Order detail"
      description="Review your order status and details"
      showSearchBar={false}
    >
      <Typography variant="h4" component="h1" sx={{ mb: "30px" }}>
        Order details: {order._id}
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartProductList
            showControls={false}
            products={order.orderContent}
          ></CartProductList>
        </Grid>
        <Grid item xs={12} sm={5}>
          <OrderDetailsSummary
            totalPrice={order.orderTaxedPrice}
            shippingStatus={order.orderShippingStatus}
            isPaid={order.paid}
            orderId={order._id || ""}
          ></OrderDetailsSummary>
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default Order;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { orderId = "" } = ctx.query as { orderId: string };

  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );

  const isUserOrder = await verifyUserOrder(
    session?.user?.email || "",
    orderId
  );

  if (session && isUserOrder) {
    try {
      const userOrder = JSON.parse(await getOrder(orderId || ""));
      return {
        props: { order: userOrder },
      };
    } catch (error) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  } else {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};
