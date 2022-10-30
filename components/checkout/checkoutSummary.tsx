import React from "react";
import { Container } from "@mui/system";
import { grey } from "@mui/material/colors";
import { Typography, Button, Box } from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import { CheckoutForm } from "./checkoutForm";
import { useRouter } from "next/router";

const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

export const CheckoutSummary = () => {
  const [clientSecret, setClientSecret] = useState("");
  const router = useRouter();

  useEffect(() => {
    console.log(router);

    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: router.query.orderId }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const options: {
    clientSecret: string;
    appearance: { theme: "stripe" | "none" | "flat" | "night" | undefined };
  } = {
    clientSecret,
    appearance: {
      theme: "stripe",
    },
  };

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

        {clientSecret && (
          <Elements stripe={stripe} options={options}>
            <CheckoutForm />
          </Elements>
        )}
      </Container>
    </Container>
  );
};
