import React from "react";
import { Container, Typography, Box, Button, Chip } from "@mui/material";
import { grey } from "@mui/material/colors";
import { FC } from "react";
import Link from "next/link";

interface Props {
  isPaid: boolean;
  totalPrice: number;
  shippingStatus: string;
  orderId: string;
}

export const OrderDetailsSummary: FC<Props> = ({
  isPaid,
  totalPrice,
  shippingStatus,
  orderId,
}) => {
  return (
    <Container
      sx={{
        backgroundColor: grey[100],
        borderRadius: "20px",
        padding: "20px 20px",
      }}
    >
      <Typography component="h1" variant="h1" fontSize={30}>
        Order Summary
      </Typography>
      <Box sx={{ mb: "20px", mt: "20px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: "10px 0px 10px 0",
          }}
        >
          <Typography component="h3" variant="h3" fontSize={18}>
            Shipping status:
          </Typography>
          <Typography component="h3" variant="h3" fontSize={18}>
            {shippingStatus}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: "10px 0px 10px 0",
          }}
        >
          <Typography component="h3" variant="h3" fontSize={18}>
            Order price:
          </Typography>
          <Typography component="h3" variant="h3" fontSize={18}>
            {totalPrice}$
          </Typography>
        </Box>
      </Box>
      {isPaid ? (
        <Chip
          label="Order is paid!"
          color="success"
          variant="outlined"
          sx={{ width: "100%" }}
        />
      ) : (
        <Link href={`/checkout/${orderId}`}>
          <Button fullWidth>Pay order</Button>
        </Link>
      )}
    </Container>
  );
};
