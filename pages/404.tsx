import React from "react";
import { MainLayout } from "../components/layouts/mainLayout";
import { Typography, Button } from "@mui/material";
import { Container, Box } from "@mui/system";
import SatelliteAltRoundedIcon from "@mui/icons-material/SatelliteAltRounded";
import Link from "next/link";

const NotFound = () => {
  return (
    <MainLayout title="404" description="Not found" showSearchBar={false}>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          flexDirection: "column",
          gap: "30px",
          height: "75vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SatelliteAltRoundedIcon sx={{ mr: "10px", fontSize: "60px" }} />
          <Typography variant="h2" component="h1">
            Page not found
          </Typography>
        </Box>
        <Link href="/">
          <Button>Go to main page</Button>
        </Link>
      </Container>
    </MainLayout>
  );
};

export default NotFound;
