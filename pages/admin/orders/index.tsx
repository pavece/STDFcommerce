import React from "react";
import { MainLayout } from "../../../components/layouts/mainLayout";
import { GetServerSideProps } from "next";
import { Typography, Chip, Button } from "@mui/material";
import { getAllOrders } from "../../../db/functions/getOrder";
import { IOrder } from "../../../interfaces/orderInterface";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CreditCardOffRoundedIcon from "@mui/icons-material/CreditCardOffRounded";
import CreditScoreRoundedIcon from "@mui/icons-material/CreditScoreRounded";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";

const index = ({ orders }: { orders: IOrder[] }) => {
  
  const columns: GridColDef[] = [
    { field: "id", headerName: "Order Id", width: 200 },
    { field: "orderDate", headerName: "Creation date", width: 200 },
    { field: "orderAuthor", headerName: "Order author", width: 200 },
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
          <a
            href={`/admin/orders/${params.row.id}`}
            target="_blank"
            rel="noreferrer"
          >
            <Button>
              <RemoveRedEyeRoundedIcon sx={{ mr: "10px" }} />
              View order
            </Button>
          </a>
        );
      },
    },
  ];

  const rows = orders.map((order: IOrder) => {
    const date = new Date(order.createdAt as any);
    return {
      id: order._id,
      orderDate: date,
      orderAuthor: order.orderAuthorEmail,
      orderPrice: order.orderTaxedPrice,
      orderStatus: order.orderShippingStatus,
      paymentStatus: order.paid,
    };
  });

  return (
    <MainLayout
      title="Orders"
      description="View all the orders"
      showSearchBar={false}
    >
      <Typography variant="h4" component="h1">
        Orders
      </Typography>
      <div style={{ height: "70vh", minHeight: "400px", marginTop: "20px" }}>
        <DataGrid columns={columns} rows={rows}></DataGrid>
      </div>
    </MainLayout>
  );
};

export default index;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const orders = await getAllOrders();

  return {
    props: {
      orders,
    },
  };
};
