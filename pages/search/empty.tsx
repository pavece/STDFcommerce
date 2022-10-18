import React from "react";
import { MainLayout } from "../../components/layouts/mainLayout";
import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";

const Index = () => {
  return (
    <MainLayout
      title="No search results"
      description="No search results"
      showSearchBar={true}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          height: "70vh",
        }}
      >
        <Typography variant="h2" component="h2" sx={{ marginBottom: "40px" }}>
          404 - No search results
        </Typography>
        <Link href="/">
          <Button>Go to main page</Button>
        </Link>
      </Box>
    </MainLayout>
  );
};

export default Index;
