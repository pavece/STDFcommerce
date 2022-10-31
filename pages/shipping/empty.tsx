import React from "react";
import { MainLayout } from "../../components/layouts/mainLayout";
import { Container } from "@mui/system";
import { Typography } from "@mui/material";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";

const empty = () => {
  return (
    <MainLayout
      showSearchBar={false}
      title="Order incomplete"
      description="Order incomplete"
    >
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "30vh 0",
        }}
      >
        <ErrorOutlineRoundedIcon
          sx={{ fontSize: "4.5rem", marginRight: "30px" }}
        />
        <Typography variant="h2" component="h2">
          You need to add products first
        </Typography>
      </Container>
    </MainLayout>
  );
};

export default empty;
