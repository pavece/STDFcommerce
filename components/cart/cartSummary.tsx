import { Button, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import { grey } from "@mui/material/colors";
import Link from "next/link";

export const CartSummary = ({ totalPrice }: { totalPrice: number }) => {
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: "10px 0px 10px 0",
        }}
      >
        <Typography component="h3" variant="h3" fontSize={18}>
          Shipping fee:
        </Typography>
        <Typography component="h3" variant="h3" fontSize={18}>
          Free
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
          Tax:
        </Typography>
        <Typography component="h3" variant="h3" fontSize={18}>
          Calculated at checkout
        </Typography>
      </Box>
      <Typography component="h1" variant="h1" fontSize={30} sx={{ mb: "20px" }}>
        Subtotal: {totalPrice}
      </Typography>
      <Link href="/shipping">
        <Button fullWidth>Checkout</Button>
      </Link>
    </Container>
  );
};
