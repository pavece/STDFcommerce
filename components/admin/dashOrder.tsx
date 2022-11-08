import { Button, Chip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { IOrder } from "../../interfaces/orderInterface";
import CreditScoreRoundedIcon from "@mui/icons-material/CreditScoreRounded";
import CreditCardOffRoundedIcon from "@mui/icons-material/CreditCardOffRounded";
import Link from "next/link";
import { grey } from "@mui/material/colors";

export const DashOrder = ({ order }: { order: IOrder }) => {
  const date = new Date(order.createdAt as any);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "left",
        padding: "20px 10px",
        backgroundColor: grey[200],
        borderRadius: "3px",
      }}
    >
      <Typography sx={{ mr: "10px" }}>By: {order.orderAuthorEmail}</Typography>
      <Typography sx={{ mr: "10px" }}>Date: {date.toLocaleDateString()}</Typography>
      <Typography sx={{ mr: "10px" }}>
        Price: {order.orderTaxedPrice}
      </Typography>
      <Typography sx={{ mr: "10px" }}>
        Shipping status: {order.orderShippingStatus}
      </Typography>
      {order.paid ? (
        <Chip
          label="Paid"
          color="success"
          icon={<CreditScoreRoundedIcon />}
          sx={{ mr: "10px" }}
        />
      ) : (
        <Chip
          label="Unpaid"
          color="error"
          icon={<CreditCardOffRoundedIcon />}
          sx={{ mr: "10px" }}
        />
      )}
      <Link href={`/admin/orders/${order._id}`}>
        <Button>View details</Button>
      </Link>
    </Box>
  );
};
