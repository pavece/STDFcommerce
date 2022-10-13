import React from "react";
import { MainLayout } from "../../components/layouts/mainLayout";
import { Container } from "@mui/system";
import { Typography } from "@mui/material";
import RemoveShoppingCartRoundedIcon from "@mui/icons-material/RemoveShoppingCartRounded";

const empty = () => {
  return (
    <MainLayout
      title="Empty cart"
      description="The cart is empty"
      showSearchBar={false}
    >
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "30vh 0",
        }}
      >
        <RemoveShoppingCartRoundedIcon sx={{fontSize: "4.5rem", marginRight: "30px"}}/>
        <Typography variant="h2" component="h2">
          The cart is empty
        </Typography>
      </Container>
    </MainLayout>
  );
};

export default empty;
