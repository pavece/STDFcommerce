import { Button, Typography, Chip } from "@mui/material";
import React from "react";
import { MainLayout } from "../../components/layouts/mainLayout";
import { GetServerSideProps } from "next";
import { getUserOrders } from "../../db/functions/userOrders";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import { IOrder } from "../../interfaces/orderInterface";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CreditCardOffRoundedIcon from "@mui/icons-material/CreditCardOffRounded";
import CreditScoreRoundedIcon from "@mui/icons-material/CreditScoreRounded";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";

const orders = ({ orders }: { orders: IOrder[] }) => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "Order Id", width: 200 },
    { field: "orderDate", headerName: "Creation date", width: 200 },
    {
      field: "orderPrice",
      headerName: "Total Price (includes TAX)",
      type: "number",
      width: 200,
    },
    {
      field: "orderStatus",
      headerName: "Shipping status",
      width: 130,
    },
    {
      field: "paymentStatus",
      headerName: "Payment status",
      width: 200,
      renderCell: (params) => {
        return params.row.isPaid ? (
          <Chip
            label="Paid"
            color="success"
            icon={<CreditScoreRoundedIcon />}
          ></Chip>
        ) : (
          <Chip
            label="unpaid"
            color="error"
            icon={<CreditCardOffRoundedIcon />}
          ></Chip>
        );
      },
    },
    {
      field: "goTo",
      headerName: "Go to order",
      width: 200,
      renderCell: (params) => {
        return (
          <a href={`/order/${params.row.id}`} target="_blank" rel="noreferrer">
            <Button>
              <RemoveRedEyeRoundedIcon sx={{ mr: "10px" }} />
              View order
            </Button>
          </a>
        );
      },
    },
  ];

  const rows = orders.map((order) => {
    const createdAt = new Date(order.createdAt!);
    return {
      id: order._id,
      orderDate: createdAt,
      orderPrice: order.orderTaxedPrice,
      isPaid: order.paid,
      orderStatus: order.orderShippingStatus,
    };
  });

  return (
    <MainLayout
      title="Your orders"
      description="View your orders"
      showSearchBar={false}
    >
      <Typography variant="h4" component="h1">
        Your orders
      </Typography>
      <div style={{ height: "70vh", minHeight: "400px", marginTop: "20px" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          rowsPerPageOptions={[10, 20]}
        ></DataGrid>
      </div>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );
  const orders = await getUserOrders(session?.user?.email || "");
  if (orders.length <= 0) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      orders,
    },
  };
};

export default orders;
