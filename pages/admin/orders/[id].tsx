import React from "react";
import { GetServerSideProps } from "next";
import { getOrder } from "../../../db/functions/getOrder";
import { MainLayout } from "../../../components/layouts/mainLayout";
import { Grid, Typography } from "@mui/material";
import { CartProductList } from "../../../components/cart/cartProductList";
import { IOrder } from "../../../interfaces/orderInterface";
import AdminOrderSummary from "../../../components/admin/adminOrderSummary";

const AdminOrderPage = ({ order }: { order: IOrder }) => {
  return (
    <MainLayout
      title="Order"
      description="View details from the order"
      showSearchBar={false}
    >
      <Typography variant="h4" component="h1">
        Order: {order._id}
      </Typography>
      <Grid container sx={{ mt: "20px" }}>
        <Grid item xs={12} sm={7}>
          <CartProductList
            showControls={false}
            products={order.orderContent}
          ></CartProductList>
        </Grid>

        <Grid item xs={12} sm={5}>
          <AdminOrderSummary order={order}></AdminOrderSummary>
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id = "" } = ctx.query as { id: string };

  try {
    const order = JSON.parse(await getOrder(id));

    return {
      props: {
        order,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
};

export default AdminOrderPage;
