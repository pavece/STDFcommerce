import { Container } from "@mui/system";
import React from "react";
import { MainLayout } from "../../../components/layouts/mainLayout";
import { Button, Typography } from "@mui/material";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import Link from "next/link";
import { useRouter } from "next/router";

const Success = () => {
  const router = useRouter();

  return (
    <MainLayout
      title="Order Paid"
      description="Order paid correctly"
      showSearchBar={false}
    >
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          height: "70vh",
        }}
      >
        <Typography variant="h3" component="h1" align="center">
          Congratulations, the order has been paid and is now being processed.
        </Typography>
        <Link href={`/order/${router.query.orderId}`}>
          <Button sx={{ mt: "50px", fontSize: 20 }}>
            <LocalShippingRoundedIcon sx={{ mr: "10px" }} /> View order details
          </Button>
        </Link>
      </Container>
    </MainLayout>
  );
};

export default Success;
