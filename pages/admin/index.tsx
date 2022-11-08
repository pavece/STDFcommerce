import React, { FC } from "react";
import { MainLayout } from "../../components/layouts/mainLayout";
import { GetServerSideProps } from "next";
import { Grid, Typography } from "@mui/material";
import DashInfoCard from "../../components/admin/dashInfoCard";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import { getAllOrders } from "../../db/functions/getOrder";
import { getAllUsers } from "../../db/functions/usersDb";
import { getAllProducts } from "../../db/functions/getAllProducts";
import { IOrder } from "../../interfaces/orderInterface";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import CreditScoreRoundedIcon from "@mui/icons-material/CreditScoreRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import { DashOrder } from "../../components/admin/dashOrder";

interface Props {
  orderCount: number;
  userCount: number;
  productCount: number;
  paidOrdersCount: number;
  lastOrders: IOrder[];
}

const AdminDashboard: FC<Props> = ({
  orderCount,
  userCount,
  productCount,
  paidOrdersCount,
  lastOrders,
}) => {
  return (
    <MainLayout
      title="Admin dashboard"
      description="Review general details"
      showSearchBar={false}
    >
      <Typography variant="h4" component="h1">
        Admin dashboard
      </Typography>
      <Grid container spacing={5} sx={{ mt: "20px", mb: "30px" }}>
        <Grid item xs={12} sm={3}>
          <DashInfoCard
            text="Orders"
            value={orderCount}
            icon={<AssignmentTurnedInRoundedIcon sx={{ mr: "10px" }} />}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <DashInfoCard
            text="Users"
            value={userCount}
            icon={<PeopleAltRoundedIcon sx={{ mr: "10px" }} />}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <DashInfoCard
            text="Products"
            value={productCount}
            icon={<CategoryRoundedIcon sx={{ mr: "10px" }} />}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <DashInfoCard
            text="Paid orders"
            value={paidOrdersCount}
            icon={<CreditScoreRoundedIcon sx={{ mr: "10px" }} />}
          />
        </Grid>
      </Grid>
      <Typography variant="h5" component="h2">
        Latest orders
      </Typography>
      <Grid sx={{ mt: "20px" }} gap={5}>
        {lastOrders.map((order) => (
          <Grid item xs={12} key={order._id} sx={{ mt: "10px", mb: "10px" }}>
            <DashOrder order={order} key={order._id}></DashOrder>
          </Grid>
        ))}
      </Grid>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const orders = await getAllOrders();
  const users = await getAllUsers();
  const products = await getAllProducts();
  const paidOrders = orders.filter((order: IOrder) => order.paid);

  return {
    props: {
      lastOrders: orders.reverse().splice(0, 3),
      orderCount: orders.length,
      userCount: users.length,
      productCount: products.length,
      paidOrdersCount: paidOrders.length,
    },
  };
};

export default AdminDashboard;
