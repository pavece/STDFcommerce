import React from "react";
import { Container } from "@mui/system";
import { grey } from "@mui/material/colors";
import { Typography, Button, Box } from "@mui/material";

export const CheckoutSummary = () => {
  return (
    <Container
      sx={{
        backgroundColor: grey[100],
        borderRadius: "20px",
        padding: "20px 20px",
      }}
    >
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
            $example
          </Typography>
        </Box>
        <Typography
          component="h1"
          variant="h1"
          fontSize={30}
          sx={{ mb: "20px" }}
        >
          Subtotal: $190
        </Typography>
        <Button fullWidth>Pay</Button>
      </Container>
    </Container>
  );
};
